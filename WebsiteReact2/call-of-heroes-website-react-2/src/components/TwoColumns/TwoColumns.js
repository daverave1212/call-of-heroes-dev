
import './TwoColumns.css'
import React from 'react'

export default function TwoColumns({ children, type, style, className }) {

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