


import rulesData from '../../databases/RulesDicts.json'
import Page from '../../containers/Page/Page'
import PageH2 from '../PageH2/PageH2'
import PageH3 from '../PageH3/PageH3'

export default function RulesPageDefault({title}) {
    const rulesSectionObj = rulesData[title]
    console.log({rulesSectionObj})
    return (
        <Page title="A. Questguard For Beginners">
            { Object.keys(rulesSectionObj).map(sectionTitle => (
                <div>
                    <PageH2>{ sectionTitle }</PageH2>
                    { Object.keys(rulesSectionObj[sectionTitle]).map(subsectionTitle => (
                        <div>
                            <PageH3>{ subsectionTitle }</PageH3>
                            <p>{ rulesSectionObj[sectionTitle][subsectionTitle] }</p>
                        </div>
                    )) }
                </div>
            )) }
        </Page>
    )
}