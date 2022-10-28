
import './PageH3.css'
import React from 'react'

export default function PageH3({ children, title }) {
    return (
        <div className="page-h3">
            <h3>{ children }</h3>
        </div>
    )
}