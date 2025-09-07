
import { useEffect, useState } from 'react'
import './DrawerPage.css'
import classNames from 'classnames'

export default function DrawerPage({ children, isOpen, close, className }) {

    const [state, setState] = useState('CLOSED')

    useEffect(() => {
        if (isOpen) {
            setState('OPEN')
        } else {
            setState('CLOSING')
            setTimeout(() => {
                setState('CLOSED')
            }, 500)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            setState('OPEN')
        } else {
            setState('CLOSED')
        }
    }, [])



    return (
        <div className={`drawer-page-wrapper ${state == 'CLOSED'? 'closed': 'open'} ${className}`} onClick={() => close()} data-state={state}>
            <div className={`drawer-page-black-overlay ${state == 'OPEN'? 'open': 'closed'}`}></div>
            <div className={`drawer-page ${state == 'OPEN'? 'open': 'closed'}`} onClick={evt => evt.stopPropagation()}>
                { children }
            </div>
        </div>
    )

}