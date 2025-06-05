
import fs from 'fs'
import { parse, stringify } from 'yaml'
import path from 'path'

const yamlRootFolder = '../Design'
const jsonRootFolder = '../WebsiteReact2/call-of-heroes-website-react-2/src/databases'

const shouldGenerateSpecificFiles = process.argv.length > 2
console.log({shouldGenerateSpecificFiles, argv: process.argv})
const specificFiles = process.argv.slice(1)

let abilities = {}
let classRaceAbilities = {} 

function readYAMLFromFile(fileName) {
    const fileContents = fs.readFileSync(fileName, 'utf8');
    const data = parse(fileContents);
    return data
}

const classes = [
    'Cleric',
    'Druid',
    'Hunter',
    'Mage',
    'Paladin',
    'Rogue',
    'Shaman',
    'Warlock',
    'Warrior'
]
const races = [
    'Bertle',
    'Davel',
    'Dragonborn',
    'Dwarf',
    'Elf',
    'Gnome',
    'Hollow',
    'Human',
    'Orc',
]
let backgrounds = []        // Polulated at runtime
let rulesLists = []        // Polulated at runtime ( title: "X", children: [...])
let rulesDicts = []        // Polulated at runtime ("X": [...])

const filesToConvert = [    // Order matters
    'Abilities.yml',
    'Animals.yml',
    'Armors.yml',
    'Feats.yml',
    'Monsters.yml',
    'MonsterCalculations.yml',
    'Prices.yml',
    'Proficiencies.yml',
    'Weapons.yml',
    'Obstacles.yml',
    
    'Other/MagicItems.yml',
    'Other/MagicItemProperties.yml',
    'Other/SpellSchoolDescriptions.yml',
    'Other/Languages.yml',
    'Other/Levels.yml',
    'Other/Encounters.yml',
    'Other/PatchNotes.yml',

    'Rules/Rules.yml',
    'Rules/Inventory.yml',
    'Rules/AreasOfEffect.yml',
    'Rules/AttackModifiers.yml',
    'Rules/CharacterCreation/CharacterCreation.yml',
    'Rules/CharacterCreation/CharacterCreationQuick.yml',
    'Rules/COHFor5e.yml',
    'Rules/COHExplained.yml',
    'Rules/GMGuidelines.yml',

    'Classes/Cleric.yml',
    'Classes/Druid.yml',
    'Classes/Hunter.yml',
    'Classes/Mage.yml',
    'Classes/Paladin.yml',
    'Classes/Rogue.yml',
    'Classes/RogueB.yml',
    'Classes/Shaman.yml',
    'Classes/Warlock.yml',
    'Classes/Warrior.yml',

    'Races/Bertle.yml',
    'Races/Davel.yml',
    'Races/Dragonborn.yml',
    'Races/Dwarf.yml',
    'Races/Elf.yml',
    'Races/Gnome.yml',
    'Races/Hollow.yml',
    'Races/Human.yml',
    'Races/Orc.yml'
]

function isSpellName(dictKey) {
    return typeof dictKey === 'string' && (dictKey.startsWith('~') || dictKey.startsWith('<'));
}

// If it finds an Ability and it's not 'Inherit', it adds the name of the Ability as a 'Name' property
function addNameToSpellsRecursively(dictToSearch) {
  for (const key of Object.keys(dictToSearch)) {
    const subobj = dictToSearch[key];

    if (subobj === null || typeof subobj !== 'object' || Array.isArray(subobj)) {
      continue;
    }

    if (isSpellName(key)) {
      subobj['Name'] = key;
    } else {
        addNameToSpellsRecursively(subobj);
    }
  }
}


function normalizeInheritAbilities(dictToSearch) {

    function getSwapTildeArrowsName(name) {
        if (name.startsWith('<')) {
            return '~' + name.slice(1, -1) + '~';
        }
        if (name.startsWith('~')) {
            return '<' + name.slice(1, -1) + '>';
        }
        return name;
    }

    function findPreviouslyUsedAbility(name) {
        if (abilities[name]) {
            return abilities[name];
        }
        const swapped = getSwapTildeArrowsName(name);
        if (abilities[swapped]) {
            return abilities[swapped];
        }
        throw new Error(`Spell ${name} not found in previously mentioned spells [normalizeInheritAbilities].`);
    }

    for (const key of Object.keys(dictToSearch)) {
        const subobj = dictToSearch[key];

        if (subobj === null) {
            continue;
        }

        if (typeof subobj === 'string' && subobj.trim().toLowerCase().startsWith('inherit')) {
            dictToSearch[key] = findPreviouslyUsedAbility(key);
            continue;
        }

        if (typeof subobj !== 'object' || Array.isArray(subobj)) {
            continue;
        }

        normalizeInheritAbilities(subobj);
    }
}



