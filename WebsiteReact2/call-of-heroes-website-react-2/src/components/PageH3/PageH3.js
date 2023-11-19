
import './PageH3.css'
import React from 'react'

export default function PageH3({ children, id, style }) {
    
    return (
        <div className="page-h3" style={style} id={id}>
            <h3>{ children }</h3>
        </div>
    )
}