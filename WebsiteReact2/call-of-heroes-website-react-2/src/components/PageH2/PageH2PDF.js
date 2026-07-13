
import { QGTitle1 } from '../../pages/Tools/TitleGenerator'
import { isString, titleToId } from '../../utils'
import './PageH2.css'
import './PageH2PDF.css'
import React from 'react'

export default function PageH2PDF({ children, title, id, style, className }) {

    // return <QGTitle1 height={21}>{children}</QGTitle1>

    if (isString(children)) {
        children = children.toUpperCase()
    }

    return (
        <div className={`page-h2-pdf relative ${className}`} id={id} style={style}>
            <img className='page-h2-graphic' src="/H2.png"/>
            <h2 className='title-font'>{ children }</h2>
            {/* <div className="page-h2--underline"></div> */}
        </div>
    )
}