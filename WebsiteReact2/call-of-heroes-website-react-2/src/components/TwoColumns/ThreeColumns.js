import './TwoColumns.css'
import React from 'react'

export default function ThreeColumns({ children, style, className }) {
    const extraClasses = className != null? className : ''
    return (
        <div className={'three-columns' + extraClasses} style={style}>
            { children }
        </div>
    )
}