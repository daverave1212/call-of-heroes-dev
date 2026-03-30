
import { titleToId } from '../../utils'
import './PageH2.css'
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


export default function PageH2({ children, title, id, style, className, hasMargin=false }) {

    const classes = (hasMargin? `page-h2 with-margin `: `page-h2 `) + className

    return (
        <div className={classes} id={id} style={style}>
            <h2>{ children }</h2>
            {/* <div className="page-h2--underline"></div> */}
        </div>
    )
}