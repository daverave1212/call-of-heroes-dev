import React from 'react'

export default function Icon({ name }) {
    return (
        <img className='inline-icon' src={`/Icons/UI/${name}.png`}/>
    )
}