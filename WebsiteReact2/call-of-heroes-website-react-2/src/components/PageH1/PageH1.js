
import './PageH1.css'
import React from 'react'

export default function PageH1({ children, title }) {
    return (
        <div className="page-h1">
            <img src="/h1-background.png"/>
            <h1>{ children }</h1>
        </div>
    )
}