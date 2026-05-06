
import { titleToId } from '../../utils'
import './PageH2.css'
import './PageH2PDF.css'
import React from 'react'

export default function PageH2PDF({ children, title, id, style, className }) {

    return (
        <div className={`page-h2-pdf relative ${className}`} id={id} style={style}>
            <img className='page-h2-graphic' src="/H2.png"/>
            <h2>{ children }</h2>
            {/* <div className="page-h2--underline"></div> */}
        </div>
    )
}