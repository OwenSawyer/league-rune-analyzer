import urllib
from urllib.error import HTTPError
from urllib.request import urlopen

import requests
from bs4 import BeautifulSoup
import json

#Imports below: the requests module has a naming collision with grequests that breaks requests.
#The import code below is to address this..
from gevent import monkey
def stub(*args, **kwargs):  # pylint: disable=unused-argument
    pass
monkey.patch_all = stub
import grequests
import os

BASE_HEADERS = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-077522dc-b8f6-4a71-a1c3-c3b8e82c12ff",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
}

url = 'https://ddragon.leagueoflegends.com/api/versions.json'
PATCH_VERSION = str(requests.get(url).json()[0])
BASE_URL = 'http://na.op.gg/champion/{}/statistics/{}/rune'
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
    roles = ['top', 'jungle', 'mid', 'adc', 'support']
    for champ in list(champ_dict.keys()):
        for role in roles:
            urls.append(BASE_URL.format(champ, role))
    pages = async(urls)
    counter = 0
    for champ in list(champ_dict.keys()):
        for role in roles:
            runes = get_opt_runes_for_champion(pages[counter])
            champ_dict[champ][role] = runes
            for i in runes:
                if not champ in rune_dict[i]:
                    rune_dict[i].append(champ)
            counter += 1

    with open('json/champ_role_popular_runes.json', 'w') as fp:
        json.dump(champ_dict, fp)

    with open('json/runes_with_champs.json', 'w') as fp2:
        json.dump(rune_dict, fp2)

def exception_handler(request, exception):
    print("Problem: {}: {}".format(request.url, exception))

def async(urls):
    batch_idx = 0
    final = []
    while True:
        results = grequests.map((grequests.get(u) for u in urls[batch_idx:batch_idx+50]), exception_handler=exception_handler, size=10)
        final.extend(results)
        print(batch_idx+50)

        if batch_idx + 50 > len(urls):
            break
        else:
            batch_idx += 50
    return final

def get_champion_names():
    return {key: {} for key in dict(json.loads(open('json/champions.json').read())['data']).keys()}

def get_summoner_spell_names():
    return {key: {} for key in dict(json.loads(open('json/summoners.json').read())['data']).keys()}

def get_rune_names():
    rune_list = []
    runes = list(json.loads(open('json/runes_reforged.json').read()))
    for category in runes:
        for tier in category['slots']:
            for rune in tier['runes']:
                rune_list.append(rune['name'])
    return {key: [] for key in rune_list}

def get_rune_dict():
    rune_list = {}
    runes = list(json.loads(open('json/runes_reforged.json').read()))
    for category in runes:
        rune_list[category['id']] = category['name']
        for tier in category['slots']:
            for rune in tier['runes']:
                rune_list[rune['id']] = rune['name']
    return rune_list

def scrape_champion_images():
    champions = [(val['key'], str(val['id'])) for val in dict(json.loads(open('json/champions.json').read())['data']).values()]

    base_path = os.path.dirname(__file__) + '/../../assets/img/champion/'
    for tup in champions:
        filename = base_path + tup[1] + '.png'
        try:
            urllib.request.urlretrieve(CHAMPION_IMAGE_URL + tup[0] + '.png', filename)
        except HTTPError as e:
            print("name not found:" + tup[0])

def scrape_summoner_images():
    summoners = [(val['id'], str(val['key'])) for val in dict(json.loads(open('json/summoner.json').read())['data']).values()]

    base_path = os.path.dirname(__file__) + '/../../assets/img/summoner/'
    for tup in summoners:
        filename = base_path + tup[1] + '.png'
        try:
            urllib.request.urlretrieve(SUMMONER_IMAGE_URL + tup[0] + '.png', filename)
        except HTTPError as e:
            print("summoner not found:" + tup[0])

def champ_tag_lookup():
    return {key: list(value['tags']) for key, value in dict(json.loads(open('json/champions.json').read())['data']).items()}

if __name__=='__main__':
    #scrape_champion_images()
    #scrape_summoner_images()
    #print(champ_tag_lookup())
    #start = time.time()
    #print(get_runes())
    #aggregate_top_runes_for_champ_role_pair()
    #end = time.time()
    #print(end - start)
