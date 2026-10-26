import Bertle from '../../databases/Races/Bertle.json'
import Dwarf from '../../databases/Races/Dwarf.json'
import Elf from '../../databases/Races/Elf.json'
import Gnome from '../../databases/Races/Gnome.json'
import Human from '../../databases/Races/Human.json'

import Dragonborn from '../../databases/Core/Races/Dragonborn.json'
import Hollow from '../../databases/Core/Races/Hollow.json'
import Orc from '../../databases/Core/Races/Orc.json'

import cache from '../data-caching/cache'

import { getDocInCollection } from '../online-database/Database'
import { classExists, getClassLocal } from './ClassProvider'
import { FEATURES, getFeatureItemAsync, getFeatureItemLocal } from './ContentProvider'
import { getAllSpellsByNameFromObject } from '../../utils'
import { useEffect, useState } from 'react'

const RacesBase = {
    Bertle,
    Dwarf,
    Elf,
    Littlefolk: Gnome,
    Human,
}
const RacesPremium = {
    Dragon: Dragonborn,
    Hollow,
    Giant: Orc,
}
const Races = {
    ...RacesBase,
    ...RacesPremium
}


export function getAllRaceNames() {
    return Object.keys(Races)
}
export function getRaceLocal(raceName) {
    return Races[raceName]
}
export function raceExists(raceName) {
    return getAllRaceNames().includes(raceName)
}

export async function getRaceAsync(raceName) {
    return await getFeatureItemAsync(FEATURES.Races, raceName)
}

export async function getAllPremiumRaceNamesAsync() {
    const allFileNames = await getSetFileNamesAsync('Race').map(path => getFileName(path))
    return allFileNames
}


let _allRaceSpellsCached = null;
let _allRaceSpellsPromise = null;

export function getAllRaceSpellsByNameLocal() {    // NOTE: This will not work for all spells all the time; if there's a cached obj, it returns it with potentially more spells!
    if (_allRaceSpellsCached != null) {
        return _allRaceSpellsCached
    }
    let spells = {}
    for (const classObj of Object.values(Races)) {
        spells = {...spells, ...getAllSpellsByNameFromObject(classObj)}
    }

    return spells
}

export function useConstAllRaceSpellsByName() {
    const [spells, setSpells] = useState(() => {
        if (_allRaceSpellsCached) return _allRaceSpellsCached;

        const allSpells = {};

        for (const raceName of getAllRaceNames()) {
            const raceObj = getFeatureItemLocal(FEATURES.Races, raceName);

            if (raceObj) {
                Object.assign(
                    allSpells,
                    getAllSpellsByNameFromObject(raceObj)
                );
            }
        }

        return allSpells;
    });

    useEffect(() => {
        let cancelled = false;

        getAllRaceSpellsByNameAsync()
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

export async function getAllRaceSpellsByNameAsync() {
    if (_allRaceSpellsCached) {
        return _allRaceSpellsCached;
    }

    if (!_allRaceSpellsPromise) {
        _allRaceSpellsPromise = Promise.all(
            getAllRaceNames().map(raceName =>
                getFeatureItemAsync(FEATURES.Races, raceName)
            )
        ).then(races => {
            const allSpells = {};

            for (const raceObj of races) {
                if (!raceObj) continue;

                Object.assign(
                    allSpells,
                    getAllSpellsByNameFromObject(raceObj)
                );
            }

            _allRaceSpellsCached = allSpells;
            return allSpells;
        }).catch(error => {
            _allRaceSpellsPromise = null;
            throw error;
        });
    }

    return _allRaceSpellsPromise;
}

window.getRaceAsync = getRaceAsync










window.getAllRaceNames = getAllRaceNames