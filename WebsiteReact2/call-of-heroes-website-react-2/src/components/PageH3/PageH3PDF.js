
import { titleToId } from '../../utils'
import './PageH3.css'
import './PageH3PDF.css'
import React from 'react'

export default function PageH3PDF({ children, title, id, style, className }) {

    return (
        <div className={`page-h3-pdf relative ${className}`} id={id} style={style}>
            {/* <img className='page-h2-graphic' src="/H2.png"/> */}
            <h3>{ children }</h3>
            {/* <div className="page-h2--underline"></div> */}
        </div>
    )
}