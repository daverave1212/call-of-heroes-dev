import React from 'react'

export default function Icon({ name, type }) {

    const className = 
        type == 'spell' ? 'inline-icon--spell' :
        type == 'small-stat' ? 'inline-icon--small-stat' :
        'inline-icon'

    return (
        <img className={className} src={`/Icons/UI/${name}.png`}/>
    )
}