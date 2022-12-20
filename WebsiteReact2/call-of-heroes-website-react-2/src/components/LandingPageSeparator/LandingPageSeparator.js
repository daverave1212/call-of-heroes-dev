import React from 'react'
import './LandingPageSeparator.css'

export default function LandingPageSeparator({ children, title, style }) {
    return (
        <img className="landing-page-separator" src="/landing-page-separator4.png" style={style}/>
    )
}