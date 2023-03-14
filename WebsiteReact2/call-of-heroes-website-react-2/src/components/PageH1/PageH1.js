
import './PageH1.css'
import React from 'react'

export default function PageH1({ children, onClick, id, style }) {

    const styleMaybeClickable = onClick != null? { cursor: 'pointer' } : {}

    return (
        <div className="page-h1" id={id} style={style}>
            <h1 onClick={onClick} style={styleMaybeClickable}>{ children }</h1>
        </div>
    )
}