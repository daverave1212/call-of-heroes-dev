
import { titleToId } from '../../utils'
import './PageH2.css'
import React from 'react'

export default function PageH2({ children, title, hasAutoId }) {
    let id = null
    if (hasAutoId == true) {
        id = titleToId(children)
    }
    return (
        <div className="page-h2" id={id}>
            {/* <img src="/h2-background-3.png"/> */}
            <h2>{ children }</h2>
            <div className="page-h2--underline"></div>
        </div>
    )
}