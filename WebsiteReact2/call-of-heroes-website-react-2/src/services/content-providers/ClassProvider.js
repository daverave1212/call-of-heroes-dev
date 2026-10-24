import Cleric from '../../databases/ClassesV2/Priest.json'
import Druid from '../../databases/ClassesV2/Druid.json'
import Hunter from '../../databases/ClassesV2/Hunter.json'
import Rogue from '../../databases/ClassesV2/Rogue.json'
import Shaman from '../../databases/ClassesV2/Shaman.json'
import Sorcerer from '../../databases/Core/Classes/Sorcerer.json'
import Warlock from '../../databases/ClassesV2/Warlock.json'
import Warrior from '../../databases/ClassesV2/Warrior.json'
import Wizard from '../../databases/ClassesV2/Wizard.json'
import Artificer from '../../databases/Core/Classes/Artificer.json'
import Berserker from '../../databases/ClassesV2/Berserker.json'
import Knight from '../../databases/Core/Classes/Knight.json'
import Mystic from '../../databases/ClassesV2/Mystic.json'
import Paladin from '../../databases/ClassesV2/Paladin.json'
import Soulwright from '../../databases/ClassesV2/Soulwright.json'
import Outlaw from '../../databases/Core/Classes/Swashbuckler.json'
import Wickan from '../../databases/ClassesV2/Wickan.json'
import Cursewielder from '../../databases/ClassesV2/Cursewielder.json'

import cache from '../data-caching/cache'

import OverallData from '../../databases/OverallData.json'
import { getAllSpellsByNameFromObject, getFileName, getSetFeatureId, getSetLiveVersionAsync, getSetsConfigAsync, getSetsConfigNoBasicAsync, isNewer, isSetFreeAsync, isSetPremiumAsync } from '../../utils'
import { doIOwnSetAsync, isSetUnavailableAsync } from '../auth/Auth'
import { getDocInCollection } from '../online-database/Database'
import { FEATURES, getFeatureItemAsync, getFeatureItemLocal } from './ContentProvider'
import { useEffect, useState } from 'react'

export const ClassesBase = {
    Cleric,
    Druid,
    Hunter,
    Rogue,
    Warlock,
    Warrior,
    Wizard,
}
export const ClassesPremium = {
    Artificer,
    Knight,
    Sorcerer,
    Outlaw,
}
export const ClassesLegacy = {
}

export const Classes = {
    ...ClassesBase,
    ...ClassesPremium,
    ...ClassesLegacy
}

export function getAllClassNames() {
    return OverallData.Classes
}
export function getClassLocal(name) {
    return Classes[name]
}
export function classExists(name) {
    return OverallData.Classes.includes(name)
}
export async function getClassAsync(name) {
    return await getFeatureItemAsync(FEATURES.Classes, name)
}

let _allClassSpellsCached = null;
let _allClassSpellsPromise = null;
export function useConstAllClassSpellsByName() {
    const [spells, setSpells] = useState(() => {
        if (_allClassSpellsCached) return _allClassSpellsCached;

        const allSpells = {};

        for (const className of getAllClassNames()) {
            const classObj = getFeatureItemLocal(FEATURES.Classes, className);

            if (classObj) {
                Object.assign(allSpells, getAllSpellsByNameFromObject(classObj));
            }
        }

        return allSpells;
    });

    useEffect(() => {
        if (_allClassSpellsCached) {
            setSpells(_allClassSpellsCached);
            return;
        }

        let cancelled = false;

        if (!_allClassSpellsPromise) {
            _allClassSpellsPromise = Promise.all(
                getAllClassNames().map(className =>
                    getFeatureItemAsync(FEATURES.Classes, className)
                )
            ).then(classes => {
                const allSpells = {};

                for (const classObj of classes) {
                    if (!classObj) continue;

                    Object.assign(allSpells, getAllSpellsByNameFromObject(classObj));
                }

                _allClassSpellsCached = allSpells;
                return allSpells;
            }).catch(error => {
                _allClassSpellsPromise = null;
                throw error;
            });
        }

        _allClassSpellsPromise
            .then(result => {
                if (!cancelled) setSpells(result);
            })
            .catch(console.error);

        return () => {
            cancelled = true;
        };
    }, []);

    return spells;
}