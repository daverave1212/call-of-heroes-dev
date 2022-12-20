
import './PageH3.css'
import React from 'react'

export default function PageH3({ children, hasMarginTop, style }) {
    
    return (
        <div className="page-h3" style={style}>
            <h3>{ children }</h3>
        </div>
    )
}