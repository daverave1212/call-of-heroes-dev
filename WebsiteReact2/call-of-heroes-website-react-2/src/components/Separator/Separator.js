import React from 'react'
import './Separator.css'

export default function Separator({ hasNoMarginTop, style }) {
    const extraStyle = hasNoMarginTop == true? { marginTop: "var(--separator-offset-top)" } : {}
    if (style == null) style = {}
    style = {...style, ...extraStyle}
    return (
        <img style={style} className="separator" src="/separator.png"/>
    )
}

export function SeparatorLarge({ hasNoMarginTop, style }) {
    const extraStyle = hasNoMarginTop == true? { marginTop: "var(--separator-offset-top)" } : {}
    if (style == null) style = {}
    style = {...style, ...extraStyle}
    return (
        <img style={style} className="separator" src="/separator-large.png"/>
    )
}