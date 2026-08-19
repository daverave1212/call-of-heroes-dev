import './Popup.css'

export default function Popup({ children, isOpen, close, canBeClosed=true }) {

    function maybeClose() {
        if (canBeClosed) {
            close()
        }
    }

    return <div className={`popup center-content ${!isOpen? 'hidden': ''}`} onClick={maybeClose}>
        <div className='popup-content-wrapper' onClick={evt => evt.stopPropagation()}>
            <div className='popup-content'>
                { children }
            </div>
        </div>
    </div>
}