
import { useState } from 'react'
import './Tabs.css'
import Selector from '../Selector/Selector'
import { splitArrayEvenly } from '../../utils'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import ThreeColumns from '../TwoColumns/ThreeColumns'




export default function Tabs({ tabNames, tabComponents, activeTabI, setActiveTabI, isFirstTabLarge=false }) {

    function onTabClick(i) {
        setActiveTabI(i)
    }

    function TabSelector({name, i}) {
        return (
            <Selector
                name={name}
                src={`/Icons/UI/Tabs/${name.split(' ').join('_')}.png`}
                isSelected={activeTabI == i}
                onClick={() => onTabClick(i)}
            />
        )
    }

    const tabNamesWithI = tabNames.map((name, i) => ({ name, i }))

    const firstTabLarge = isFirstTabLarge? tabNamesWithI[0]: null
    const restOfTabNames = isFirstTabLarge? tabNamesWithI.slice(1): tabNamesWithI
    const tabNamesByColumns = splitArrayEvenly(restOfTabNames, 3)

    

    return (
        <div className="tabs">
            {/* <div className="tab-names">
                { tabNames.map((name, i) => (
                    <h4 onClick={() => onTabClick(i)} className={activeTabI == i? 'selected': ''}>
                        { name }
                    </h4>
                )) }
            </div> */}
            <div className="tab-headers">
                { isFirstTabLarge && (
                    <TabSelector name={firstTabLarge.name} i={0} key={firstTabLarge.name}/>
                ) }
                <ThreeColumns style={{gap: '1rem'}}>
                    { tabNamesByColumns.map(tabNamesColumn => (
                        <Column>
                            { tabNamesColumn.map(tab => (
                                <TabSelector name={tab.name} i={tab.i} key={tab.name}/>
                            )) }
                        </Column>
                    )) }
                </ThreeColumns>
            </div>

            <div className="tab-content margin-top-2">
                { tabComponents.map((component, i) => (
                    <div className={`tab ${activeTabI == i? 'selected': 'unselected'}`}>
                        { component }
                    </div>
                )) }
            </div>
        </div>
    )
}

