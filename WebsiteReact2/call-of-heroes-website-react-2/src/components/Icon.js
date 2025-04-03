import React from 'react'

export default function Icon({ name, type, style }) {

    const className = 
        type == 'spell' ? 'inline-icon--spell' :
        type == 'small-stat' ? 'inline-icon--small-stat' :
        'inline-icon'

    if (name.includes('.') == false) {
        name == '.png'
    }

    return (
        <img className={className} src={`/Icons/UI/${name}`} style={style}/>
    )
}