import React from 'react'
import './Separator.css'

export default function Separator({ children, title, hasNoMarginTop, style }) {
    const extraStyle = hasNoMarginTop == true? { marginTop: "-8px" } : {}
    if (style == null) style = {}
    style = {...style, ...extraStyle}
    return (
        <img style={style} className="separator" src="/separator.png"/>
    )
}