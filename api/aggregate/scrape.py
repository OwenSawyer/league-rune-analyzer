from bs4 import BeautifulSoup
import requests

BASE_HEADERS = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "RGAPI-58fc4593-19e7-4372-a0bf-71690d3457ba",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
}

BASE_URL = 'http://na.op.gg/champion/{}/statistics/{}/rune'

def get_popular_runes_for_champion(name, role):


    #top 2 choices for keystone 1 and keystone 2
    #k1:
    #    if p2 > .5*p1 take p2 as well
    #if k2 > .5*k1:
    #   take k2 as well? and redo p1 p2 choice
    url = BASE_URL.format(name, role)
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    table = soup.find("table", class_="champion-stats__table--rune").find("tbody").find("tr")
    for active in table.findAll("div", class_="perk-page__item--active"):
        print(active.find("img")['alt'])
    return url


if __name__=='__main__':
    print(get_popular_runes_for_champion('bard', 'support'))