
import './SmallStat.css'
import React from 'react'

export default function SmallStat({ children, name, color, topDown }) {

    console.log({color});

    const smallStatColorClass = color == 'blue'?
        'small-stat--blue':
        'small-stat--normal'
    const smallStatNameColorClass = color == 'blue'?
        'small-stat__name--blue':
        'small-stat__name--normal'
    const smallStatFlexDirectionClass = topDown == true || topDown == 'true'?
        'small-stat--column':
        'small-stat--row'

    return (
        <div className='small-stat-container'>
            <div className={`small-stat ${smallStatColorClass} ${smallStatFlexDirectionClass}`}>
                <div className={`small-stat__name ${smallStatNameColorClass}`}>{ name }</div>
                <div className="small-stat__value">{ children }</div>
            </div>
            <br/>
        </div>
    )
}