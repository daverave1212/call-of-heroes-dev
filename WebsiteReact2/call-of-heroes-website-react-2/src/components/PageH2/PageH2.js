
import { titleToId } from '../../utils'
import './PageH2.css'
import './PageH2PDF.css'
import React from 'react'

// export default function PageH2({ children, title, id, style, className, hasMargin=false }) {

//     const classes = (hasMargin? `page-h2 with-margin `: `page-h2 `) + className

//     return (
//         <div className={classes} id={id} style={style}>
//             <h2>{ children }</h2>
//             {/* <div className="page-h2--underline"></div> */}
//         </div>
//     )
// }


export default function PageH2({ children, title, id, style, className }) {

    return (
        <div className={`page-h2-pdf relative ${className}`} id={id} style={style}>
            <img className='page-h2-graphic' src="/H2.png"/>
            <h2>{ children }</h2>
            {/* <div className="page-h2--underline"></div> */}
        </div>
    )
}