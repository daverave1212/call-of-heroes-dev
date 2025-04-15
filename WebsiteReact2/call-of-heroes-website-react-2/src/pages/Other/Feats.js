import React, { useState } from 'react'

import feats from '../../databases/Feats.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'
import { SelectorsByColumns } from './Abilities'
import { QGTitle1 } from '../Tools/TitleGenerator'



export default function Feats({ selectedSpellNames, setSelectedSpellNames }) {

    let [selectedSelectorName, setSelectedSelectorName] = useState('Standard Feats')

    const categories = Object.keys(feats).filter(c => c != 'default')
    const categoriesSrcs = {
        'Standard Feats': 'Skill_Training',
        'Technique Feats': 'Old-Fashioned_Armsman',
        'Afflictions': 'Chronic_Sickness',
        'Class Feats': 'Old_Ritual',
        'Multiclass Feats': 'MC_-_Shaman',
        'Multirace Feats': 'MR_-_Davel'
    }
    const selectorData = categories.map(c => ({ name: c, src: `/Icons/Spells/${categoriesSrcs[c]}.png` }))

    document.title = 'Feats'

    return (
        <div>
            <SideMenu sections={{
                'Feats': categories
            }}/>

            <Page>
                <QGTitle1 text="Feats" height={60}/>
                <SelectorsByColumns nColumns={2} selectorData={selectorData} selectedSelectorName={selectedSelectorName} setSelectedSelectorName={setSelectedSelectorName}/>
            </Page>
            
            <Page title={selectedSelectorName} isSecondaryPage={true}>
                <ManySpells spells={feats[selectedSelectorName]} selectedSpellNames={selectedSpellNames} setSelectedSpellNames={setSelectedSpellNames}/>
            </Page>
        </div>
    )

}