function recordAbilitiesFrom(fromDict, toDict) {
    for (const key of Object.keys(fromDict)) {
        const subobj = fromDict[key];

        if (subobj === null) {
            continue;
        }

        if (isSpellName(key)) {
            if (typeof subobj === 'string' && subobj.trim().toLowerCase().startsWith('inherit')) {
                continue;
            }
            toDict[key] = subobj;
        }

        if (typeof subobj !== 'object' || Array.isArray(subobj)) {
            continue;
        }

        recordAbilitiesFrom(subobj, toDict);
    }
}
        

function getFormatSectionsObjectList(dictContentList) {
    const sectionObjectList = dictContentList;
    const newChildren = [];

    for (const child of sectionObjectList) {
        const onlyKey = Object.keys(child)[0];
        const value = child[onlyKey];

        const newChild = {
            title: onlyKey,
            value: typeof value === 'string'
                ? value
                : getFormatSectionsObjectList(value)
        };

        newChildren.push(newChild);
    }

    return newChildren;
}


function getFormatSectionsObjectDict(dictContentList) {
    function getRecursiveSection(sectionObjectContent) {
        if (typeof sectionObjectContent === 'string') {
            return sectionObjectContent;
        } else if (typeof sectionObjectContent[0] === 'string') {
            return sectionObjectContent;
        } else {
            const newObject = {};
            for (const child of sectionObjectContent) {
                const onlyKeyOfChild = Object.keys(child)[0];
                newObject[onlyKeyOfChild] = getRecursiveSection(child[onlyKeyOfChild]);
            }
            return newObject;
        }
    }

    return getRecursiveSection(dictContentList);
}
    

async function processFiles() {
    for (const fileName of filesToConvert) {
        if (shouldGenerateSpecificFiles && !specificFiles.includes(fileName)) {
            continue;
        }

        console.log(`Parsing ${fileName}...`);
        const filePath = path.join(yamlRootFolder, fileName);
        let fileContent = '';

        try {
            fileContent = fs.readFileSync(filePath, 'utf-8');
        } catch (err) {
            console.error(`ERROR: Failed to read file ${fileName}`);
            throw err;
        }

        let dictContent = {};
        try {
            dictContent = parse(fileContent);
        } catch (err) {
            console.error(`ERROR: Failed to load YAML from file ${fileName}`);
            throw err;
        }

        if (fileName === 'Abilities.yml') {
            addNameToSpellsRecursively(dictContent);
            recordAbilitiesFrom(dictContent, abilities);
            normalizeInheritAbilities(dictContent);
        }

        if (fileName === 'Feats.yml') {
            addNameToSpellsRecursively(dictContent);
            recordAbilitiesFrom(dictContent, abilities);
        }

        if (fileName === 'Backgrounds.yml' || fileName === 'Proficiencies.yml') {
            recordAbilitiesFrom(dictContent, abilities);
            normalizeInheritAbilities(dictContent);
        }

        if ('Class' in dictContent) {
            recordAbilitiesFrom(dictContent, abilities);
            normalizeInheritAbilities(dictContent);
            recordAbilitiesFrom(dictContent, classRaceAbilities);
        }

        if (fileName === 'Backgrounds.yml') {
            backgrounds = Object.keys(dictContent);
        }

        if (fileName.includes('Rules.yml')) {
            rulesLists = getFormatSectionsObjectList(dictContent);
            rulesDicts = getFormatSectionsObjectDict(dictContent);
        }

        if ('Race' in dictContent) {
            recordAbilitiesFrom(dictContent, abilities);
            normalizeInheritAbilities(dictContent);
            recordAbilitiesFrom(dictContent, classRaceAbilities);
        }

        const fileNameNoExt = path.parse(fileName).name;
        const fileDir = path.dirname(fileName);
        const outputPath = path.join(jsonRootFolder, fileDir, `${fileNameNoExt}.json`);

        const jsonString = JSON.stringify(dictContent, null, 4);

        try {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, jsonString, 'utf-8');
        } catch (err) {
            console.error(`ERROR: Failed to write JSON to ${outputPath}`);
            throw err;
        }
    }

    

    if (!shouldGenerateSpecificFiles) {
        const overallData = {
            Races: races,
            Classes: classes,
            Backgrounds: backgrounds
        };

        try {
            fs.writeFileSync(
                path.join(jsonRootFolder, 'OverallData.json'),
                JSON.stringify(overallData, null, 4),
                'utf-8'
            );

            fs.writeFileSync(
                path.join(jsonRootFolder, 'ClassAndRaceAbilities.json'),
                JSON.stringify(classRaceAbilities, null, 4),
                'utf-8'
            );

            fs.writeFileSync(
                path.join(jsonRootFolder, 'RulesLists.json'),
                JSON.stringify(rulesLists, null, 4),
                'utf-8'
            );

            fs.writeFileSync(
                path.join(jsonRootFolder, 'RulesDicts.json'),
                JSON.stringify(rulesDicts, null, 4),
                'utf-8'
            );
        } catch (err) {
            console.error('ERROR: Failed to write summary JSON files:', err);
            throw err;
        }
    }
}


processFiles()