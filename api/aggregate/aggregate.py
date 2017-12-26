import requests
from datetime import datetime, timedelta
import json

from api.aggregate import scrape

BASE_HEADERS = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-e8085f3a-3e1d-41e3-aa37-f77b4ec151eb",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
}

def get_champions():
    url = 'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&tags=image&tags=info&tags=keys&tags=tags&dataById=false'
    return requests.get(url, headers=BASE_HEADERS).json()

def get_summoner(region, name):
    url = 'https://{}.api.riotgames.com/lol/summoner/v3/summoners/by-name/{}'.format(region, name)
    return requests.get(url, headers=BASE_HEADERS).json()

def get_matchlist(region, accountId):
    url = 'https://{}.api.riotgames.com/lol/match/v3/matchlists/by-account/{}/recent'.format(region, accountId)
    return requests.get(url, headers=BASE_HEADERS).json()

def get_match(region, matchId):
    url = 'https://{}.api.riotgames.com/lol/match/v3/matches/{}'.format(region, matchId)
    return requests.get(url, headers=BASE_HEADERS).json()

def serialize_match(accountId, matchJson):

    serialized = {}
    playerInfo = next(id for id in matchJson['participants'] if lambda x: x['participantId'] == accountId)
    serialized['champion'] = playerInfo['championId']

    champion_json = dict(json.loads(open('json/champions.json').read())['data'])
    champions = [(val['key'], str(val['id'])) for val in champion_json.values()]
    serialized['championName'] = next(key for key in champions if lambda x: x[1] == serialized['champion'])[0]
    serialized['lane'] = playerInfo['timeline']['lane']
    serialized['gameDate'] = datetime.fromtimestamp(matchJson['gameCreation']/1000).strftime("%d/%m/%y")
    serialized['gameDuration'] = str(timedelta(seconds=matchJson['gameDuration']))
    serialized['gameMode'] = matchJson['gameMode'].title()
    serialized['win'] = playerInfo['stats']['win']
    serialized['kills'] = playerInfo['stats']['kills']
    serialized['deaths'] = playerInfo['stats']['deaths']
    serialized['spell1'] = playerInfo['spell1Id']
    serialized['spell2'] = playerInfo['spell2Id']

    rune_info = {"primary": {}, "secondary": {}}
    rune_info['primary']['id'] = playerInfo['stats']['perkPrimaryStyle']
    rune_info['secondary']['id'] = playerInfo['stats']['perkSubStyle']

    rune_info['primary']['runes'] = [
        playerInfo['stats']['perk0'],
        playerInfo['stats']['perk1'],
        playerInfo['stats']['perk2'],
        playerInfo['stats']['perk3'],
    ]
    rune_info['secondary']['runes'] = [
        playerInfo['stats']['perk4'],
        playerInfo['stats']['perk5']
    ]

    serialized['runes'] = rune_info
    return serialized


if __name__=='__main__':
    # champs = get_champions()
    # print(json.dumps(champs))
    # for i in json.dumps(champs):
    #     print(i)
    #print(get_champions())
    #print(get_summoner('na1', 'owen3times'))
    #print(get_matchlist('na1', '210164502'))
    print(serialize_match('210164502', get_match('na1', '2675889004')))
    #print(get_match('na1', '2674267941'))
    #start = time.time()
    #print(get_summoner('na1', 'owen3times'))
    #print(get_matchlist('na1', '210164502'))
    #print(get_match('na1', '2675889004'))
    #pool_match()
    #end = time.time()
    #print(end - start) #10.99
    # urls = [
    #     'http://www.heroku.com',
    #     'http://python-tablib.org',
    #     'http://httpbin.org',
    #     'http://python-requests.org',
    #     'http://fakedomain/',
    #     'http://kennethreitz.com'
    # ]
    # rs = (grequests.get(u) for u in urls)
    # grequests.map(rs)