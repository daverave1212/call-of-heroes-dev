
import './TwoColumns.css'
import React from 'react'

// A more responsive version of two-columns
// Descriptive, as in not used for actual page content, but for things like text on the left, image on the right
// For example, all Races and Classes start with this type of two columns
// The advantage is it can be more responsive
export default function TwoColumnsDescriptive({ children, type, style, className }) {

    const extraClasses = className != null? className : ''

    return (
        <div className={`two-columns-descriptive ${extraClasses}`} style={style}>
            { children }
        </div>
    )
}