import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import PageH0 from '../../components/PageH0/PageH0'

import './Page.css'



export default function Page({ children, title }) {

    const [state, setState] = useState({ isExpanded: true })

    const pageDisplayStyle  = state.isExpanded == true? { display: '' } : { display: 'none' }
    const togglePageDisplay = () => setState({ isExpanded: !state.isExpanded })

    return (
        <div className="page">
            { title != null && (
                // <PageH1 onClick={togglePageDisplay}>{ title }</PageH1>
                <PageH0>{ title }</PageH0>
            ) }
            <div className='page-content' style={pageDisplayStyle}>
                { children }
            </div>
        </div>
    )

}