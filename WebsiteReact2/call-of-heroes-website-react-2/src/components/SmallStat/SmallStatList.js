
import './SmallStat.css'
import React from 'react'

export default function SmallStatList({ children, style, contentStyle, name, color }) {

    const smallStatColorClass = color == 'blue'?
        'small-stat--blue':
        'small-stat--normal'
    const smallStatNameColorClass = color == 'blue'?
        'small-stat__name--blue':
        'small-stat__name--normal'
    const smallStatListItemsColorClass = color == 'blue'?
        'small-stat__value--list--blue':
        'small-stat__value--list--normal'

    const extraContentStyle = contentStyle != null? contentStyle : {}

    return (
        <div className='small-stat-container' style={style}>
            <div className={`small-stat small-stat--column ${smallStatColorClass}`} style={extraContentStyle}>
                <div className={`small-stat__name ${smallStatNameColorClass}`}>{ name }</div>
                <div className={`small-stat__value small-stat__value--list ${smallStatListItemsColorClass}`}>{ children }</div>
            </div>
            <br/>
        </div>
    )
}