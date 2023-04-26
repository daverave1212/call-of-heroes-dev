import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import armors from '../../databases/Armors.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import monsters from '../../databases/Monsters.json'
import TableNormal from '../../components/TableNormal/TableNormal'
import { Link } from 'react-router-dom'
import SmallStat from '../../components/SmallStat/SmallStat'

export default function Monsters({}) {

    const [searchObject, setSearchObject] = useState({
        type: 'simple',
        searchValue: '',
        searchKVPs: []
    })

    const monstersArray = Object.keys(monsters)
        .map(name => ({...monsters[name], Name: name}))
        .filter(monster => monster.Name != 'Template' && monster.Name.endsWith('OLD') == false)

    function onInputChange(evt) {
        const inputValue = evt.target.value
        
        const isSimpleSearch = inputValue.includes(':') == false
        if (isSimpleSearch) {
            setSearchObject({
                type: 'simple',
                searchValue: inputValue.trim(),
                searchKVPs: []
            })
            return
        }
        
        const searchKeyValuePairs = []
        for (const kvpByColon of inputValue.split(' ')) {                                       // 'name:ogre type:giant' -> ['name:ogre', 'type:giant']
            const kvpNice = kvpByColon.trim()
            const [key, value] = kvpNice.split(':')                                             // 'name:ogre' -> ['name', 'ogre']
            if (key == null || value == null || key.length == 0 || value.length == 0) continue
            searchKeyValuePairs.push({                                                          // {key: 'name', value: 'ogre'}
                key: key.toLowerCase(),
                value: value.toLowerCase()
            })
        }
        setSearchObject({
            type: 'complex',
            searchValue: inputValue,
            searchKVPs: searchKeyValuePairs
        })

    }

    function isMatchingByKVP(monster) {
        console.log({monster, searchObject})
        const searchValueTrimmed = searchObject.searchValue.trim()
        if (searchObject.type == 'simple') {    // Monster name simply matches the search
            if (searchValueTrimmed == 0) return true
            console.log({
                lc: monster.Name.toLowerCase(),
                includes: monster.Name.toLowerCase().includes(searchValueTrimmed)
            })
            return monster.Name.toLowerCase().includes(searchValueTrimmed) ||
                monster.Type.toLowerCase().includes(searchValueTrimmed) ||
                (monster.Degree != null && monster.Degree.toLowerCase().includes(searchValueTrimmed)) ||
                `${monster.Experience}` == searchValueTrimmed
        }
        for (const { key, value } of searchObject.searchKVPs) {
            const realKey = U.capitalizeFirstLetter(key)
            const monsterValue = `${monster[realKey]}`
            if (monsterValue == null)
                return true
            if (monsterValue.toLowerCase().includes(value) == false)
                return false
        }
        return true
    }

    return (
        <Page title="Monsters">

            <SmallStat name="Search">
                <input value={searchObject.searchValue} onChange={onInputChange} style={{fontSize: 'var(--text-font-size)'}}/>
            </SmallStat>

            <TableNormal columns={['Name', 'Type', 'Experience', 'Degree']}>
                { monstersArray
                    .filter(monster => isMatchingByKVP(monster))
                    .map(monster => (
                        <tr key={monster.Name}>
                            <td><Link to={`/Other/Monster#${monster.Name}`}>{ monster.Name }</Link></td>
                            <td>{ monster.Type }</td>
                            <td>{ monster.Experience }</td>
                            <td>{ monster.Degree == null? 'Normal' : monster.Degree }</td>
                        </tr>
                    ))
                }
            </TableNormal>
        </Page>
    )
}