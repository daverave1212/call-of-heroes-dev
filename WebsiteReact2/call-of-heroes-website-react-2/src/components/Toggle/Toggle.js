import { useState } from "react"

import './Toggle.css'

export default function({id, onChange, value}) {

    value = value == 'on' || value == true? true: false

    return <label className="toggle">
        <input type="checkbox" id={id} name={id} onChange={onChange} checked={value}/>
        <span className="slider"></span>
    </label>
}