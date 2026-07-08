
import './TwoColumns.css'

export default function TwoColumnsAuto({children, className, id, style}) {
    return <div className={`two-columns-auto ${className}`} id={id} style={style}>
        {children}
    </div>
}