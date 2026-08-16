
import { useLocation } from 'react-router-dom'
import PageH1 from '../../components/PageH1/PageH1'
import PageH2 from '../../components/PageH2/PageH2'
import PageH3 from '../../components/PageH3/PageH3'
import Page from '../../containers/Page/Page'
import rules from '../../databases/Rules/Rules.json'
import * as U from '../../utils'
import { QGTitle1 } from '../Tools/TitleGenerator'
import { useEffect } from 'react'

function AllRules() {

    function removeLetterAndDot(name) {
        const dotIndex = name.indexOf('.')
        return name.substring(dotIndex + 2)
    }

    return <>
        { U.mapObjectToArray(rules, (columnName, chapters) => (<>
            { U.mapObjectToArray(chapters, (chapterTitle, sections) => (<>
                <div className='center-content margin-top-4 padding-top-4 padding-bottom-4'>
                    <QGTitle1 id={U.titleToId(chapterTitle)} text={removeLetterAndDot(chapterTitle)}/>
                </div>
                { U.mapObjectToArray(sections, (sectionName, section) => (
                    <>
                        <PageH2 id={U.titleToId(sectionName)}>{sectionName}</PageH2>
                        { U.mapObjectToArray(section, (pointName, pointText) => (<>
                            <div className='anchor-fixer' id={U.titleToId(pointName)}></div>
                            <PageH3>{pointName}</PageH3>
                            <p>{pointText}</p>
                        </>)) }
                    </>
                )) }
            </>)) } 
        </>))}
    </>
}

export default function RulesAll() {

    const location = useLocation()

    useEffect(() => {
        const hash = U.getPageHashFromLocation(location)
        U.scrollToId(hash, 285)
    })

    return (
        <Page>

            <AllRules/>

        </Page>
    )
}