import yaml
import json
from os import path

yaml_root_folder = 'Design'
json_root_folder = 'WebsiteReact2/call-of-heroes-website-react-2/src/databases'

files_to_analyze = [
    'Classes/Cleric.yml',
    'Classes/Druid.yml',
    'Classes/Hunter.yml',
    'Classes/Mage.yml',
    'Classes/Paladin.yml',
    'Classes/Rogue.yml',
    'Classes/Shaman.yml',
    'Classes/Warlock.yml',
    'Classes/Warrior.yml',
]



def estimate():

    for file_path in files_to_analyze:
        print(f'Estimating {file_name}...')
        file_path = yaml_root_folder + '/' + file_name
        file_content = ''
        with open(file_path, 'r') as f:
            file_content = f.read()
        
        dict_content = {}
        try:
            dict_content = yaml.safe_load(file_content)
        except Exception as e:
            print(f'ERROR: Failed to load yaml from file {file_name}')
            raise e

        
def average(lst): 
    return sum(lst) / len(lst) 

def get_dict_as_list(dict_obj):
    abilities = []
    for key in dict_obj.keys():
        subobj = dict_obj[key]
        subobj['Name'] = key
        abilities.append(subobj)
    return abilities

def map_list_get_prop(lst, propname):
    return list([obj[propname] for obj in lst])

def estimate_class(class_dict):
    estimations = {
        'Mana': 0
        'StartingAbilities': 0,
        'Specs': []
    }
    estimations['Mana'] = class_dict['Spellcasting']['Mana']['Amount']
    StartingAbilities = get_dict_as_list(class_dict['Starting Abilities'])
    estimations['StartingAbilities'] = sum([spell['_Value'] for spell in StartingAbilities])

    Specs = get_dict_as_list(class_dict['Specs'])

    for spec in Specs:
        spec_estimations = {
            'Starting Abilities': 0,
            'Abilities': 0, # choices
            'Level 3': 0,
            'Level 5': 0,
            'Level 7': 0
        }
        SpecStartingAbilities = get_dict_as_list(spec['Starting Abilities'])
        spec_estimations['Starting Abilities'] = sum(map_list_get_prop(SpecStartingAbilities, '_Value'))
        spec_estimations['Abilities'] = average(map_list_get_prop(SpecStartingAbilities, '_Value'))

        spec_estimations['Level 3'] = average()

        TalentsL3 = list([obj['_Value'] for obj in get_dict_as_list(spec['Talents']['Level 3']) if obj['Name'].startswith('<')])

        # TODO, its too much lol, im tired





