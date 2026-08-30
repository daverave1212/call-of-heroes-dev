import { useEffect, useRef, useState } from "react"

export default function TextAreaLocalStorage({
    useLocalStorage,
    initialValue = "",
    saveDelay = 400,
    rows = 17,
    cols = 90,
    className,
    style,
    placeholder
}) {
    const [valueLS, setToLocalStorage] = useLocalStorage()

    const [text, setText] = useState(
        () => valueLS ?? initialValue
    )

    const saveTimeout = useRef(null)

    useEffect(() => {
        return () => {
            clearTimeout(saveTimeout.current)
        }
    }, [])

    function handleChange(evt) {
        const value = evt.target.value

        setText(value)

        clearTimeout(saveTimeout.current)

        saveTimeout.current = setTimeout(() => {
            setToLocalStorage(value)
        }, saveDelay)
    }

    return (
        <textarea
            className={className}
            style={style}
            value={text}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
}