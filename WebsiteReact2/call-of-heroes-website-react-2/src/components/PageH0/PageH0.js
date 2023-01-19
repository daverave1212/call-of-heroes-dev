
import './PageH0.css'
import React from 'react'
import { insertBetweenAll } from '../../utils'


export default function PageH0({ children, onClick, id }) {

    const styleMaybeClickable = onClick != null? { cursor: 'pointer' } : {}

    const titleWords = children.split(' ')
    let titleTextSegments = []                  // Always 1 or 2 children
    if (titleWords.length <= 2) {
        titleTextSegments = titleWords
    } else if (titleWords.length >= 3) {
        titleTextSegments = [
            titleWords.slice(0, titleWords.length / 2 + 1).join(' '),
            titleWords.slice(titleWords.length / 2 + 1).join(' ')
        ]
    }

    const titleWordsToSpans = titleTextSegments.map(word => (<span key={word} style={{whiteSpace: 'nowrap'}}>{ word }</span>))
    const textSpansSeparatedByNewLines = insertBetweenAll(titleWordsToSpans, (<br/>))

    const extraMultiLineClass = titleWordsToSpans.length == 1? '' : 'page-h0__img--2-lines'

    return (
        <div className="page-h0" onClick={onClick} style={styleMaybeClickable}>
            {/* <div className='page-h0__img-container'>
            </div> */}
            <div className="title-text-wrapper" id={id}>
                <div style={{position: 'relative'}}>
                    <img className={`page-h0-img-left ${extraMultiLineClass}`} src="/title-separator-left.png"/>
                    <img className={`page-h0-img-right ${extraMultiLineClass}`} src="/title-separator-right.png"/>
                    { textSpansSeparatedByNewLines }
                </div>
            </div>
            {/* <div className='page-h0__img-container'>
            </div> */}
        </div>
    )
}