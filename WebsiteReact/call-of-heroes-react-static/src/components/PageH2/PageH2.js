
import './PageH2.css'
import React from 'react'

export default function PageH2({ children, title }) {
    return (
        <div className="page-h2">
            <img src="/h2-background.png"/>
            <h2>{ children }</h2>
        </div>
    )
}