

import './ResourceBar.css'

export function ResourceBar({ name, maxValue, value, setValue, color1='var(--theme-color-1-darker)', color2='rgb(15, 137, 189)' }) {
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

    const percentageFilled = value > maxValue? 100: value < 0? 0: ((value / maxValue) * 100)
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
            <div style={{backgroundColor: color1, borderRadius: '3px'}} className="small-stat__name">{labelText}</div>
            <div className="small-stat__value flex-row gap-quarter" style={smallStatValueStyle}>
                <button style={buttonStyle} onClick={onDecrease}>-</button>
                <div className="resource-bar flex-grow">
                    <div className="filling" style={{width: percentageFilled + '%', backgroundColor: color2}}></div>
                    <div className="number">{value} / {maxValue}</div>
                </div>
                <button style={buttonStyle} onClick={onIncrease}>+</button>
            </div>
        </div>
    )
}