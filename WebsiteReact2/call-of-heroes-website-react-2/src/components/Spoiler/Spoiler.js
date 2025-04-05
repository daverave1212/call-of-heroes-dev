import { useState } from "react"

import './Spoiler.css'

export default function Spoiler({ title, content, style, className }) {

    let [isExpanded, setIsExpanded] = useState(false)
    let [toggleArrow, setToggleArrow] = useState(() => {})

    function onTitleClick() {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={`spoiler ${className} ${isExpanded? 'expanded': ''}`}>
            <div className="top" onClick={onTitleClick}>
                { title }
                <img className="arrow" src="/Icons/UI/CollapseArrow.png"/>
            </div>
            <div className="bottom">
                <div className="content">
                    { content }
                </div>
            </div>
        </div>
    )
}