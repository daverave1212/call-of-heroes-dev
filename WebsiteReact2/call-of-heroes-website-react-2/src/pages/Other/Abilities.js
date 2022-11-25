import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'



export default function Abilities() {

    const categories = Object.keys(abilities).filter(c => c != 'default')

    function AbilityCategory({categoryName}) {

        const [state, setState] = useState({ isExpanded: true })

        const pageDisplayStyle  = state.isExpanded == true? { display: '' } : { display: 'none' }
        const togglePageDisplay = () => setState({ isExpanded: !state.isExpanded })

        return (
            <div key={categoryName} className='page'>
                <PageH1 onClick={togglePageDisplay}>{ categoryName }</PageH1>
                <div style={pageDisplayStyle}>
                    <ManySpells spellsObject={abilities[categoryName]}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            { categories.map(categoryName => (
                <AbilityCategory categoryName={categoryName}/>
            )) }
        </div>
    )

}