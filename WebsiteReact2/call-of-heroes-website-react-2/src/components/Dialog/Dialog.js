import './Dialog.css'

export default function Dialog({ children, buttonText, isOpen, setIsOpen, onButtonClick }) {
    const displayStyle = isOpen == true? '': 'none'

    function onBackgroundClick() {
        setIsOpen(false)
    }
    function onCardClick(evt) {
        evt.stopPropagation()
    }

    return (
        <div className='dialog center-content' style={{display: displayStyle}} onClick={onBackgroundClick}>
            <div className='dialog-card shadowed' onClick={onCardClick}>
                { children }
                { buttonText != null && (
                    <div className='center-content margin-top-1'>
                        <button onClick={onButtonClick}>{buttonText}</button>
                    </div>
                ) }
            </div>
        </div>
    )
}