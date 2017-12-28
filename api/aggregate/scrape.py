import urllib
from urllib.error import HTTPError
from urllib.request import urlopen

import requests
from bs4 import BeautifulSoup
import json
import re

#Imports below: the requests module has a naming collision with grequests that breaks requests.
#The import code below is to address this..
from gevent import monkey

from drf_react.settings import JSON_FOLDER


def stub(*args, **kwargs):  # pylint: disable=unused-argument
    pass
monkey.patch_all = stub
import grequests
import os

PATCH_URL = 'https://ddragon.leagueoflegends.com/api/versions.json'
PATCH_VERSION = str(requests.get(PATCH_URL).json()[0])
BASE_URL = 'http://na.op.gg/champion/{}/statistics/{}/rune'
CHAMPION_INFO_URL = 'http://leagueoflegends.wikia.com/wiki/List_of_champions/Ratings'
CHAMPION_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/{}/img/champion/'.format(PATCH_VERSION)
SUMMONER_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/{}/img/spell/'.format(PATCH_VERSION)

def get_opt_runes_for_champion(page):

    runes = []
    soup = BeautifulSoup(page.content, "html.parser")
    if soup.find("table", class_="champion-stats__table--rune"):
        top_rune_page = soup.find("table", class_="champion-stats__table--rune").find("tbody").find("tr")
        pickrate = top_rune_page.find("td", class_="champion-stats__table__cell champion-stats__table__cell--pickrate").find("em").getText()
        if int(pickrate.replace(',', '')) > 75:
            for active in top_rune_page.findAll("div", class_="perk-page__item--active"):
                runes.append(active.find("img")['alt'])
    return runes

def aggregate_top_runes_for_champ_role_pair():
    champ_dict = get_champion_names()
    rune_dict = get_rune_names()

    urls= []
    lookup_roles = ['top', 'jungle', 'mid', 'adc', 'support']
    official_roles = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'SUPPORT']
    for champ in list(champ_dict.keys()):
        for role in lookup_roles:
            urls.append(BASE_URL.format(champ, role))
    pages = async(urls)
    counter = 0
    for champ in list(champ_dict.keys()):
        for role in official_roles:
            runes = get_opt_runes_for_champion(pages[counter])
            champ_dict[champ][role] = runes
            for i in runes:
                if not champ in rune_dict[i]:
                    rune_dict[i].append(champ)
            counter += 1

    with open(JSON_FOLDER + 'champ_role_popular_runes.json', 'w') as fp:
        json.dump(champ_dict, fp)

    with open(JSON_FOLDER + 'runes_with_champs.json', 'w') as fp2:
        json.dump(rune_dict, fp2)

def exception_handler(request, exception):
    print("Problem: {}: {}".format(request.url, exception))

def async(urls):
    print(len(urls))
    BATCH_SIZE = 30
    batch_idx = 0
    final = []
    while True:
        results = grequests.map((grequests.get(u) for u in urls[batch_idx:batch_idx+BATCH_SIZE]), exception_handler=exception_handler, size=10)
        final.extend(results)
        print(batch_idx+BATCH_SIZE)

        if batch_idx + BATCH_SIZE > len(urls):
            break
        else:
            batch_idx += BATCH_SIZE
    return final

def get_champion_names():
    return {key: {} for key in dict(json.loads(open(JSON_FOLDER + 'champions.json').read())['data']).keys()}

def get_summoner_spell_names():
    return {key: {} for key in dict(json.loads(open(JSON_FOLDER + 'summoners.json').read())['data']).keys()}

def get_rune_names():
    rune_list = []
    runes = list(json.loads(open(JSON_FOLDER + 'runes_reforged.json').read()))
    for category in runes:
        for tier in category['slots']:
            for rune in tier['runes']:
                rune_list.append(rune['name'])
    return {key: [] for key in rune_list}

def get_rune_dict():
    rune_list = {}
    runes = list(json.loads(open(JSON_FOLDER + 'runes_reforged.json').read()))
    for category in runes:
        rune_list[category['id']] = category['name']
        for tier in category['slots']:
            for rune in tier['runes']:
                rune_list[rune['id']] = rune['name']
    return rune_list

def scrape_champion_images():
    champions = [(val['key'], str(val['id'])) for val in dict(json.loads(open(JSON_FOLDER + 'champions.json').read())['data']).values()]

    base_path = os.path.dirname(__file__) + '/../../assets/img/champion/'
    for tup in champions:
        filename = base_path + tup[1] + '.png'
        try:
            urllib.request.urlretrieve(CHAMPION_IMAGE_URL + tup[0] + '.png', filename)
        except HTTPError as e:
            print("name not found:" + tup[0])

def scrape_summoner_images():
    summoners = [(val['id'], str(val['key'])) for val in dict(json.loads(open(JSON_FOLDER + 'summoner.json').read())['data']).values()]

    base_path = os.path.dirname(__file__) + '/../../assets/img/summoner/'
    for tup in summoners:
        filename = base_path + tup[1] + '.png'
        try:
            urllib.request.urlretrieve(SUMMONER_IMAGE_URL + tup[0] + '.png', filename)
        except HTTPError as e:
            print("summoner not found:" + tup[0])

def champ_tag_lookup():
    return {key: list(value['tags']) for key, value in dict(json.loads(open(JSON_FOLDER + 'champions.json').read())['data']).items()}

def scrape_champ_info():

    def clean(d):
        for k, v in d.items():
            if isinstance(v, dict):
                clean(v)
            elif isinstance(v, str):
                d[k] = str(re.sub(r"[\s']+", '', v))

    champ_dict = {}
    soup = BeautifulSoup(requests.get(CHAMPION_INFO_URL).content, "html.parser")
    for row in soup.find("table", class_="article-table sortable").findAll("tr")[1:]:
        champ_info = {}
        cols = row.findAll("td")
        name = cols[0].findAll("a")[1].getText()
        if name == 'Wukong':
            name = 'MonkeyKing'

        champ_info['primary'] = cols[1].findAll("a")[1].getText()
        if cols[2].find("span"):
            champ_info['secondary'] = cols[2].findAll("a")[1].getText()

        attributes = {}
        attributes['attack'] = int(cols[3].getText())
        attributes['defense'] = int(cols[4].getText())
        attributes['toughness'] = int(cols[5].getText())
        attributes['mobility'] = int(cols[6].getText())
        attributes['utility'] = int(cols[7].getText())
        champ_info['attributes'] = attributes

        champ_info['championStyle'] = int(cols[8].findAll("span")[1]['title'])
        champ_info['championDamage'] = cols[9].getText()

        clean(champ_info)

        champ_dict[re.sub(r"[\s'.]+", '', name)] = champ_info

    with open(JSON_FOLDER + 'champion_info.json', 'w') as fp:
        json.dump(champ_dict, fp)


if __name__=='__main__':
    scrape_champ_info()
    #scrape_champion_images()
    #scrape_summoner_images()
    #print(get_champion_names())
    #start = time.time()
    #print(get_runes())
    #aggregate_top_runes_for_champ_role_pair()
    #end = time.time()
    #print(end - start)
