
import yaml
import json
from os import path

# Use this script to convert all ./Design/ files to their JSON variant in WebsiteReact/call-of-heroes-react-static/src/databases
# NOTE: This does NOT remove the < and ~ symbols from the spell names!
# NOTE: This DOES YES fix the "Inherit" spells


yaml_root_folder = 'Design'
json_root_folder = 'WebsiteReact2/call-of-heroes-website-react-2/src/databases'

class_abilities = {}    # Holds all class abilities and talents
abilities = {}          # Holds all non-class abilities, like feats and spells from spell lists

classes = [
    'Cleric',
    'Druid',
    'Hunter',
    'Mage',
    'Paladin',
    'Rogue',
    'Shaman',
    'Warlock',
    'Warrior',
]
races = [
    'Bertle',
    'Dragonborn',
    'Dwarf',
    'Elf',
    'Gnome',
    'Hollow',
    'Human',
    'Orc',
]
backgrounds = []        # Polulated at runtime

files_to_convert = [    # Order matters
    'Abilities.yml',
    'Animals.yml',
    'Armors.yml',
    'Backgrounds.yml',
    'Monsters.yml',
    'Prices.yml',
    'Weapons.yml',
    
    'Rules/CharacterCreation.yml',
    'Rules/COHFor5e.yml',
    'Rules/COHExplained.yml',

    'Classes/Cleric.yml',
    'Classes/Druid.yml',
    'Classes/Hunter.yml',
    'Classes/Mage.yml',
    'Classes/Paladin.yml',
    'Classes/Rogue.yml',
    'Classes/Shaman.yml',
    'Classes/Warlock.yml',
    'Classes/Warrior.yml',

    'Races/Bertle.yml',
    'Races/Dragonborn.yml',
    'Races/Dwarf.yml',
    'Races/Elf.yml',
    'Races/Gnome.yml',
    'Races/Hollow.yml',
    'Races/Human.yml',
    'Races/Orc.yml'
]



def add_spell_to_dict(dict_obj, spell_name, spell):
    spell_name = spell_name
    dict_obj[spell_name] = spell
    dict_obj[spell_name]['Name'] = spell_name

# Searches a dictionary recursively for spells starting with ~ or <
# Adds them to the class_abilities dict
def record_class_abilities_recursively(dict_to_search):
    for key in dict_to_search.keys():
        subobj = dict_to_search[key]
        if subobj == None:
            continue
        if type(subobj) is not dict:   # Don't care about anything that's not nested
            continue
        if type(key) is str and (key.startswith('~') or key.startswith('<')):
            add_spell_to_dict(class_abilities, spell_name=key, spell=dict_to_search[key])   # Record the spell
        else:
            record_class_abilities_recursively(subobj)

# Some class talents and abilities are "Inherit".
# This function replaces the "Inherit" with the actual body of the spell
# The actual body of the spell is taken from class_abilities
def normalize_inherit_class_abilities(dict_to_search):
    for key in dict_to_search.keys():
        subobj = dict_to_search[key]
        if subobj == None:
            continue
        if isinstance(subobj, str) and subobj.strip().lower() == 'inherit':
            if key in class_abilities:
                dict_to_search[key] = class_abilities[key]
            elif key in abilities:
                dict_to_search[key] = abilities[key]
            continue
        if type(subobj) is not dict:   # Don't care about anything that's not nested
            continue
        normalize_inherit_class_abilities(subobj)
        

# In the Abilities.yml file, some spells appear as : Inherit
# That means they're repeated and they have to be cloned from a previous spell
# This function replaces : Inherit with the actual spell object
def normalize_inherit_abilities(abilities_dict):    # Yes it modifies the dict but I don't really care
    for category_name in abilities_dict.keys():
        category = abilities_dict[category_name]
        for spell_name in category:
            spell = category[spell_name]
            if isinstance(spell, str) and spell.strip().lower() == 'inherit':  # Here it will probably == "Inherit" if it's a string
                category[spell_name] = abilities[spell_name]
            else:
                abilities[spell_name] = spell
    return abilities_dict


if __name__ == '__main__':

    for file_name in files_to_convert:
        file_path = yaml_root_folder + '/' + file_name
        file_content = ''
        with open(file_path, 'r') as f:
            file_content = f.read()
        
        dict_content = yaml.safe_load(file_content)

        if file_name == 'Abilities.yml':
            dict_content = normalize_inherit_abilities(dict_content)
        
        if file_name == 'Backgrounds.yml':
            record_class_abilities_recursively(dict_content)
            normalize_inherit_class_abilities(dict_content)

        if 'Class' in dict_content:
            record_class_abilities_recursively(dict_content)
            normalize_inherit_class_abilities(dict_content)

        if file_name == 'Backgrounds.yml':
            backgrounds = list(dict_content.keys())

        file_name_with_yaml_extension = path.basename(file_name)
        file_name_no_extension = path.splitext(file_name_with_yaml_extension)[0]
        file_path_no_file_name = path.dirname(file_name)
        file_path_json = json_root_folder + '/' + file_path_no_file_name + '/' + file_name_no_extension + '.json'

        string_content = json.dumps(dict_content, indent=4)

        with open(file_path_json, 'w+') as f:
            f.write(string_content)

    class_abilities_json = json.dumps(class_abilities, indent=4)

    with open(json_root_folder + '/' + 'ClassAbilities.json', 'w+') as f:
        f.write(class_abilities_json)

    overall_data = {
        'Races': races,
        'Classes': classes,
        'Backgrounds': backgrounds
    }
    overall_data_json = json.dumps(overall_data, indent=4)
    with open(json_root_folder + '/' + 'OverallData.json', 'w+') as f:
        f.write(overall_data_json)

