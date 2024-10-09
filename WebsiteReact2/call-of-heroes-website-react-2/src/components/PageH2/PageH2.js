
import { titleToId } from '../../utils'
import './PageH2.css'
import React from 'react'

export default function PageH2({ children, title, id, style }) {
    return (
        <div className="page-h2" id={id} style={style}>
            {/* <img src="/h2-background-3.png"/> */}
            <h2>{ children }</h2>
            <div className="page-h2--underline"></div>
        </div>
    )
}