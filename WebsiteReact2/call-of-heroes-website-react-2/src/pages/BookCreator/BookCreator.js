import Spell from '../../components/Spell/Spell'
import Column from '../../components/TwoColumns/Column'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import { testPDF } from '../../services/pdf-tools/pdf-tool'
import { getOnlyEntry, getSpellByName, getValueByPath, isObject, isString, printToPDF } from '../../utils'
import './PDFUnitsOverriding.css'
import './BookCreator.css'

import Book from '../../databases/Book/QuestGuard Book.json'
import PageH2 from '../../components/PageH2/PageH2'
import { Children, isValidElement } from 'react'
import { QGTitle1 } from '../Tools/TitleGenerator'
import PageH3 from '../../components/PageH3/PageH3'


const { Introduction, Preface } = Book


export default function() {

    function generate() {
        // testPDF(document.querySelector('iframe'))
        printToPDF()
    }

    // return <div className='center-content' style={{width: '100%', minHeight: '100vh', backgroundColor: 'gray'}}>
    return <div>

        {/* <button className='btn' onClick={generate}>Go</button> */}

        {/* <iframe style={{width: '100%', height: '80vh'}}></iframe> */}

        {/* <div id="PDF" className='flex column gap-1 padding-top-4'> */}
        <div id="PDF">

            <PDFPage>
                <BigTitle>
                    <img style={{width: '115%', maxWidth: '115%'}} src="/Book/QuestGuardFancy.png"/>
                </BigTitle>
            </PDFPage>

            <PDFPage>
                <Column>
                    <Section path="Preface.Made By"/>
                </Column>
                <Column></Column>
            </PDFPage>


            <PDFPage>
                <Column>
                    <Section path="Introduction.What We Want"/>
                    <Header path="Introduction.Welcome To QuestGuard"/>
                    <Section path="Introduction.Welcome To QuestGuard.Text"/>
                </Column>
                <Column>
                    <Section path="Introduction.Welcome To QuestGuard.Quest Master"/>
                    <Section path="Introduction.Welcome To QuestGuard.Trying Things"/>
                </Column>
            </PDFPage>


            <PDFPage>
                <Column>
                
                </Column>
                <Column>
                    <Section path="Introduction.What You Need"/>
                </Column>
            </PDFPage>
            
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    <TwoColumns>
                        <Column>
                            <PageH2>What We Want</PageH2>
                            
                        </Column>
                        <Column></Column>
                    </TwoColumns>
                </div>
            </div>
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    hello world
                </div>
            </div>
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    hello world
                </div>
            </div>
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    hello world
                </div>
            </div>

        </div>
    </div>

}


function P({ children, className, style, id }) {
    return <p className={className} style={style} id={id} dangerouslySetInnerHTML={{ __html: children }}></p>
}
function BigTitle({ children }) {
    return <div className='pdf-big-title center-content width-100 height-100'>
        { children }
    </div>
}

function H1({ children }) {
    return <div className='center-content width-100'>
        <QGTitle1 height={45} text={children} style={{marginBottom: 'var(--page-padding)'}}/>
    </div>
}

const H_MAPPINGS = {
    1: H1,
    2: PageH2,
    3: PageH3,
    4: ({children}) => <h4>{children}</h4>
}
function Header({ path, children }) {
    path = path ?? children
    
    const pathParts = path.split('.')
    const title = pathParts[pathParts.length - 1]

    const HeaderComponent = H_MAPPINGS[pathParts.length]

    return <HeaderComponent>{title}</HeaderComponent>
}

function Section({ path, title=null, content=null }) {
    const pathParts = path.split('.')
    const Header = H_MAPPINGS[pathParts.length]
    
    title = title ?? pathParts[pathParts.length - 1]
    content = content ?? getValueByPath(Book, path)

    console.log({path, content, Book})

    if (title == 'Text') {
        if (!isString(content)) {
            console.log({object, title})
            console.error(`Can not have Text where the content is not a string! At title: "${title}". Object printed above.`)
        }
        return <P>{content}</P>
    }

    if (title.includes('<aside>')) {
        if (!isString(content)) {
            console.error(`Can not have an <aside> where the content is not a string! At title: "${title}"`)
        }
        return <div style={{ backgroundColor: 'rgba(255, 200, 100, 0.1)'}}>
            <h4 dangerouslySetInnerHTML={{ __html: title }}></h4>
            <P>{content}</P>
        </div>
    }

    if (Array.isArray(content)) {
        function Li({content}) {
            if (isString(content)) {
                return <li dangerouslySetInnerHTML={{__html: content}}></li>
            }
            if (isObject(content)) {
                const [key, value] = getOnlyEntry(content)
                return <li><bold>{key}:</bold> <span dangerouslySetInnerHTML={{__html: value}}></span></li>
            }
        }
        return <>
            <Header>{title}</Header>
            <ul>
                { content.map(item => <Li content={item}/>) }
            </ul>
        </>
    }

    if (isString(content)) {
        console.log(`Rendering P`)
        return <>
            <Header>{title}</Header>
            <P>{content}</P>
        </>
    }

    if (isObject(content)) {
        const newPaths = Object.keys(content).map(name => path + '.' + name)
        return <>
            <Header>{title}</Header>
            { newPaths.map(newPath => <Section path={newPath}/>) }
        </>
    }

}


// You can have Column directly, or other children. It auto detects if it should be columnized.
function PDFPage({ children, className, style, id }) {

    const isColumns = Children.toArray(children).some(child => isValidElement(child) && child.type == Column)

    return <div className='pdf-page'>
        <div className='pdf-trim-box'>
            { isColumns && (
                <TwoColumns>
                    { children }
                </TwoColumns>
            ) }
            { !isColumns && children }
        </div>
    </div>
}