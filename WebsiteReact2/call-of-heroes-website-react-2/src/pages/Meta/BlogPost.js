import React, { useState } from 'react'
import Page from '../../containers/Page/Page'

import { def, getDaysSince, getOnlyProp, isNumber, isObject, isString, parseTextWithSymbols } from '../../utils'

import './Blog.css'
import { BlogPageHeader } from './Blog'

function RenderPostSection({ title, content }) {

    if (title == null) {
        title = ''
    }

    return <div className='padding-top-1'>
        { (title != 'Intro' || title.startsWith('Text')) && <h3 className='home-font-bold margin-0 padding-0'>{title}</h3> }
        { isString(content)?
            <p className='source-sans padding-top-half'>{ parseTextWithSymbols(content) }</p>
          :Array.isArray(content)?
            <div className=' padding-top-half'>
                <ul>
                    { content.map(li => (
                        <li className='source-sans'>{ parseTextWithSymbols(li) }</li>
                    )) }
                </ul>
            </div>
          :
            <p>ERROR: Did not know how to render this!</p>
        }
    </div>
}

export function BlogPagePost() {
    return <div>Deprecated. You shouldn't be here.</div>
}

const NO_RENDER_SECTIONS = [
    'Date', 'Type'
]

export default function BlogPost({ title, blog }) {

    const { Date, Type } = blog

    return (
        <div>
            <BlogPageHeader title={title} subtitle={<div className='gray gray-text source-sans'><img src="/Icons/UI/Calendar.png" className='inline-icon'/>&nbsp;{`${Date} | ${Type}`}</div>}/>
            <Page style={{marginTop: '0px', paddingTop: '4rem'}}>
                { Object.entries(blog).map(([title, content]) => (
                    NO_RENDER_SECTIONS.includes(title)? null: <RenderPostSection title={title} content={content}/>
                )) }
            </Page>
        </div>
    )

}
