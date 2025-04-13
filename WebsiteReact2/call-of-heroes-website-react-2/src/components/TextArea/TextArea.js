import { useState } from "react"

export default function TextArea({ initialValue, onChange, className, style }) {

    const [text, setText] = useState(initialValue)
    const [isCtrlPressed, setIsCtrlPressed] = useState(false)

    return <textarea
        className={className}
        style={style}
        value={text}
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