

import './Ribbon.css'

export default function Ribbon({ children, style }) {
    return (
        <div class="ribbon rotated flex column center-text" style={style}>
        <img class="shadowed" src={`/Ribbon.png`}/>
        <h3>
            { children }
        </h3>
    </div>
    )
}