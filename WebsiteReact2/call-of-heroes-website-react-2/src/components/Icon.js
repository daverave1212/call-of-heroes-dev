import React from 'react'

export default function Icon({ name }) {

    const inlineStyleGold = {
        height: 'auto',
        marginTop: '6px',
        marginLeft: '3px'
    }

    const inlineStyle = name == 'Gold'? inlineStyleGold : {}

    return (
        <img style={inlineStyle} className='inline-icon' src={`/Icons/UI/${name}.png`}/>
    )
}