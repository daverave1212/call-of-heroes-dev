
import { QGTitle1 } from '../../pages/Tools/TitleGenerator'
import { capitalizeFirstLetter, isString, titleToId } from '../../utils'
import './PageH3.css'
import './PageH3PDF.css'
import React from 'react'

export default function PageH3PDF({ children, title, id, style, className }) {

    // return <QGTitle1 height={18}>{children}</QGTitle1>

    if (isString(children)) {
        children = capitalizeFirstLetter(children.toLowerCase())
    }

    return (
        <div className={`page-h3-pdf relative ${className}`} id={id} style={style}>
            {/* <img className='page-h2-graphic' src="/H2.png"/> */}
            <h3 className='title-font'>{ children }</h3>
            {/* <div className="page-h2--underline"></div> */}
        </div>
    )
}