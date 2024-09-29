import React from 'react'
import { useState } from 'react'
import { titleToId } from '../../utils'
import Icon from '../Icon'

// import './SideMenu.css'
import './SideMenu.css'
import classNames from 'classnames'


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

export function SideMenu({isAbsolute, highlightedSection, sections}) {
    const sectionNames = Object.keys(sections)
    return (
        <div className={classNames('side-menu', {
            'absolute': isAbsolute === true
        })}>
            <div className='side-menu-content'>
                { sectionNames.map(sectionName => (
                    <div key={sectionName}>
                        <MenuTitle name={sectionName}/>
                        <ul className='side-menu-ul'>
                            { sections[sectionName].map(subtitle => (<MenuSubtitle name={subtitle} key={subtitle}/>)) }
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
            'Abilities',
            'Racial Ability Choice'
        ]
    }
    return SideMenu({sections: sections})
}

export function SideMenuFromRuleSection({rulesSection}) {
    const sections = {}
    for (const subsectionName of Object.keys(rulesSection)) {
        sections[subsectionName] = Object.keys(rulesSection[subsectionName])
    }
    return SideMenu({sections: sections})
}