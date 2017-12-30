import os
import requests
from datetime import datetime, timedelta
import json

from api.aggregate import rune
from drf_react.settings import JSON_FOLDER
BASE_HEADERS = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": str(os.getenv("RIOT_API_KEY")),
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
    participantId = next(id['participantId'] for id in matchJson['participantIdentities'] if id['player']['currentAccountId'] == int(accountId))
    playerInfo = next(id for id in matchJson['participants'] if id['participantId'] == participantId)
    serialized['champion'] = playerInfo['championId']

    champion_json = dict(json.loads(open(JSON_FOLDER + 'champions.json').read())['data'])
    champions = [(val['key'], val['id']) for val in champion_json.values()]
    serialized['championName'] = next(i for i in champions if i[1] == serialized['champion'])[0]
    if playerInfo['timeline']['lane'] == 'BOTTOM':
        if playerInfo['timeline']['role'] == 'DUO_CARRY':
            serialized['lane'] = 'BOTTOM'
        else:
            serialized['lane'] = 'SUPPORT'
    else:
        serialized['lane'] = playerInfo['timeline']['lane']
    serialized['gameDate'] = datetime.fromtimestamp(matchJson['gameCreation']/1000).strftime("%m/%d/%y")
    serialized['gameDuration'] = str(timedelta(seconds=matchJson['gameDuration']))

    queue_info = next(q for q in list(json.loads(open(JSON_FOLDER + 'queue_types.json').read())) if q['queueId'] == matchJson['queueId'])
    serialized['map'] = queue_info['map']
    serialized['gameType'] = queue_info['gameType']
    serialized['gameMode'] = matchJson['gameMode'].title()
    serialized['win'] = str(playerInfo['stats']['win']).lower()

    serialized['kills'] = playerInfo['stats']['kills']
    serialized['deaths'] = playerInfo['stats']['deaths']
    serialized['assists'] = playerInfo['stats']['assists']
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
    rune_info['rating'] = rune.get_rune_page_rating_for_champ(rune_info, serialized['championName'], serialized['lane'].lower())
    serialized['runes'] = rune_info

    serialized['championTags'] =  next(v['tags'] for (k,v) in dict(json.loads(open(JSON_FOLDER + 'champions.json').read())['data']).items()
                                      if k == serialized['championName'])
    serialized['championAttributes'] = next(v['attributes'] for (k,v) in dict(json.loads(open(JSON_FOLDER + 'champion_info.json').read())).items()
                                      if k == serialized['championName'])

    players = {'team1': [],
               'team2': []}
    participants = [{'participantId': p['participantId'],
                     'summonerName': p['player']['summonerName'],
                     'accountId': p['player']['accountId'],
                     'platformId': p['player']['currentPlatformId']}
                    for p in matchJson['participantIdentities']]

    for p in matchJson['participants']:
        player = next(i for i in participants if i['participantId'] == p['participantId'])
        player['championId'] = p['championId']
        if '1' in str(p['teamId']):
            players['team1'].append(player)
        else:
            players['team2'].append(player)
    serialized['players'] = players

    return serialized

if __name__=='__main__':
    # champs = get_champions()
    # print(json.dumps(champs))
    # for i in json.dumps(champs):
    #     print(i)
    #print(get_champions())
    print(get_summoner('na1', 'chowdog'))
    print(get_matchlist('na1', '226913554'))
    print(serialize_match('226913554', get_match('na1', '2682393766')))
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
