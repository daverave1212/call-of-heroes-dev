
import './TwoColumns.css'
import React from 'react'

export default function TwoColumns(props) {

    const { children, type, style, className, id } = props

    const typeClass =
        type == 'lefty'?
            'two-columns--lefty':
        type == 'leftier'?
            'two-columns--leftier':
        'two-columns--normal'

    const extraClasses = className != null? className : ''

    return (
        <div id={id} className={`two-columns ${typeClass} ${extraClasses}`} style={style}>
            { children }
        </div>
    )
}