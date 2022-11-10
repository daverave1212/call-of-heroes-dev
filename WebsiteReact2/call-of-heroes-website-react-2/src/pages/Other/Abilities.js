import React from 'react'

import abilities from '../../databases/Abilities.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'



export default function Abilities() {

    const categories = Object.keys(abilities).filter(c => c != 'default')

    return (
        <div>
            { categories.map(categoryName => (
                <div key={categoryName} className='page'>
                    <PageH1>{ categoryName }</PageH1>
                    <ManySpells spellsObject={abilities[categoryName]}/>
                </div>
            )) }
        </div>
    )

}