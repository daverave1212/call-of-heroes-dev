import { useState } from 'react'
import './CopySpellButton.css'

function drawOuterBorderOnCanvas(canvas) {
    const borderSize = 4
    const ctx = canvas.getContext('2d')
    
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Required for some reason
    ctx.strokeStyle = 'black'; // Default stroke color
    ctx.fillStyle = 'black';   // Default fill color
    ctx.lineWidth = borderSize
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

export default function CopySpellButton({elementId, shouldAddBorder}) {

    if (shouldAddBorder == null) shouldAddBorder = false

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

            if (shouldAddBorder) {
                console.log('Adding border...')
                drawOuterBorderOnCanvas(canvas)
            } else {
                console.log('NO border...')
            }

            setTimeout(() => {
                canvas.toBlob(blob => {
                    copyBlobToClipboard(blob, () => {
                        canvas.remove()
                        setTimeout(() => {
                            setDisplayedIcon('copy')
                        }, 500)
                    })
                })
            }, 500)
        })
    }

    const [displayedIcon, setDisplayedIcon] = useState('copy')

    return (
        <div onClick={onCopyClick} style={{position: 'relative'}}>
            <img style={{display: displayedIcon === 'copy' ? '' : 'none'}} className='copy-button' src='/Icons/UI/Copy.png'/>
            <img style={{display: displayedIcon === 'load' ? '' : 'none'}} className='copy-button copy-button--rotating' src='/Icons/UI/CopyLoading.png'/>
        </div>
    )
}

