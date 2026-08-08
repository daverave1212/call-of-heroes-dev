
import './ResourceBar.css'

export default function ProgressBar({ id, className, style, isSmall=false, hasNumbers=true, maxValue, value, color1='var(--theme-color)', color2='rgb(15, 137, 189)' }) {
    
    const percentageFilled = value > maxValue? 100: value < 0? 0: ((value / maxValue) * 100)
    
    return <div id={id} className={`resource-bar ${isSmall? 'small': ''} flex-grow ${className}`} style={style}>
        <div className="filling" style={{width: percentageFilled + '%', backgroundColor: color2}}></div>
        { hasNumbers && <div className="number">{value} / {maxValue}</div> }
    </div>
}