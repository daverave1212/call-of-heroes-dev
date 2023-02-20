
import yaml
import json
from os import path

# Use this script to convert all ./Design/ files to their JSON variant in WebsiteReact/call-of-heroes-react-static/src/databases
# NOTE 1: This does NOT remove the < and ~ symbols from the spell names!
# NOTE 2: This DOES YES fix the "Inherit" spells
# NOTE 3: This DOES YES add the Name property to all Spells (or at least it should)


yaml_root_folder = 'Design'
json_root_folder = 'WebsiteReact2/call-of-heroes-website-react-2/src/databases'

abilities = {}          # Holds all non-class abilities, like feats and spells from spell lists; used for Inheriting only


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
    # 'Backgrounds.yml',
    'Feats.yml',
    'Monsters.yml',
    'Prices.yml',
    'Proficiencies.yml',
    'Weapons.yml',
    'Obstacles.yml',
    
    'Other/SpellSchoolDescriptions.yml',
    'Other/Languages.yml',
    'Other/Levels.yml',

    'Rules/Rules.yml',
    'Rules/Inventory.yml',
    'Rules/CrowdControl.yml',
    'Rules/AreasOfEffect.yml',
    'Rules/AttackModifiers.yml',
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

def is_spell_name(dict_key):
    return type(dict_key) is str and (dict_key.startswith('~') or dict_key.startswith('<'))

# If it finds an Ability and it's not 'Inherit', it adds the name of the Ability as a 'Name' property
def add_name_to_spells_recursively(dict_to_search):
    for key in dict_to_search.keys():
        subobj = dict_to_search[key]
        if subobj == None:
            continue
        if type(subobj) is not dict:   # Don't care about anything that's not nested
            continue
        if is_spell_name(key):
            subobj['Name'] = key
        else:
            add_name_to_spells_recursively(subobj)


# Some class abilities are "Inherit".
# This function replaces the "Inherit" with the actual body of the spell
# The actual body of the spell is taken from abilities
def normalize_inherit_abilities(dict_to_search):

    def find_previously_used_ability(name):
        if name in abilities:
            return abilities[name]
        raise Exception(f'Spell {name} not found in previously mentioned spells [normalize_inherit_abilities].')

    for key in dict_to_search.keys():
        subobj = dict_to_search[key]
        if subobj == None:
            continue
        if isinstance(subobj, str) and subobj.strip().lower() == 'inherit':
            dict_to_search[key] = find_previously_used_ability(key)
            continue
        if type(subobj) is not dict:   # Don't care about anything that's not nested
            continue
        normalize_inherit_abilities(subobj)


# Finds all Abilities in from_dict and records them to the root of to_dict
def record_abilities_from(from_dict, to_dict):
    for key in from_dict.keys():
        subobj = from_dict[key]
        if subobj == None:
            continue
        if is_spell_name(key):
            if isinstance(subobj, str) and subobj.strip().lower() == 'inherit':
                continue
            to_dict[key] = subobj
        if type(subobj) is not dict:   # Don't care about anything that's not nested
            continue
        record_abilities_from(subobj, to_dict)

if __name__ == '__main__':

    for file_name in files_to_convert:
        print(f'Parsing {file_name}...')
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
            

        if file_name == 'Abilities.yml':
            add_name_to_spells_recursively(dict_content)            # Adds the key as a property to spell objects
            record_abilities_from(dict_content, abilities)          # Records all abilities found into the 'abilities' dict
            normalize_inherit_abilities(dict_content)               # Replaces "Inherit" with actual bodies
        
        if file_name == 'Feats.yml':
            add_name_to_spells_recursively(dict_content)
            record_abilities_from(dict_content, abilities)             # Records all abilities found into the 'feats' dict
        
        if file_name == 'Backgrounds.yml' or file_name == 'Proficiencies.yml':
            record_abilities_from(dict_content, abilities)
            normalize_inherit_abilities(dict_content)

        if 'Class' in dict_content:
            record_abilities_from(dict_content, abilities)
            normalize_inherit_abilities(dict_content)

        if file_name == 'Backgrounds.yml':
            backgrounds = list(dict_content.keys())

        if 'Race' in dict_content:
            record_abilities_from(dict_content, abilities)
            normalize_inherit_abilities(dict_content)

        file_name_with_yaml_extension = path.basename(file_name)
        file_name_no_extension = path.splitext(file_name_with_yaml_extension)[0]
        file_path_no_file_name = path.dirname(file_name)
        file_path_json = json_root_folder + '/' + file_path_no_file_name + '/' + file_name_no_extension + '.json'

        string_content = json.dumps(dict_content, indent=4)

        with open(file_path_json, 'w+') as f:
            f.write(string_content)

    overall_data = {
        'Races': races,
        'Classes': classes,
        'Backgrounds': backgrounds
    }
    overall_data_json = json.dumps(overall_data, indent=4)
    with open(json_root_folder + '/' + 'OverallData.json', 'w+') as f:
        f.write(overall_data_json)

