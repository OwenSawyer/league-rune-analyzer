import requests

BASE_HEADERS = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-58fc4593-19e7-4372-a0bf-71690d3457ba",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
}

def get_champions():

    url = 'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&tags=image&tags=info&tags=keys&tags=tags&dataById=false'
    r = requests.get(url, headers=BASE_HEADERS)

    champs_json = r.json()
    champ_list = {'champs':champs_json['data']}
    return champ_list

def get_summoner(region, name):
    url = 'https://{}.api.riotgames.com/lol/summoner/v3/summoners/by-name/{}'.format(region, name)
    return requests.get(url, headers=BASE_HEADERS).json()

def get_recent_matches(region, accountId):
    url = 'https://{}.api.riotgames.com/lol/match/v3/matchlists/by-account/{}/recent'.format(region, accountId)
    return requests.get(url, headers=BASE_HEADERS).json()

def get_match(region, matchId):
    url = 'https://{}.api.riotgames.com/lol/match/v3/matches/{}'.format(region, matchId)
    return requests.get(url, headers=BASE_HEADERS).json()

if __name__=='__main__':
    print(get_champions())
    print(get_summoner('na1', 'owen3times'))
    print(get_recent_matches('na1', '210164502'))
    print(get_match('na1', '2675889004'))