import { useLocation } from 'react-router-dom'
import './AnchorFixer.css'
import { useEffect } from 'react'
import { getPageHashFromLocation } from '../../utils'
import classNames from 'classnames'


// Fixes the #subsection anchors on pages
// Normally, the nav will overlap the actual div with the subsection id
// This fixes it
export default function AnchorFixer({id, className}) {

    const location = useLocation()
    
    useEffect(() => {
        const hash = getPageHashFromLocation(location)
        if (hash != id) {
            return
        }
        const element = document.querySelector('#' + hash)
        element.scrollIntoView()
    }, [])

    return <div id={id} className={'anchor-fixer ' + className}></div>
}
export function AnchorFixerLess({id}) {
    return <AnchorFixer id={id} className={'less'}/>
}