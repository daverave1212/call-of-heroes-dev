import React from 'react'

export default function Icon({ name, type }) {

    const inlineStyleGold = {
        height: 'auto',
        marginTop: '6px',
        marginLeft: '3px'
    }

    const inlineStyle = name == 'Gold'? inlineStyleGold : {}

    const className = 
        type == 'spell' ? 'inline-icon--spell' :
        type == 'small-stat' ? 'inline-icon--small-stat' :
        'inline-icon'

    return (
        <img style={inlineStyle} className={className} src={`/Icons/UI/${name}.png`}/>
    )
}