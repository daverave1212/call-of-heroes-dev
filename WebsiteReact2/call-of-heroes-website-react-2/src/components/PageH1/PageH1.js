
import './PageH1.css'
import React from 'react'

import classNames from 'classnames'

export default function PageH1({ children, onClick, id, style, h1Style }) {

    if (h1Style == null) h1Style = {}

    return (
        <div className="page-h1" id={id} style={style}>
            <h1 style={h1Style} onClick={onClick} className={classNames({ 'cursor-pointer': onClick != null })}>
                { children }
            </h1>
        </div>
    )
}