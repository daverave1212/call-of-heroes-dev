import { useEffect, useState } from "react"

export default function TextArea({ initialValue, rows=30, cols=90, onChange, reactsToInitialValue=false, className, style }) {

    const [text, setText] = useState(initialValue)

    useEffect(() => {
        if (reactsToInitialValue) {
            setText(initialValue)
        }
    }, [initialValue])

    return <textarea
        className={className}
        style={style}
        value={text}
        rows={rows}
        cols={cols}
        onChange={evt => {
            setText(evt.target.value)
        }}
        
        onBlur={evt => {
            onChange(text)
        }}
        onKeyUp={evt => {
            if (evt.key == 'Enter' && evt.ctrlKey) {
                onChange(text)
            }
        }}
    />
}