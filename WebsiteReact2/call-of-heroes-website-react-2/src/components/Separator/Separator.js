import React from 'react'
import './Separator.css'

export default function Separator({ children, title, hasNoMarginTop }) {
    const style = hasNoMarginTop == true? { marginTop: "-8px" } : {}
    return (
        <img style={style} className="separator" src="/separator.png"/>
    )
}