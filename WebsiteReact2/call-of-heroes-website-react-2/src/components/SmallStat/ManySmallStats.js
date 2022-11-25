
import './SmallStat.css'
import React from 'react'

export default function ManySmallStats({ name, texts, color, topDown, style }) {

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

    return (
        <div className='small-stat-container many-small-stats' style={style}>
            <div style={{border: `solid ${color} 2px`}} className={`small-stat ${smallStatColorClass} ${smallStatFlexDirectionClass}`}>
                <div style={{backgroundColor: color}} className={`small-stat__name ${smallStatNameColorClass}`}>{ name }</div>
                {
                    texts.map(text => (
                        <div key={text} className="small-stat__value">{ text }</div>
                    ))
                }
            </div>
            <br/>
        </div>
    )
}