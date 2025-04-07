import './CoolButton.css'

export default function CoolButton({children, onClick, style={}, className, height, width, fontSize}) {

    const customStyle = {}
    if (height != null) customStyle['--height'] = height
    if (width != null) customStyle['--width'] = width
    if (fontSize != null) customStyle['--font-size'] = fontSize

    return (
        <div className={`cool-button-wrapper ${className}`} onClick={onClick} style={{...customStyle, ...style}}>
            <button className='cool-button'>
                <span>{children}</span>
            </button>
        </div>
    )
}