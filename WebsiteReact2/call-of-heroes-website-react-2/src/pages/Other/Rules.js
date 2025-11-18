import React from 'react'
import { useState } from 'react'
import './Rules.css'

import * as U from '../../utils'
import Page from '../../containers/Page/Page'
import { Link } from 'react-router-dom'
import ThreeColumns from '../../components/TwoColumns/ThreeColumns'
import Column from '../../components/TwoColumns/Column'
import { TDBullet, TDSleek1, TDSleek2, TDSleek3 } from '../../components/TableNormal/TDSleek'

import rules from '../../databases/Rules/Rules.json'
import { QGTitle1 } from '../Tools/TitleGenerator'
import PageH1 from '../../components/PageH1/PageH1'
import PageH2 from '../../components/PageH2/PageH2'
import PageH3 from '../../components/PageH3/PageH3'





function RulesSection({obj}) {

    return (
        <div>
            <RulesH1 title={title}/>
            { subobjects.map(sectionObj => (
                <>
                    {/* <RulesH2 title={U.getOnlyKey(sectionObj)}/> */}
                    {/* { U.getOnlyProp(sectionObj).map(subsectionObj => (
                        <RulesH3 title={U.getOnlyKey(subsectionObj)}/>
                    )) } */}

                </>

            )) }
        </div>
    )
}

export default function Rules({}) {

    const [currentRule, setCurrentRule] = useState(null)

    function RulesH1({title}) {
        return (
            <TDSleek1>
                <Link to={`/Other/RulesAll#${U.titleToId(title)}`}>{ title }</Link>
            </TDSleek1>
        )
    }
    function RulesH2({title}) {
        return (
            <TDSleek2>
                <Link to={`/Other/RulesAll#${U.titleToId(title)}`}>{ title }</Link>
            </TDSleek2>
        )
    }
    function RulesH3({title}) {
        return (
            <TDSleek3>
                <Link to={`/Other/RulesAll#${U.titleToId(title)}`}><TDBullet/>{ title }</Link>
            </TDSleek3>
        )
    }
    function ColumnsContent() {
        return <>
            { U.mapObjectToArray(rules, (columnName, chapters) => (
                <Column>
                    { U.mapObjectToArray(chapters, (chapterTitle, sections) => (<>
                        <RulesH1 title={chapterTitle}/>
                        { U.mapObjectToArray(sections, (sectionName, section) => (
                            <>
                                <RulesH2 title={sectionName}/>
                                { U.mapObjectToArray(section, (pointName, pointText) => (
                                    <RulesH3 title={pointName}/>
                                )) }
                            </>
                        )) }
                    </>)) } 
                </Column>
            ))}
        </>
    }



    // return (
    //     <Page hasNoLimits={true} hasNoMargins={true}>
    //         <div className='full-width flex row' style={{gap: '2rem'}}>
    //             <div style={{flex: 1, border: 'solid black 1px', padding: '2px'}}>
    //                 <ThreeColumns style={{gap: '2px'}}>
    //                     <ColumnsContent/>
    //                 </ThreeColumns>
    //             </div>

    //             <div style={{flex: 4}}>
    //                 <AllRules/>
    //             </div>
    //         </div>
    //     </Page>
    // )

    return (
        <Page>
            <div className='center-text center-content'>
                <QGTitle1 text={"Rules"}/>
                <p style={{fontSize: '1.5em'}} className='margin-top-1'>Hit <span className='keyboard-key'>CTRL</span> + <span className='keyboard-key'>F</span> to search for your rule!</p>
            </div>
            <div className='rules-box margin-top-2'>
                
                <ThreeColumns>
                    <ColumnsContent/>
                </ThreeColumns>

            </div>
        </Page>
    )

}