

import ProgressBar from './ProgressBar'
import './ResourceBar.css'

export function ResourceBar({ name, maxValue, value, setValue, color1='var(--theme-color)', color2='rgb(15, 137, 189)' }) {
    function onIncrease() {
        const newValue = value + 1
        if (newValue > maxValue + 5) {
            return
        }
        setValue(newValue)
    }
    function onDecrease() {
        const newValue = value - 1
        if (newValue < -4) {
            return
        }
        setValue(newValue)
    }

    const labelText = value > maxValue? `${name} (extra)`: value < 0? `${name} (?)` : name
    const barHeight = '2.5rem'
    const innerHeight = `calc(${barHeight} - 0px)`
    const smallStatValueStyle = {
        padding: '0px',
        paddingTop: '3px',
        height: innerHeight,
    }
    const buttonStyle = {
        height: '100%',
        width: innerHeight,
        backgroundColor: color1,
        userSelect: 'none'
    }

    return (
        <div className="small-stat small-stat--column" style={{borderColor: 'white'}}>
            <div style={{backgroundColor: color1, borderRadius: '3px'}} className="small-stat__name text-font">{labelText}</div>
            <div className="small-stat__value flex-row gap-quarter" style={smallStatValueStyle}>
                <button style={buttonStyle} onClick={onDecrease}>-</button>
                <ProgressBar style={{height: '100%'}} value={value} maxValue={maxValue} color1={color1} color2={color2}/>
                <button style={buttonStyle} onClick={onIncrease}>+</button>
            </div>
        </div>
    )
}