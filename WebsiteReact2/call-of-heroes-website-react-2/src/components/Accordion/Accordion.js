
import { useState } from 'react'
import './Accordion.css'


export default function Accordion({ children, title, className, contentClassName, style }) {

    const [isOpen, setIsOpen] = useState(false)

    function onTitleClick(evt) {
        setIsOpen(!isOpen)
    }

    return (
        <div className={'accordion ' + className} style={style}>
            <h3 className='pointer' onClick={onTitleClick}>{ title }</h3>
            <div className={`${isOpen? 'open': 'hidden'} ${contentClassName}`}>
                { children }
            </div>
        </div>
    )

}