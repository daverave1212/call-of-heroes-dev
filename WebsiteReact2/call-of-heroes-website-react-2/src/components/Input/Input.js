import { useEffect, useState } from "react"

export default function Input({ value, onChange, className, style, setSet }) {
    const [temporaryValue, setTemporaryValue] = useState(value)

    if (setSet != null) {
        setSet(setTemporaryValue)
    }

    useEffect(() => {
        setTemporaryValue(value)
    }, [value])

    function onInputChange(evt) {
        const newVal = evt.target.value
        setTemporaryValue(newVal)
        onChange(newVal)
        evt.target.blur()
    }

    return <input
        className={className} style={style}
        value={temporaryValue}
        onChange={evt => setTemporaryValue(evt.target.value)}
        onBlur={evt => onInputChange(evt)}
        onKeyUp={evt => {
            if (evt.key == 'Enter') {
                onInputChange(evt)
            }
        }}
    />
}