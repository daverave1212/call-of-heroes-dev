
import './TwoColumns.css'
import React from 'react'

export default function TwoColumns({ children, type }) {

    const typeClass = type == 'lefty'?
        'two-columns--lefty':
        'two-columns--normal'

    return (
        <div className={`two-columns ${typeClass}`}>
            { children }
        </div>
    )
}