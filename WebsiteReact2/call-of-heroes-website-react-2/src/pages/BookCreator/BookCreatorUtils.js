import { getOnlyEntry, getSpellByName, getValueByPath, isObject, isString, printToPDF } from '../../utils'
import PageH3 from "../../components/PageH3/PageH3"
import { QGTitle1 } from "../Tools/TitleGenerator"
import { Children, isValidElement } from 'react'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'
import './BookCreator.css'

import Book from '../../databases/Book/QuestGuard Book.json'
import Icon from '../../components/Icon'
import ListItem from '../../components/ListItem/ListItem'
import PageH2PDF from '../../components/PageH2/PageH2PDF'


// You can have Column directly, or other children. It auto detects if it should be columnized.
export function PDFPage({ children, className, style, id }) {

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


export function P({ children, className, style, id }) {
    return <p className={className} style={style} id={id} dangerouslySetInnerHTML={{ __html: children }}></p>
}
export function BigTitle({ children }) {
    return <div className='pdf-big-title center-content width-100 height-100'>
        { children }
    </div>
}
export function H1({ children }) {
    return <div className='center-content width-100'>
        <QGTitle1 height={45} text={children} style={{marginBottom: 'var(--page-padding)'}}/>
    </div>
}


const H_MAPPINGS = {
    1: H1,
    2: PageH2PDF,
    3: PageH3,
    4: ({children}) => <h4>{children}</h4>
}
export function Header({ path, children }) {
    path = path ?? children
    
    const pathParts = path.split('.')
    const title = pathParts[pathParts.length - 1]

    const HeaderComponent = H_MAPPINGS[pathParts.length]

    return <HeaderComponent>{title}</HeaderComponent>
}
export function LiIcon({}) {
    return <Icon name="BulletPoint3"/>
}
export function Section({ path, title=null, content=null }) {
    const pathParts = path.split('.')
    
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
                return <ListItem><span dangerouslySetInnerHTML={{__html: content}}></span></ListItem>
            }
            if (isObject(content)) {
                const [key, value] = getOnlyEntry(content)
                return <ListItem><b>{key}:</b> <span dangerouslySetInnerHTML={{__html: value}}></span></ListItem>
            }
        }
        return <>
            <Header path={path}>{title}</Header>
            <ul className='flex column gap-half' style={{
                paddingInlineStart: '0pt',
                paddingLeft: `calc(var(--p-size) * 0.5)`
            }}>
                { content.map(item => <Li content={item}/>) }
            </ul>
        </>
    }

    if (isString(content)) {
        console.log(`Rendering P`)
        return <>
            <Header path={path}>{title}</Header>
            <P>{content}</P>
        </>
    }

    if (isObject(content)) {
        const newPaths = Object.keys(content).map(name => path + '.' + name)
        return <>
            <Header path={path}>{title}</Header>
            { newPaths.map(newPath => <Section path={newPath}/>) }
        </>
    }

}