import './TwoColumns.css'
import React from 'react'

export default function TwoColumns({ children, className }) {

    const extraClassNameText = className == null? '' : ` ${className}`  // Note the space before the className
    const divClassName = `column` + extraClassNameText

    return (
        <div className={divClassName}>
            { children }
        </div>
    )
}