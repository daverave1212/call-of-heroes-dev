


import rulesData from '../../databases/RulesDicts.json'
import Page from '../../containers/Page/Page'
import PageH2 from '../PageH2/PageH2'
import PageH3 from '../PageH3/PageH3'
import { getPageHashFromLocation, scrollToId, titleToId } from '../../utils'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SideMenuFromRuleSection } from '../SideMenu/SideMenu'

export default function RulesPageDefault({title}) {

    const location = useLocation()

    useEffect(() => {
        const hash = getPageHashFromLocation(location)
        scrollToId(hash, 85)
    })

    const rulesSectionObj = rulesData[title]
    console.log(rulesSectionObj)
    return (
        <div>
            <SideMenuFromRuleSection rulesSection={rulesSectionObj}/>
            <Page title="A. Questguard For Beginners">
                { Object.keys(rulesSectionObj).map(sectionTitle => (
                    <div>
                        <PageH2 id={titleToId(sectionTitle)}>{ sectionTitle }</PageH2>
                        { Object.keys(rulesSectionObj[sectionTitle]).map(subsectionTitle => (
                            <div>
                                <PageH3 id={titleToId(subsectionTitle)}>{ subsectionTitle }</PageH3>
                                <p>{ rulesSectionObj[sectionTitle][subsectionTitle] }</p>
                            </div>
                        )) }
                    </div>
                )) }
            </Page>
        </div>
    )
}