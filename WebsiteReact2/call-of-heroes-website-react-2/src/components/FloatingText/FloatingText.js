import { useEffect, useState } from "react"
import './FloatingText.css'


export default function FloatingText({top='0px', left='0px', children, className}) {
    let [animClasses, setAnimClasses] = useState(``)

    useEffect(() => {
        setAnimClasses(`floating-text--animating`)
    }, [])

    return (
        <div className={`floating-text ${className} ${animClasses}`} style={{left, top}}>
            { children }
        </div>
    )
}