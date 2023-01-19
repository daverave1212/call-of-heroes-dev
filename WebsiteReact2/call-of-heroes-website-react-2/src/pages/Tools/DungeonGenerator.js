import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'

import prices from '../../databases/Prices.json'
import { randomInt, randomOf, shuffle } from '../../utils'


export default function DungeonGenerator() {
    function nonCombatRoomEncounter() {
        return randomOf(
            `a roleplay encounter with ${randomOf('an enemy', 'a neutral character', 'an ally')}`,
            `loot locked behind a ${randomOf('magical', 'physical')} door`,
            `a revelation about the story`
        )
    }
    function doorLock() {
        return randomOf(
            `${randomOf('Simple', 'Difficult', 'Mastercraft')} Lock`,
            randomOf(
                'Riddle',
                'Puzzle'
            )
        )
    }
    function roomCondition() {
        return randomOf(
            'breaking floor',
            'water/lava flooding',
            'toxic gas',
            'a ceileing that is too low',
            'a lot of traps',
            'a gap/wall that separates the room in 2'
        )
    }
    function challenge() {
        return randomOf(
            'high cliff up',
            'descent that is very steep',
            'large gap (or broken bridge)',
            'door to next room is on the ceiling, but stairs are broken',
            'door to next room is in the floor; descend carefully',
            'water that must crossed or submerged through',
            'toxic gas that covers the room',
            'an illusory wall that seems to be the end of the dungeon, anticlimactically',
            'an ambush',
        )
    }


    function generateRoomSequence(nRooms) {
        const combatRoomFactory = [
            () => `Combat`,
            () => `Combat, with ${roomCondition()}`,
            () => `Combat, optional; also, ${randomOf(roomCondition(), challenge())}`,
            () => `Combat, with ${challenge()}${randomOf('', ' and ' + roomCondition())}`,
            () => `Combat, with ${nonCombatRoomEncounter()} at the end`,
        ]
        const nonCombatRoomFactory = [
            () => `Puzzle room`,
            () => `Room with ${nonCombatRoomEncounter()}`,
            () => `Room with ${challenge()}${randomOf('', ' and ' + roomCondition())}`,
        ]

        let rooms = [nonCombatRoomFactory[0]()]   // At least one puzzle room

        while (rooms.length < nRooms) {
            if (rooms.length % 2 == 0) {
                rooms.push(randomOf(...combatRoomFactory)())
            } else {
                if (randomInt(0, 1) == 0) {
                    rooms.push(randomOf(...nonCombatRoomFactory)())
                }
            }
        }

        rooms = shuffle(rooms)
        rooms.push(`Combat [final boss]`)
        return rooms
    }


    function generateDungeon(nRooms) {
        const rooms = generateRoomSequence(nRooms)
        const nDoors = rooms.length - 1
        let doors = []
        for (let i = 0; i < nDoors; i++) {
            if (i % 3 == 1) {
                doors.push(doorLock())
            } else {
                doors.push(null)
            }
        }
        doors = shuffle(doors)
        doors.push(null)            // So last one does not get displayed

        for (let i = 0; i < nRooms; i++) {
            if (doors[i] != null) {
                rooms[i] = (
                    <span><span style={{color: 'red'}}>(Locked by {doors[i]})</span> {rooms[i]}</span>
                )
            }
        }
        return rooms
    }

    const [state, setState] = useState({
        sequenceOfEncouters: []
    })



    return (
        <Page title="Dungeon">
            <div className='centered-content'>
                <button className='button-standard' onClick={() => {
                    const sequenceOfEncouters = generateDungeon(randomInt(3, 6))
                    setState({ sequenceOfEncouters })
                }}>Generate</button>
            </div>
            <div>
                {state.sequenceOfEncouters.map(text => (
                    <p style={{margin: 0}}>{text}</p>
                ))}
            </div>
        </Page>
    )

}