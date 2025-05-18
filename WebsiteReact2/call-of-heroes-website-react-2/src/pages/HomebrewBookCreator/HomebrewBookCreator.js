

import markdownit from 'markdown-it'
import { parseCustomMarkdownStringToString, useLocalStorageState, htmlToJson, customMarkdownToJSON, isString } from '../../utils'
import TextArea from '../../components/TextArea/TextArea'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'
import React, { useState } from 'react'
import { QGTitle1 } from '../Tools/TitleGenerator'
import './HomebrewBookCreator.css'
import { getUserState, useAuth } from '../../Auth'

const markdown = markdownit()

window.markdown = markdown

export default function HomebrewBookCreator() {

    const [markdownText, setMarkdownText] = useLocalStorageState('HomebrewBookCreator.markdownText', DEFAULT_MARKDOWN_TEXT)
    const [renderedNodes, setRenderedNodes] = useState([])

    function onRenderClick() {
        const htmlNodes = customMarkdownToJSON(markdownText)
        setRenderedNodes(htmlNodes)
    }

    function RenderedHTMLNode({node}) {
        const elem = React.createElement(node.tagName.toLowerCase(), {
            dangerouslySetInnerHTML: { __html: node.outerHtml }
        })
        return elem
    }
    function getRenderedNodeComponent(node) {
        const tagName = node.tagName?.toLowerCase() ?? node.nodeName
        if (tagName == 'p' || tagName == '#text') {
            const textContent = node.innerHTML ?? node.wholeContent ?? node.textContent
            if (textContent.trim().length == 0) {
                return null
            }
        }
        const renderedNodeFunc = {
            'h1': () => <div className='center-content'>
                <QGTitle1 text={node.innerText} height={60}/>
            </div>,
            'h2': () => <div style={{position: 'relative'}}>
                <h2>{node.innerText}</h2>
                <img className='hbc-h2-underscore' src="/Homebrew/H2Underscore.png"/>
            </div>,
            'h3': () => <h3>{node.innerText}</h3>,
            'hr': () => <hr/>,
            'br': () => <br/>,
            '#text': () => <p>{node.wholeContent ?? node.textContent}</p>,
            'p': () => <p dangerouslySetInnerHTML={{ __html: node.outerHTML }}/>,
            'div': () => <div dangerouslySetInnerHTML={{ __html: node.outerHTML }}/>,
            'img': () => <img dangerouslySetInnerHTML={{ __html: node.outerHTML }}/>,
            'ul': () => <div dangerouslySetInnerHTML={{ __html: node.outerHTML }}/>,
        }
        if (isString(node)) {
            return <p>{node}</p>
        }
        if (renderedNodeFunc[tagName] == null) {
            return <RenderedHTMLNode node={node}/>
        }
        
        const getRenderedComponent = renderedNodeFunc[tagName]
        return getRenderedComponent()
        // return <div dangerouslySetInnerHTML={{ __html: '<p>Some <b>text</b> here</p>' }}/>
    }

    console.log(`Rendering all these nodes`)
    console.log(renderedNodes)
    
    return <div className='hbc'>
        <div className='center-content'>
            <TextArea initialValue={markdownText} onChange={val => setMarkdownText(val)} reactsToInitialValue={true}/>
            <button onClick={onRenderClick}>Render</button><br/>
        </div>

        <div className='center-content'>
            <div className='hbc-page'>
                { renderedNodes
                    .filter(node => node != null)
                    .map(node => { return getRenderedNodeComponent(node) }) }
            </div>
        </div>
    </div>
}


export function useMyHomebrewsDB(locationInCode) {
    const initialUser = getUserState()
    let { user } = useAuth(locationInCode)
    let [myHomebrews, innerSetMyHomebrews] = useLocalStorageState('myHomebrews', [])

    // Sync localstorage Homebrews with DB characters
    if (initialUser != null) {
        Database.getMyHomebrews().then(myHomebrewsFromDB => {
            // Prevent infinite rerendering of this
            if (! areArraysEqual(myHomebrews, myHomebrewsFromDB, (a, b) => a?.id == b?.id)) {
                innerSetMyHomebrews(myHomebrewsFromDB)
            }
        })
    }
    useEffect(() => {
        if (user != null) {
            Database.getMyHomebrews().then(myHomebrewsFromDB => {
                innerSetMyHomebrews(myHomebrewsFromDB)
            })
        }
    }, [user?.id])

    async function saveMyHomebrewsToDB(array) /* : bool */ {
        if (Array.isArray(array) == false) {
            showError(`ERROR: myHomebrews given is not an array`)
            return false
        }

        try {
            const result = await Database.setMyHomebrews(array)            
            innerSetMyHomebrews(array)
        } catch (e) {
            showError(`ERROR: An error has occured saving your character: ${e}`)
            return false
        }
        return true
    }
    return [myHomebrews, saveMyHomebrewsToDB]
}



const DEFAULT_MARKDOWN_TEXT = `

# Homebrew

Welcome to the **QuestGuard Homebrew Creator!**
Here you can create _homebrew_ material content in the form of books.


## How It Works
This homebrew creator uses \`Markdown\` to generate pages of content.
Simply follow the pattern you see here to make more content.

## What It Can Do

Let's jump into what the Homebrew Creator can do!


\\columns\\left
### Blocks
You can delimit a "block" of something by using \`\\\` followed by the block \`type\`.
For example, this _**Aside**_ block delimited with \\code(text=\\aside)\\code:

\\aside
You can use this as a read-aloud section or for NPC dialogue lines:

You reach a point in your journey where you come across a strange, long paragraph, delimited by something called an aside block! Behold, players!

**Your NPC:**
"A giant **paragraph?** I have never seen it! _this is a lie_"
"I can help you **defeat the monster** for 100 gold."
\\aside
\\left
\\right
### Columns
See this exact example for the exact way you can create 2 columns using the \`columns\`, \`left\` and \`right\` blocks.

### Images
Sample image by URL.
\\img(https://questguardrpg.com/Icons/Spells/Learn_Scrolls.png)(right=12px)(top=-8px)(width=15%)
\\right
\\columns


\\if
### Delimited Content
Use the \`if\` block to create a delimiter.
Check it out!
\\if
`