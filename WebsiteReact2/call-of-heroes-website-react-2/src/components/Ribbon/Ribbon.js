

import './Ribbon.css'

export default function Ribbon({ children, style }) {
    return (
        <div className="ribbon rotated flex column center-text" style={style}>
        <img className="shadowed" src={`/Ribbon.png`}/>
        <h3>
            { children }
        </h3>
    </div>
    )
}