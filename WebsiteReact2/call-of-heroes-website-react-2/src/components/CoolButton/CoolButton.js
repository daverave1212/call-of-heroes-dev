import './CoolButton.css'

export function CoolButton({children, onClick}) {
    return (
        <div className='cool-button-wrapper' onClick={onClick}>
            <button className='cool-button'>
                <span>{children}</span>
            </button>
        </div>
    )
}