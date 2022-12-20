import './TwoColumns.css'
import React from 'react'

export default function Column({ children, className, style }) {

    console.log({style})

    const extraClassNameText = className == null? '' : ` ${className}`  // Note the space before the className
    const divClassName = `column` + extraClassNameText

    return (
        <div className={divClassName} style={style}>
            { children }
        </div>
    )
}