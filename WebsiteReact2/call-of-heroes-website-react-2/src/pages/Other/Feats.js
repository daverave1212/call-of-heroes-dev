import React, { useState } from 'react'

import feats from '../../databases/Feats.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'



export default function Feats() {

    const categories = Object.keys(feats).filter(c => c != 'default')

    document.title = 'Feats'

    return (
        <div>
            <SideMenu sections={{
                'Feats': categories
            }}/>
            { categories.map(categoryName => (
                <Page title={categoryName} isSecondaryPage={true}>
                    <ManySpells spells={feats[categoryName]}/>
                </Page>
            )) }
        </div>
    )

}
