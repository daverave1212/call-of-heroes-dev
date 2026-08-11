import './Dialog.css'

export default function Dialog({ children, buttonText, isOpen, setIsOpen, onButtonClick, buttonTexts, onButtonClicks }) {
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
                    <div className='center-content flex row margin-top-1'>
                        <button onClick={onButtonClick}>{buttonText}</button>
                    </div>
                ) }
                { buttonTexts && Array.isArray(buttonTexts) && (
                    <div className='center-content flex row margin-top-1'>
                        { buttonTexts.map((text, i) => (
                            <button onClick={onButtonClicks[i]}>{text}</button>
                        )) }
                    </div>
                ) }
            </div>
        </div>
    )
}