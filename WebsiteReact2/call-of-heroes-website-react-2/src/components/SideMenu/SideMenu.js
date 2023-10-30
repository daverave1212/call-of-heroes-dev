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

function MenuTitle({name}) {
    return (
        <a href={'#' + titleToId(name)}>
            <h4 className='side-menu-h4'>{name}</h4>
        </a>
    )
}
function MenuSubtitle({name}) {
    return (
        <li className='side-menu-subtitle-li'>
            <a href={'#' + titleToId(name)}>
                <Icon name="BulletPoint"/> {name}
            </a>
        </li>
    )
}

export function SideMenu({children, sections}) {
    const sectionNames = Object.keys(sections)
    return (
        <div className='side-menu'>
            <div className='side-menu-content'>
                { sectionNames.map(sectionName => (
                    <div key={sectionName}>
                        <MenuTitle name={sectionName}/>
                        <ul className='side-menu-ul'>
                            { sections[sectionName].map(subtitle => (<MenuSubtitle name={subtitle}/>)) }
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
            theClass.Spellcasting.SpellsOrAbilities == 'Spell'? 'Spells and Mana': 'Abilities and Mana',
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

export function SideMenuFromRuleSection({ruleSection}) {
    const subsections = ruleSection.subsections
    const sections = []
    for (const subsection of subsections) {
        sections[subsection.title] = subsection.titles
    }
    return SideMenu({sections: sections})
}