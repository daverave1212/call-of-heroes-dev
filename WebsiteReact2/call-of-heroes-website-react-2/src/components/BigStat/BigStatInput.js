
import Input from '../Input/Input'
import './BigStat.css'

export function BigStatInput({ name, value, onChange, style, className }) {

    function onInputChange(newVal) {
        if (!isNaN(parseInt(newVal)) && newVal != '') {
            onChange(newVal)
        }
    }

    return (
        <div className={`stat-input ${className}`} style={style}>
            <Input value={value} onChange={onInputChange}/>
            {/* <input value={temporaryValue} onChange={evt => onInputChange(evt.target.value)}/> */}
            <div className="input-name input-name-styled">{ name }</div>
        </div>
    )
}