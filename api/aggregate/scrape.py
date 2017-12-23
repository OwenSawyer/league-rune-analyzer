from bs4 import BeautifulSoup
import json
import grequests

BASE_HEADERS = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-077522dc-b8f6-4a71-a1c3-c3b8e82c12ff",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
}

BASE_URL = 'http://na.op.gg/champion/{}/statistics/{}/rune'

def get_opt_runes_for_champion(page):

    #top 2 choices for keystone 1 and keystone 2
    #k1:
    #    if p2 > .5*p1 take p2 as well
    #if k2 > .5*k1:
    #   take k2 as well? and redo p1 p2 choice
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

def get_rune_names():
    rune_list = []
    runes = list(json.loads(open('json/runes_reforged.json').read()))
    for category in runes:
        for tier in category['slots']:
            for rune in tier['runes']:
                rune_list.append(rune['name'])
    return {key: [] for key in rune_list}


if __name__=='__main__':
    print(get_rune_names().keys())
    #start = time.time()
    #print(get_runes())
    #aggregate_top_runes_for_champ_role_pair()
    #end = time.time()
    #print(end - start)
