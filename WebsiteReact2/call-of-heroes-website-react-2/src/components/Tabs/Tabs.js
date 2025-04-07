
import { useState } from 'react'
import './Tabs.css'




export default function Tabs({ tabNames, tabComponents }) {

    let [activeTabI, setActiveTabI] = useState(0)

    function onTabClick(i) {
        setActiveTabI(i)
    }

    return (
        <div className="tabs">
            <div className="tab-names">
                { tabNames.map((name, i) => (
                    <h4 onClick={() => onTabClick(i)} className={activeTabI == i? 'selected': ''}>
                        { name }
                    </h4>
                )) }
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

