
import { useState } from 'react'
import './Tabs.css'
import Selector from '../Selector/Selector'
import { splitArrayEvenly } from '../../utils'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import ThreeColumns from '../TwoColumns/ThreeColumns'


export default function Tabs({ layout, getTabIconSrc, tabComponents, activeTabI, setActiveTabI, activeTabName, setActiveTabName, isFirstTabLarge=false }) {
    
    const tabNames = layout.flat()
    const selectedTabName =
        setActiveTabName != null?
            activeTabName:
        setActiveTabI != null?
            tabNames[activeTabI]:
        null

    console.log({selectedTabName})

    function onTabClick(i, name) {
        if (setActiveTabI != null) {
            setActiveTabI(i)
        }
        if (setActiveTabName != null) {
            setActiveTabName(name)
        }
    }

    function TabSelector({name, i}) {
        return (
            <Selector
                name={name}
                src={`/Icons/UI/Tabs/${name.split(' ').join('_')}.png`}
                isSelected={selectedTabName == name}
                onClick={() => onTabClick(i, name)}
            />
        )
    }

    const tabNamesWithI = tabNames.map((name, i) => ({ name, i }))

    const firstTabLarge = isFirstTabLarge? tabNamesWithI[0]: null
    const restOfTabNames = isFirstTabLarge? tabNamesWithI.slice(1): tabNamesWithI
    const tabNamesByColumns = splitArrayEvenly(restOfTabNames, 3)

    

    return (
        <div className="tabs">


            {/* <div className="tab-headers">
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
            </div> */}
            
            <div className='tab-headers flex-column gap-half'>
                { layout.map((row, i) => (
                    <div className='flex-row gap-half' key={`tab-row-${i}`}>
                        { row.map((tabName, i) => (
                            <TabSelector name={tabName} i={tabNames.indexOf(tabName)} key={tabName}/>
                        )) }
                    </div>
                )) }

            </div>


            <div className="tab-content margin-top-2">
                { tabComponents.map((component, i) => (
                    <div className={`tab ${selectedTabName == tabNames[i]? 'selected': 'unselected'}`}>
                        { component }
                    </div>
                )) }
            </div>
        </div>
    )
}

