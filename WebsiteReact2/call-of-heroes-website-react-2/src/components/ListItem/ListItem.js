
import './ListItem.css'

export default function ListItem({ className, children, id, style}) {
    return <li className={`list-item-custom ${className}`} style={style} id={id}>{children}</li>
}