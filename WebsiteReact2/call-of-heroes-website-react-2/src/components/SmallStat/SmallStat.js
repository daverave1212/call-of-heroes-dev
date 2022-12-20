
import './SmallStat.css'
import React from 'react'

export default function SmallStat({ children, name, color, topDown, style, contentStyle, nameStyle, valueStyle }) {

    if (style == null) style = {}

    const smallStatColorClass = color == 'blue'?
        'small-stat--blue':
        'small-stat--normal'
    const smallStatNameColorClass = color == 'blue'?
        'small-stat__name--blue':
        'small-stat__name--normal'
    const smallStatFlexDirectionClass = topDown == true || topDown == 'true'?
        'small-stat--column':
        'small-stat--row'

    color =
        color == null?      'var(--dark-color)' :
        color == 'blue'?    'var(--dark-blue)':
        color
    if (nameStyle == null) nameStyle = {}
    if (valueStyle == null) valueStyle = {}

    return (
        <div className='small-stat-container' style={style}>
            <div style={{...contentStyle, ...{border: `solid ${color} 2px`}}} className={`small-stat ${smallStatColorClass} ${smallStatFlexDirectionClass}`}>
                <div style={{...nameStyle, ...{backgroundColor: color}}} className={`small-stat__name ${smallStatNameColorClass}`}>{ name }</div>
                <div className="small-stat__value" style={valueStyle}>{ children }</div>
            </div>
            <br/>
        </div>
    )
}