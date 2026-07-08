import { dom, getOnlyEntry, getSpellByName, getValueByPath, isObject, isString, last, parseTextWithSymbols, printToPDF } from '../../utils'
import PageH3 from "../../components/PageH3/PageH3"
import { QGTitle1 } from "../Tools/TitleGenerator"
import { Children, isValidElement } from 'react'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'
import './BookCreator.css'

import Icon from '../../components/Icon'
import ListItem from '../../components/ListItem/ListItem'
import PageH2PDF from '../../components/PageH2/PageH2PDF'
import PageH3PDF from '../../components/PageH3/PageH3PDF'

import Book from '../../databases/Book/QuestGuard Book.json'

/* Rules for Parsing the PDF */
/*
    H1 always start a new page.
    #Titles start a new page
    >Titles break column


*/
window.Book = Book
const ContentFormats = {
    GRAPHICS: 'GRAPHICS',
    ASIDE: 'ASIDE',
    LIST: 'LIST',
    TEXT: 'TEXT',
    COLUMN_BREAK: 'COLUMN_BREAK'
}
const SectionContent = {
    title: String || null,
    level: Number,
    content: String || Array || null,
    format: ContentFormats
}
class Page {
    constructor(params = {}) {
        this.content = []       /* Array<SectionContent> */
        this.h1 = params.h1            /* Big title above the page */     
    }

    add(sectionContent) {
        this.content.push(sectionContent)
    }
}
export function organizePDFByPages(book=Book) {
    const pages = [new Page()]

    const getCurrentPage = () => last(pages)
    const addNewPage = (params) => pages.push(new Page(params))

    iterateBook(book, (title, level, content) => {
        
        if (level == 1) {
            addNewPage({ h1: title })
            return
        }

        if (title.startsWith('/')) {
            addNewPage()
            title = title.replace('/', '')
        }
        
        const page = getCurrentPage()
        
        if (title.startsWith('.')) {
            page.add({format: ContentFormats.COLUMN_BREAK})
            title = title.replace('.', '')
        }

        if (title == 'Graphics') {
            page.add({
                format: ContentFormats.GRAPHICS,
                content
            })
        } else if (title.startsWith('Text')) {
            page.add({
                format: ContentFormats.TEXT,
                content
            })
        } else if (title.includes('<aside>')) {
            page.add({
                format: ContentFormats.ASIDE,
                title,
                level,
                content
            })
        } else if (Array.isArray(content)) {
            page.add({
                format: ContentFormats.LIST,
                title,
                level,
                content
            })
        } else {
            page.add({
                format: ContentFormats.TEXT,
                title,
                level,
                content
            })
        }
    })

    return pages
}
function iterateBook(book, func) {
    function iterate(title, sectionContent, level=1, func) {
        if (isObject(sectionContent)) {
            func(title, level, null)
            for (const [subtitle, subcontent] of Object.entries(sectionContent)) {
                iterate(subtitle, subcontent, level + 1, func)
            }
        } else {
            func(title, level, sectionContent)
        }
    }

    for (const [h1, chapterContent] of Object.entries(book)) {
        iterate(
            h1,
            chapterContent,
            1,
            func
            // (h, level) => {
            //     const title = dom(`<h${level}>${h}</h${level}>`)
            //     document.body.appendChild(title)
            // },
            // (sectionContent) => {
            //     const contentDiv = dom(`<div>${sectionContent}</div>`)
            //     document.body.appendChild(contentDiv)
            // }
        )
    }

}
window.organizePDFByPages = organizePDFByPages

// You can have Column directly, or other children. It auto detects if it should be columnized.
export function PDFPage({ children, className, style, id, number }) {

    const isColumns = Children.toArray(children).some(child => isValidElement(child) && child.type == Column)
    console.log(`id=""${id} isColumns=${isColumns}`)

    return <div className='pdf-page'>

        <div className="pdf-page-number">
            <img src="/Book/Page Numbers Light.png"/>
            <span>{number}</span>
        </div>

        <div className='pdf-background-image'/>
        <div className='pdf-trim-box flex column'>
            { number > 1 && <div className="pdf-page-border-top"/>}
            { isColumns && (
                <TwoColumns>
                    { children }
                </TwoColumns>
            ) }
            { !isColumns && children }
        </div>
    </div>
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
export function Aside({children, title}) {
    return <div style={{ backgroundColor: 'rgba(255, 200, 100, 0.1)'}}>
        <h4 dangerouslySetInnerHTML={{ __html: title }}></h4>
        <RenderText>{children}</RenderText>
    </div>
}
export function RenderText({ children }) {
    if (children == null) {
        return <></>
    }
    let parsedTextParts = parseTextWithSymbols(children)
    parsedTextParts = parsedTextParts.map(part => isString(part)? <span dangerouslySetInnerHTML={{__html: part}}/>: part)
    return <p>
        {parsedTextParts}
    </p>
}

const H_MAPPINGS = {
    1: H1,
    2: PageH2PDF,
    3: PageH3PDF,
    4: ({children}) => <h4>{children}</h4>
}
export function Header({ children, level }) {
    const HeaderComponent = H_MAPPINGS[level]

    return <HeaderComponent>{children}</HeaderComponent>
}
export function Section({ sectionContent }) {

    const { title, level, content, format } = sectionContent

    function Aside() {
        if (!isString(content)) {
            console.error(`Can not have an <aside> where the content is not a string! At title: "${title}"`)
        }
        return <div style={{ backgroundColor: 'rgba(255, 200, 100, 0.1)'}}>
            { title && <h4 dangerouslySetInnerHTML={{ __html: title }}></h4> }
            <RenderText>{content}</RenderText>
        </div>
    }
    function List() {
        function Li({content}) {
            if (isString(content)) {
                return <ListItem><Icon name="BulletPoint3"/><span dangerouslySetInnerHTML={{__html: content}}></span></ListItem>
            }
            if (isObject(content)) {
                const [key, value] = getOnlyEntry(content)
                return <ListItem><Icon name="BulletPoint3"/><b>{key}:</b> <span dangerouslySetInnerHTML={{__html: value}}></span></ListItem>
            }
        }
        return <>
            { title && <Header level={level}>{title}</Header> }
            <ul className='flex column gap-half' style={{
                paddingInlineStart: '0pt',
                paddingLeft: `calc(var(--p-size) * 0.5)`
            }}>
                { content.map(item => <Li content={item}/>) }
            </ul>
        </>
    }

    if (format == ContentFormats.GRAPHICS) {
        return <></>
    }
    if (format == ContentFormats.TEXT) {
        if (!isString(content)) {
            console.log({content})
            console.green(`Indeed the content text for title "${title}" was not a string!`)
        }
        return <div data-type="TEXT">
            { title != null && <Header level={level}>{title}</Header> }
            { content != null && <RenderText>{content}</RenderText>}
        </div>
    }
    if (format == ContentFormats.ASIDE) {
        return <Aside/>
    }
    if (Array.isArray(content)) {
        return <List/>
    }

    if (isObject(content)) {
        throw `Unknown content for Section ${title}`
    }

}