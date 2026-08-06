import './Popup.css'

export default function Popup({ children, isOpen, close, canBeClosed=true }) {

    function maybeClose() {
        if (canBeClosed) {
            close()
        }
    }

    return <div className={`popup center-content ${!isOpen? 'hidden': ''}`} onClick={maybeClose}>
        <div className='popup-content' onClick={evt => evt.stopPropagation()}>
            { children }
        </div>
    </div>
}