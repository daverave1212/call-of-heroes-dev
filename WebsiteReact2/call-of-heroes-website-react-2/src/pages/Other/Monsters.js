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
import MonsterBlock from '../../components/MonsterBlock/MonsterBlock'

export default function Monsters({}) {

    const [searchText, setSearchText] = useState('')
    const [currentlyHoveredMonster, setCurrentlyHoveredMonster] = useState(null)
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
    const [monstersArray, setMonstersArray] = useState(
        Object.keys(monsters)
            .map(name => ({...monsters[name], Name: name}))
            .filter(monster => monster.Name != 'Template' && monster.Name.endsWith('OLD') == false)
    )

    function onInputChange(evt) {
        const inputValue = evt.target.value
        setSearchText(inputValue)
    }

    function onMouseEnterMonster(monsterName, evt) {
        if (window.screen.width < window.screen.height || U.isMobile()) {
            return
        }
        setCurrentlyHoveredMonster(monsterName)
        setMouseCoords({ x: evt.clientX, y: evt.pageY })
    }
    function onMouseMoveMonster(evt) {
        console.log({ x: evt.clientX, y: evt.pageY })
        setMouseCoords({ x: evt.clientX, y: evt.pageY })
    }
    function onMouseLeaveMonster() {
        setCurrentlyHoveredMonster(null)
    }

    const [sortedAscending, setSortedAscending] = useState({
        name: true,
        type: true,
        experience: true,
        degree: true
    })

    const compareAscending = (a, b) => a - b
    const compareDescending = (a, b) => b - a
    function sortByXP() {
        const isAscending = sortedAscending.experience
        setMonstersArray(monstersArray.sort((a, b) => {
            const compareFunc = isAscending? compareAscending: compareDescending
            return compareFunc(parseInt(a.Experience), parseInt(b.Experience))
        }))
        setSortedAscending({...sortedAscending, experience: !sortedAscending.experience})
    }

    function onClickOnColumn(whatColumn) {
        if (whatColumn == 'Experience') {
            sortByXP()
        }
    }

    return (
        <Page title="Monsters">

            <SmallStat name="Search">
                <input placeholder='demon & >100' value={searchText} onChange={onInputChange} style={{fontSize: 'var(--text-font-size)'}}/>
            </SmallStat>

            { currentlyHoveredMonster != null && (
                <div className='monster-preview' style={{top: (mouseCoords.y - 150) + 'px', left: (mouseCoords.x + 50) + 'px'}} >
                    <MonsterBlock monsterName={currentlyHoveredMonster} monster={monsters[currentlyHoveredMonster]} isPreview={true}/>
                </div>
            ) }

            <TableNormal columns={['Name', 'Type', 'Experience', 'Degree']} onClickOnColumn={onClickOnColumn}>
                {   U.filterArrayBySearch(monstersArray, monster => monster.Name + ' '  + monster.Experience + ' ' + monster.Type + ' ' + monster.Degree, searchText)
                     .map(monster => (
                        <tr key={monster.Name} onMouseMove={e => onMouseMoveMonster(e)} onMouseEnter={(e) => onMouseEnterMonster(monster.Name, e)} onMouseLeave={onMouseLeaveMonster}>
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