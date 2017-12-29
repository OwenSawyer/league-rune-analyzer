from collections import Counter

import os

from api.aggregate import scrape
import json

from drf_react.settings import JSON_FOLDER

def rune_number_to_name(number):
    table = scrape.get_rune_dict()
    return table[number]

def rune_name_to_number(name):
    table = scrape.get_rune_dict()
    return list(table.keys())[list(table.values()).index(name)]

def rune_class_type(name):
    runes = list(json.loads(open(JSON_FOLDER + 'runes_reforged.json').read()))
    for category in runes:
        for tier in category['slots']:
            for rune in tier['runes']:
                if rune['name'] == name:
                    return category['id']
    return -1

def get_popular_runes_for_champ(champ, role):
    runes_json = dict(json.loads(open(JSON_FOLDER + 'champ_role_popular_runes.json').read()))[champ][role]
    if not runes_json:
        runes_json = dict(json.loads(open(JSON_FOLDER + 'champ_role_popular_runes.json').read()))[champ]
        runes_json = next(v for (k,v) in runes_json.items() if v)
    id_mappings = [rune_name_to_number(i) for i in runes_json]
    rune_info = {"primary": {}, "secondary": {}}
    rune_info['primary']['id'] = rune_class_type(runes_json[0])
    rune_info['secondary']['id'] = rune_class_type(runes_json[-1])

    rune_info['primary']['runes'] = id_mappings[:4]
    rune_info['secondary']['runes'] = id_mappings[4:]

    return rune_info

def get_rune_page_rating_for_champ(runes, champ, role):

    score = 0
    popular = get_popular_runes_for_champ(champ, role)
    if popular:
        if popular['primary']['id'] == runes['primary']['id']:
            score += 12.5
        elif popular['primary']['id'] == runes['secondary']['id']:
            score += 10
        if popular['secondary']['id'] == runes['secondary']['id']:
            score += 12.5
        elif popular['secondary']['id'] == runes['primary']['id']:
            score += 10

    player_runes = []
    player_runes.extend(runes['primary']['runes'])
    player_runes.extend(runes['secondary']['runes'])
    popular_runes = []
    if popular:
        popular_runes.extend(popular['primary']['runes'])
        popular_runes.extend(popular['secondary']['runes'])

    rune_tags = rune_usage_analysis()
    champ_tags = scrape.champ_tag_lookup()[champ]
    for rune in player_runes:
        if rune in popular_runes:
            score += 12.5
        else:
            tags = sorted(rune_tags[rune_number_to_name(rune)], key=rune_tags[rune_number_to_name(rune)].get, reverse=True)
            if any(x in tags[:2] for x in champ_tags):
                score += 10
            else:
                score += 7.5
    return score

def rune_usage_analysis():
    rune_dict = dict(json.loads(open(JSON_FOLDER + 'runes_with_champs.json').read()))
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

def get_rune_info(runeId):

    def get_average(sum, num_champs):
        avg = str(float(sum) / num_champs)
        return avg[:avg.find('.')+4]

    rune_info = {}
    runes = list(json.loads(open(JSON_FOLDER + 'runes_reforged.json').read()))
    for category in runes:
        for tier in category['slots']:
            for rune in tier['runes']:
                if rune['id'] == int(runeId):
                    rune_info['id'] = rune['id']
                    rune_info['name'] = rune['name']
                    rune_info['desc'] = rune['desc']
                    rune_info['category'] = category['id']
                    break

    all_roles = ['Tank','Fighter','Mage','Assassin','Marksman','Support']
    rune_user_roles = rune_usage_analysis()[rune_info['name']]
    rune_info['roles'] = {x: get_average(rune_user_roles[x],sum(rune_user_roles.values())) for x in rune_user_roles.keys()}
    for i in all_roles:
        if i not in rune_info['roles']:
            rune_info['roles'][i] = "0"

    #average attributes of all champs who use this rune
    champ_attributes = []
    champ_json = dict(json.loads(open(JSON_FOLDER + 'champion_info.json').read()))
    for champ in dict(json.loads(open(JSON_FOLDER + 'runes_with_champs.json').read()))[rune_info['name']]:
        champ_attributes.append(
            next(v['attributes'] for (k,v) in champ_json.items() if k.lower() == champ.lower()))
    sums = Counter()
    for attributes in champ_attributes:
        sums.update(attributes)
    rune_info['attributes'] = {x: get_average(sums[x],len(champ_attributes)) for x in sums.keys()}

    return rune_info

if __name__=='__main__':
    print(get_rune_info('8014'))
    # print(scrape.champ_tag_lookup())
    # print(rune_number_to_name(8124))
    # print(rune_name_to_number("Predator"))
    #print(rune_usage_analysis())
    #print(get_popular_runes_for_champ('Illaoi','support'))
    #print(get_rune_page_rating_for_champ(get_popular_runes_for_champ('Jhin','adc'), 'Bard','support'))
