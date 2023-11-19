import { Link } from "react-router-dom";
import RulesPageDefault from "../../../../components/Rules/RulesPageDefault";
import SmallStat from "../../../../components/SmallStat/SmallStat";
import PageH2 from "../../../../components/PageH2/PageH2";
import PageH3 from "../../../../components/PageH3/PageH3";
import { parseTextWithSymbols } from "../../../../utils";
import Page from "../../../../containers/Page/Page";

import cc from '../../../../databases/Rules/CharacterCreation/CharacterCreationQuick.json'





const linkStyle = { color: 'blue', textDecoration: 'underline'}

const customInsertables = {
    'Initiative': () => (<SmallStat topDown={true} name="Initiative">Your Dexterity + Your Charisma</SmallStat>),
    'Stats': () => (
        <div className='character-creation__stats-container'>
            <div className='character-creation__stat'>-1</div>
            <div className='character-creation__stat'>0</div>
            <div className='character-creation__stat'>1</div>
            <div className='character-creation__stat'>2</div>
            <div className='character-creation__stat'>3</div>
        </div>),
    'Max Health': () => (<SmallStat topDown={true} name="Max Health">Race Health + Your Might</SmallStat>),
    'Speed': () => (<SmallStat topDown={true} name="Movement Speed">Given by your Race</SmallStat>),
    'Armors': () => (<Link style={linkStyle} to="/Other/Armors">Armors</Link>),
    'Proficiencies': () => (<Link style={linkStyle} to="/Other/Proficiencies">Proficiencies</Link>),
    'Feats': () => (<Link style={linkStyle} to="/Other/Feats">Feats</Link>),
    'Speed': () => (<SmallStat topDown={true} name="Spell Grade">6 + A Specific Stat</SmallStat>),
}

export default function CharacterCreation({ isSecondaryPage }) {

    function MidSection({exceptionSubtitles, title, subtitlesThatAreSmallStats}) {
        console.log(`MidSection with ${title}`)
        if (exceptionSubtitles == null) exceptionSubtitles = []
        if (subtitlesThatAreSmallStats == null) subtitlesThatAreSmallStats = []
        console.log({cc})
        console.log({title})
        const subtitles = Object.keys(cc[title]).filter(key => exceptionSubtitles.includes(key) == false)
        return (
            <div style={{marginTop: 'var(--page-padding)', whiteSpace: 'pre-wrap'}} className='with-margined-children'>
                <PageH2>{title}</PageH2>
                {subtitles.map(subtitle => (
                    subtitlesThatAreSmallStats.includes(subtitle) == false ? (
                        <div key={subtitle}>
                            <PageH3>{subtitle}</PageH3>
                            <p>{parseTextWithSymbols(cc[title][subtitle], customInsertables)}</p>
                        </div>
                    ) : (
                        <div key={subtitle}>
                            <PageH3>{subtitle}</PageH3>
                            <SmallStat topDown={true} name={subtitle}>{cc[title][subtitle]}</SmallStat>
                        </div>
                    )
                ))}
            </div>
        )
    }

    return (
        <Page title="Character Creation" isSecondaryPage={isSecondaryPage}>

            <MidSection title={'Character Creation'}/>

            <MidSection title={'Filling the Character Sheet'}/>

            <MidSection title={'Race Fill-Ins'}/>

            <MidSection title={'Race Abilities'}/>
            <MidSection title={'Class Fill-Ins'}/>
            <MidSection title={'Spell Casting'}/>
            <MidSection title={'Leveling Up'}/>
            <MidSection title={'Other Abilities'}/>
            <MidSection title={'Equipment'}/>



            {/* <MidSection object={cc['Character Creation']}/>

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
            </div> */}
        </Page>
    )

}