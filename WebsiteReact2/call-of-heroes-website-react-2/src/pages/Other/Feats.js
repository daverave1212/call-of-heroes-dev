import React, { useState } from 'react'

import feats from '../../databases/Feats.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'



export default function Feats() {

    const categories = Object.keys(feats).filter(c => c != 'default')

    return (
        <div>
            { categories.map(categoryName => (
                <Page title={categoryName}>
                    <ManySpells spellsObject={feats[categoryName]}/>
                </Page>
            )) }
        </div>
    )

}