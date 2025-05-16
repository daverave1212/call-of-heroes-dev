

import markdownit from 'markdown-it'
import { parseCustomMarkdownStringToString, useLocalStorageState, htmlToJson, customMarkdownToJSON, isString } from '../../utils'
import TextArea from '../../components/TextArea/TextArea'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'
import React, { useState } from 'react'
import { QGTitle1 } from '../Tools/TitleGenerator'
import './HomebrewBookCreator.css'

const markdown = markdownit()

window.markdown = markdown

export default function HomebrewBookCreator() {

    const [markdownText, setMarkdownText] = useLocalStorageState('HomebrewBookCreator.markdownText', '')
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