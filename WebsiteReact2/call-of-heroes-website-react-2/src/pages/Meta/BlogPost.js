import React, { useState } from 'react'
import Page from '../../containers/Page/Page'

import { def, getDaysSince, getOnlyProp, isNumber, isObject, isString, parseTextWithSymbols, splitAtSymbols } from '../../utils'

import './Blog.css'
import { BlogPageHeader } from './Blog'
import { organizePDFByPages } from '../BookCreator/BookCreatorUtils'
import Spell from '../../components/Spell/Spell'
import ManySpells from '../../components/Spell/ManySpells'

function RenderPostSection({ title, content, level=1 }) {

    if (title == null || title?.startsWith('Text')) {
        title = ''
    }

    if (title.startsWith('/') || title.startsWith('.')) {
        title = title.substring(1)
    }

    function renderString(content) {
        const textParts = parseTextWithSymbols(content).map((child, i) => {
            if (React.isValidElement(child)) {
                if (child.type == Spell) {
                    return <div className='center-content padding-top-2 padding-bottom-1'>
                        <div style={{maxWidth: '450px'}}>
                            {child}
                        </div>
                    </div>
                }
                if (child.type == ManySpells) {
                    return <div className='padding-top-2 padding-bottom-1'>
                        {child}
                    </div>
                }
                
            }
            return child
        })
        window.isValidElement = React.isValidElement
        window.Spell = Spell
        return textParts
    }

    return <div className='padding-top-2'>
        { (title != 'Intro' || title.startsWith('Text')) && (
            level == 1?
                <h2 className='home-font-bold margin-0 padding-0'>{title}</h2>
            :level == 2?
                <h3 className='home-font-bold margin-0 padding-0'>{title}</h3>
            :<h4 className='home-font-bold margin-0 padding-0'>{title}</h4>
        ) }
        { isString(content)?
            <div className='source-sans padding-top-half'>
                {renderString(content)}
            </div>
            // <p className='source-sans padding-top-half'>{ parseTextWithSymbols(content) }</p>
          :Array.isArray(content)?
            <div className=' padding-top-half'>
                <ul>
                    { content.map(li => (
                        <li className='source-sans'>{ parseTextWithSymbols(li) }</li>
                    )) }
                </ul>
            </div>
          :isObject(content)?
            (Object.entries(content).map(([title, content]) => (
                NO_RENDER_SECTIONS.includes(title)? null: <RenderPostSection title={title} content={content} level={level+1}/>
            )))
          :
            <p>ERROR: Did not know how to render this!</p>
        }
    </div>
}

export function BlogPagePost() {
    return <div>Deprecated. You shouldn't be here.</div>
}

const NO_RENDER_SECTIONS = [
    'Date', 'Type', 'IsPinned', 'Graphics'
]

export default function BlogPost({ title, blog }) {

    const { Date, Type } = blog

    const organizedBlog = organizePDFByPages(blog)
    console.log({organizedBlog})

    return (
        <div>
            <BlogPageHeader title={title} subtitle={<div className='gray gray-text source-sans'><img src="/Icons/UI/Calendar.png" className='inline-icon'/>&nbsp;{`${Date} | ${Type}`}</div>}/>
            <Page style={{marginTop: '0px', paddingTop: '4rem'}}>
                <RenderPostSection title={title} content={blog}/>
                {/* { Object.entries(blog).map(([title, content]) => (
                    NO_RENDER_SECTIONS.includes(title)? null: <RenderPostSection title={title} content={content}/>
                )) } */}
            </Page>
        </div>
    )

}
