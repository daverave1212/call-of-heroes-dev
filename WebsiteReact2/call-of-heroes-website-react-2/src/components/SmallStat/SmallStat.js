
import './SmallStat.css'
import React from 'react'

export function getRealColor(color) {
    switch (color) {
        case null, undefined: return 'var(--dark-color)';
        case 'blue': return 'var(--dark-blue)';
    }
    return color
}

export const SmallStatTypes = {
    NORMAL_LARGE: 'normal-large',
    LARGE: 'large',
    VERTICAL: 'vertical',
    VERTICAL_LARGE: 'vertical-large'
}

export default function SmallStat({ children, name, color, style, contentStyle, nameStyle, valueStyle, type }) {

    if (style == null) style = {}
    if (nameStyle == null) nameStyle = {}
    if (valueStyle == null) valueStyle = {}

    const realColor = getRealColor(color)

    const smallStatClassesByType =
        type == 'normal-large' || type == 'large' ? 'small-stat--row small-stat--row--large' :
        type == 'vertical'? 'small-stat--column' :
        type == 'vertical-large'? 'small-stat--column small-stat--column--large' :
        'small-stat--row small-stat--row--normal'


    return (
        <div className='small-stat-container' style={style}>
            <div style={{...contentStyle, ...{borderColor: realColor}}} className={`small-stat ${smallStatClassesByType}`}>
                <div style={{...nameStyle, ...{backgroundColor: realColor}}} className={`small-stat__name`}>{ name }</div>
                <div className="small-stat__value" style={valueStyle}>{ children }</div>
            </div>
        </div>
    )
}
