import requests
import time
import json

BASE_HEADERS = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-1ba8d334-ef2b-44b9-807a-1f49f29f8fe5",
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

def serialize_match(matchJson):
    print(matchJson)
    return matchJson #flags?

# def get_match2(i):
#     return get_match('na1', '2675889004')

# def pool_match():
#     orders_pool = Pool(20)
#     results = orders_pool.map(get_match2, range(20))
#     #Do something with the results here

if __name__=='__main__':
    # champs = get_champions()
    # print(json.dumps(champs))
    # for i in json.dumps(champs):
    #     print(i)
    #print(get_champions())
    #print(get_summoner('na1', 'owen3times'))
    #print(get_matchlist('na1', '210164502'))
    print(get_match('na1', '2675889004'))
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