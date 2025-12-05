import { useEffect, useState } from "react"
import '../BigStat/BigStat.css'

export function ExperienceSlider({max, initialValue, onChange, children}) {
    let [val, setVal] = useState(initialValue)

    useEffect(() => {
        setVal(0)
        onChange(0)
    }, [max])

    function updateState(evt) {
        const newValue = evt.target.value
        onChange(newValue)
    }

    return (
        <>
            <input
                type="range"
                data-max-xp={max}
                data-val={val}
                data-text={children}
                min="0" max={max} value={val} step="5"
                onChange={evt => setVal(evt.target.value)}
                onBlur={updateState} onMouseUp={updateState}
            />
            <p className="margin-top-half input-name input-name-styled">Experience: {val} / {max}</p>
        </>
    )
}