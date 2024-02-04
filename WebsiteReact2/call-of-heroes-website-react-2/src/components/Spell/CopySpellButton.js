import { useState } from 'react'
import './Spell.css'

export default function CopySpellButton({elementId}) {
    function copyBlobToClipboard(blob, callback) {
        navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(() => {
            callback()
        })
    }
    function onCopyClick() {
        setDisplayedIcon('load')
        const domElement = document.getElementById(elementId)
        html2canvas(domElement).then(canvas => {
            document.body.appendChild(canvas)
            canvas.toBlob(blob => {
                copyBlobToClipboard(blob, () => {
                    canvas.remove()
                    setTimeout(() => {
                        setDisplayedIcon('copy')
                    }, 500)
                })
            })
        })
    }

    const [displayedIcon, setDisplayedIcon] = useState('copy')

    return (
        <div onClick={onCopyClick}>
            <img style={{display: displayedIcon === 'copy' ? '' : 'none'}} className='copy-button' src='/Icons/UI/Copy.png'/>
            <img style={{display: displayedIcon === 'load' ? '' : 'none'}} className='copy-button copy-button--rotating' src='/Icons/UI/CopyLoading.png'/>
        </div>
    )
}

