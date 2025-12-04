import './BigStat.css'

export function BigStatValue({ name, value, onClick, className, children, style}) {
    const extraClasses = className?.includes('small')? '': 'large'
    return (
        <div className={`stat-input ${extraClasses} ${onClick == null? '': 'pointer'} ${className}`} style={style}>
            <div onClick={onClick}>{ value }</div>
            <div className="input-name input-name-styled">{ name }</div>
            { children && (
                <div style={{zIndex: "var(--z-overlay)"}}>
                    { children }
                </div>
            ) }
        </div>
    )
}