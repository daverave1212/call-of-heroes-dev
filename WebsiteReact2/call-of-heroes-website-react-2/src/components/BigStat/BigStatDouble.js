

import './BigStat.css'

export function BigStatDouble({ options, className, style, onClick }) {
    const [top, bottom] = options
    return (
        <div className={`stat-input double pointer flex column ${className}`} style={style} onClick={onClick}>
            <div className="part">
                <div>{ top.value }</div>
                <div className="input-name input-name-styled">{ top.name }</div>
            </div>
            <div className="part">
                <div>{ bottom.value }</div>
                <div className="input-name input-name-styled">{ bottom.name }</div>
            </div>
        </div>
    )
}