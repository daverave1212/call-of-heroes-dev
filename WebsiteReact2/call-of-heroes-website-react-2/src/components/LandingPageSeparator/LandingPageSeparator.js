import React from 'react'
import './LandingPageSeparator.css'

export default function LandingPageSeparator({ children, title, style, type, shadowType }) {
    type = type == null? '4': type
    const shadowClass = shadowType == null? 'landing-page-separator--shadowed' : shadowClass
    return (
        <img className={`landing-page-separator ${shadowClass}`} src={`/landing-page-separator${type}.png`} style={style}/>
    )
}