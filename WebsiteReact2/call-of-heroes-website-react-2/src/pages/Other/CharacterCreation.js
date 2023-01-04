import React from 'react'

import './CharacterCreation.css'

import abilities from '../../databases/Abilities.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'

import cc from '../../databases/Rules/CharacterCreation.json'
import PageH3 from '../../components/PageH3/PageH3'
import PageH2 from '../../components/PageH2/PageH2'
import SmallStat from '../../components/SmallStat/SmallStat'
import Page from '../../containers/Page/Page'


export default function CharacterCreation() {

    function MidSection({object, exceptionSubtitles}) {
        if (exceptionSubtitles == null) exceptionSubtitles = []
        const subtitles = Object.keys(object).filter(key => exceptionSubtitles.includes(key) == false)
        return (
            <div style={{marginTop: 'var(--page-padding)', whiteSpace: 'pre-wrap'}}>
                {subtitles.map(subtitle => (
                    <div key={subtitle}>
                        <PageH3>{subtitle}</PageH3>
                        <p>{object[subtitle]}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Page title="Character Creation">
            <MidSection object={cc['Character Creation']}/>

            <PageH2>Social Etiquette</PageH2>
            <MidSection object={cc['Social Etiquette']}/>

            <PageH2>The Actual Character</PageH2>
            <MidSection object={cc['Creating The Actual Character Part 1']}/>

            <div className='character-creation__stats-container'>
                <div className='character-creation__stat'>-1</div>
                <div className='character-creation__stat'>0</div>
                <div className='character-creation__stat'>1</div>
                <div className='character-creation__stat'>2</div>
                <div className='character-creation__stat'>3</div>
            </div>

            <MidSection object={cc['Creating The Actual Character Part 2']}/>

            <div className='with-margined-children'>
                <SmallStat name="Maximum Health">{ cc['Stat Calculations']['Maximum Health'] }</SmallStat>
                <SmallStat name="Speed">{ cc['Stat Calculations']['Speed'] }</SmallStat>
                <SmallStat name="Initiative">{ cc['Stat Calculations']['Initiative'] }</SmallStat>
                <SmallStat name="Defense">{ cc['Stat Calculations']['Defense'] }</SmallStat>
                <SmallStat name="Armor" topDown={true}>{ cc['Stat Calculations']['Armor'] }</SmallStat>
                <SmallStat name="Weapon and Tool Training" topDown={true}>{ cc['Stat Calculations']['Training'] }</SmallStat>
                <SmallStat name="Languages" topDown={true}>{ cc['Stat Calculations']['Languages'] }</SmallStat>
            </div>
        </Page>
    )

}