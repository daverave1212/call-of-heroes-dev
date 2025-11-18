import React from 'react'

export default function Icon({ name, src, type, style, extension='png' }) {


    const className = 
        type == 'spell' ? 'inline-icon--spell' :
        type == 'small-stat' ? 'inline-icon--small-stat' :
        'inline-icon'

    if (name != null && name.includes('.') == false) {
        const completeExtension = extension.startsWith('.') ? completeExtension : ('.' + extension)
        name += completeExtension
    }

    const usedSrc = src ?? `/Icons/UI/${name}`

    return (
        <img className={className} src={usedSrc} style={style}/>
    )
}