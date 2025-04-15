
import './TwoColumns.css'
import React from 'react'

export default function TwoColumns(props) {

    const { children, type, style, className } = props

    const typeClass = type == 'lefty'?
        'two-columns--lefty':
        'two-columns--normal'

    const extraClasses = className != null? className : ''

    return (
        <div className={`two-columns ${typeClass} ${extraClasses}`} style={style}>
            { children }
        </div>
    )
}