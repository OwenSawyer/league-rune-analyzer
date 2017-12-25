from api.aggregate import aggregate, scrape
import json

def rune_number_to_name(number):
    table = scrape.get_rune_dict()
    return table[number]

def rune_name_to_number(name):
    table = scrape.get_rune_dict()
    return list(table.keys())[list(table.values()).index(name)]

def get_popular_runes_for_champ(champ, role):
    runes_json = dict(json.loads(open('json/champ_role_popular_runes.json').read()))
    return runes_json[champ.title()][role]

def rune_usage_analysis():
    rune_dict = dict(json.loads(open('json/runes_with_champs.json').read()))
    champ_tags = scrape.champ_tag_lookup()
    rune_analysis = {key: {} for key in rune_dict.keys()}
    for rune, champlist in rune_dict.items():
        for champ in champlist:
            tags = champ_tags[champ]
            for t in tags:
                if t in rune_analysis[rune]:
                    rune_analysis[rune][t] += 1
                else:
                    rune_analysis[rune][t] = 1
    return rune_analysis

if __name__=='__main__':
    # print(scrape.champ_tag_lookup())
    # print(rune_number_to_name(8124))
    # print(rune_name_to_number("Predator"))
    # print(rune_usage_analysis())
    print(get_popular_runes_for_champ('Bard','support'))