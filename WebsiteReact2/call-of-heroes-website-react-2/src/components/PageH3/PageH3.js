
import { TDBullet } from '../TableNormal/TDSleek'
import './PageH3.css'
import React from 'react'

export default function PageH3({ className, children, id, style, hasMargin=false }) {
    
    const classes = (hasMargin? `page-h3 with-margin `: `page-h3 `) + className


    return (
        <div className={classes} style={style} id={id}>
            <h3>
                {/* <TDBullet style={{marginTop: '5.5px'}}/> */}
                { children }
            </h3>
            {/* <div className="underline"></div> */}
        </div>
    )
}