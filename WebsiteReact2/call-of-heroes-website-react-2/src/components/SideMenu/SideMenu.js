import React from 'react'
import { useState } from 'react'
import { titleToId } from '../../utils'
import Icon from '../Icon'

// import './SideMenu.css'
import './SideMenu.css'


const TEMPLATE_SECTIONS = {
    "Cleric": [
        'Class Features',
        'Proficiencies',
        'Leveling Up',
        'Spell Casting',
        'Starting Abilities'
    ]
}

export function SideMenu({children, sections}) {
    const sectionNames = Object.keys(sections)
    return (
        <div className='side-menu'>
            <div className='side-menu-content'>
                { sectionNames.map(sectionName => (
                    <div key={sectionName}>
                        <a href={'#' + titleToId(sectionName)}>
                            <h4>{sectionName}</h4>
                        </a>
                        <ul>
                            { sections[sectionName].map(subtitle => (
                                <li key={subtitle}>
                                    <a href={'#' + titleToId(subtitle)}>
                                        <Icon name="BulletPoint"/> {subtitle}
                                    </a>
                                </li>
                            )) }
                        </ul>
                    </div>
                )) }
            </div>
        </div>
    )
}

export function SideMenuFromClass({theClass}) {
    const sections = {
        [theClass.Class]: [
            'Class Features',
            'Proficiencies',
            'Leveling Up',
            'Spell Casting',
            'Starting Abilities'
        ]
    }
    const specNames = Object.keys(theClass.Specs)
    for (const specName of specNames) {
        sections[specName] = []
    }
    return SideMenu({sections: sections})
}

export function SideMenuFromRace({theRace}) {
    const sections = {
        [theRace.Race]: [
            theRace.Race,
            'Race Features',
            'Proficiencies',
            'Abilities',
        ]
    }
    return SideMenu({sections: sections})
}