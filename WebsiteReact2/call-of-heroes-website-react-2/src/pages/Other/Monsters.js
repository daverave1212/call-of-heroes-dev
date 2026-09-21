import React, { useEffect } from 'react'
import { useState } from 'react'

import * as U from '../../utils'
import Page from '../../containers/Page/Page'

import monsters from '../../databases/Other/Monsters.json'
import TableNormal from '../../components/TableNormal/TableNormal'
import { Link } from 'react-router-dom'
import SmallStat from '../../components/SmallStat/SmallStat'
import { useFeatureItem } from '../../services/content-providers/ContentProvider'
import { LoadingCenter } from '../../components/Loading/Loading'

function monstersObjToArray(monstersObj) {
    const monstersArr = U.objectToArray(monstersObj, 'Name')
    const filteredArr = monstersArr.filter(monster => monster.Name != 'Template' && monster.Name.endsWith('OLD') == false)
    return filteredArr
}

export default function Monsters({}) {

    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
    const [currentlyHoveredMonster, setCurrentlyHoveredMonster] = useState(null)
    const [searchText, setSearchText] = useState('')
    
    const [allMonsters, isLoading] = useFeatureItem('other', 'Monsters')
    const [monstersArray, setMonstersArray] = useState(monstersObjToArray(allMonsters))

    useEffect(() => {
        console.log('🛺 allMonsters changed! Here it is:')
        setMonstersArray(monstersObjToArray(allMonsters))
        console.log({allMonsters, monstersArray: monstersObjToArray(allMonsters)})
    }, [allMonsters])

    function onInputChange(evt) {
        const inputValue = evt.target.value
        setSearchText(inputValue)
    }


    // Not used
    function onMouseEnterMonster(monsterName, evt) {
        return
        if (window.screen.width < window.screen.height || U.isMobile()) {
            return
        }
        setCurrentlyHoveredMonster(monsterName)
        setMouseCoords({ x: evt.clientX, y: evt.pageY })
    }
    function onMouseMoveMonster(evt) {
        return
        console.log({ x: evt.clientX, y: evt.pageY })
        setMouseCoords({ x: evt.clientX, y: evt.pageY })
    }
    function onMouseLeaveMonster() {
        return
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

            { isLoading? <LoadingCenter/>: (
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
            ) }
        </Page>
    )
}