
import './SmallStat.css'
import React from 'react'

export function getRealColor(color) {
    switch (color) {
        case null, undefined: return 'var(--theme-color-darker)';
        case 'blue': return 'var(--dark-blue)';
    }
    return color
}

export default function SmallStat({
    children,
    name, color, type,
    style, contentStyle, nameStyle, valueStyle,
    className, contentClassName,
    onClick
}) {

    if (style == null) style = {}
    if (nameStyle == null) nameStyle = {}
    if (valueStyle == null) valueStyle = {}

    const realColor = getRealColor(color)

    const smallStatClassesByType =
        type == 'normal-large' || type == 'large' ?
            'row large'
        :type == 'vertical'?
            'column'
        :type == 'vertical-large'?
            'column large center-text'
        :
            'inline-flex row'

    return (
        <div className={`small-stat flex ${smallStatClassesByType} ${className}`} style={{...contentStyle, ...{borderColor: realColor}}}>
            <div style={{...nameStyle, ...{backgroundColor: realColor}}} className={`small-stat__name`}>{ name }</div>
            <div className="small-stat__value" style={valueStyle}>{ children }</div>
        </div>
    )
    
}
