import React from 'react'

export default function Icon({ name, type, style, extension='png' }) {

    const className = 
        type == 'spell' ? 'inline-icon--spell' :
        type == 'small-stat' ? 'inline-icon--small-stat' :
        'inline-icon'

    const completeExtension = extension.startsWith('.') ? completeExtension : ('.' + extension)

    if (name.includes('.') == false) {
        name += completeExtension
    }

    return (
        <img className={className} src={`/Icons/UI/${name}`} style={style}/>
    )
}