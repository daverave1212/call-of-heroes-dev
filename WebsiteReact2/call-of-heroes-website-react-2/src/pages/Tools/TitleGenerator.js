import { useEffect, useRef, useState } from "react";
import Page from "../../containers/Page/Page";
import { drawImageOnCanvasAsync, getImageRelativeWidthAtHeight } from "../../utils";
import './TitleGenerator.css'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const GET_SPACE_WIDTH = function(sizeMultiplier=1) { return 200 * sizeMultiplier }

const GET_SHORT_LETTER_HEIGHT = function(sizeMultiplier=1) { return 363 * sizeMultiplier }
const GET_TALL_LETTER_HEIGHT = function(sizeMultiplier=1) { return 463 * sizeMultiplier }
const TALL_LETTERS = ['j', 'q']
const GET_LETTER_OFFSET_TOP = function(letter, sizeMultiplier=1) {
    return {
        'a': 0, 'b': 10, 'c': 0, 'd': 10, 'e': 12, 'f': 11, 'g': 0, 'h': 10,'i': 9,'j': 9,'k': 10, 'l': 9,
        'm': 13,'n': 13,'o': 0, 'p': 9, 'q': 0,'r': 10,'s': 0,'t': 10,'u': 10,'v': 10,
        'w': 10,'x': 10,'y': 10,'z': 10,
    }[letter] * sizeMultiplier
}
const GET_DEFAULT_KERNING = function(sizeMultiplier=1) { return 31 * sizeMultiplier }
const KERNING = {}

// function hasSpaceStartBottom(letter) { return ['c', 'g', 'o', 'q', 't', 'u', 'v', 'w', 'y'].includes(letter) }
// function hasSpaceStartTop(letter) { return ['a', 'c', 'g', 'o', 'q', 's'].includes(letter) }
// function hasSpaceEndBottom(letter) { return ['d', 'f', 'o', 'p', 'u', 'v', 'w', 'y'].includes(letter) }
// function hasSpaceEndTop(letter) { return ['a', 'b', 'd', 'g', 'l', 'o', 'q', 'r'].includes(letter) }

function getKerning(previousLetter, letter, sizeMultiplier=1) {
    previousLetter = previousLetter.toLowerCase()
    letter = letter.toLowerCase()
    let kerning = KERNING[previousLetter] != null? KERNING[previousLetter]: GET_DEFAULT_KERNING(sizeMultiplier)
    const combo = previousLetter + letter
    const COMBOS = {
        'ac': -15,
        'ag': -15,
        'aj': -15,
        'ao': -15,
        'aq': -15,
        'at': -15,
        'au': -15,
        'av': -15,
        'aw': -15,
        'ay': -15,
        'cd': -10,
        'ce': -10,
        'cf': -10,
        'cd': -10,
        'ch': -10,
        'ci': -10,
        'cj': -10,
        'ck': -10,
        'cl': 0,
        'cm': -10,
        'cn': -10,
        'cp': -10,
        'cr': -10,
        'cw': -15,
        'cx': -15,
        'cy': -15,
        'bv': -5,
        'bw': -5,
        'dv': -15,
        'dw': -15,
        'dy': -15,
        'es': 7,
        'er': 30,
        'fa': -30,
        'gt': -20,
        'gv': -20,
        'gw': -30,
        'gy': -20,
        'lv': -20,
        'lw': -20,
        'ly': -20,
        'lu': -15,
        'ov': -15,
        'ow': -15,
        'ox': -15,
        'oy': -15,

        'ba': -5,
        'da': -15,
        'gb': -5,
        'ja': -15,
        'oa': -15,
        'ob': -25,
        'pa': -15,
        'po': -10,
        'rv': -35,
        'qa': -15,
        'qb': -5,
        'qd': -5,
        'qf': -5,
        'qp': -5,
        'qv': -20,
        'qw': -20,
        'qy': -20,
        'sa': -5,
        'ta': -15,
        'ua': -45,
        'va': -85,
        'vc': -30,
        'vg': -20,
        'vo': -20,
        'vq': -20,
        'wa': -65,
        'wb': -30,
        'wc': -30,
        'wg': -30,
        'wo': -20,
        'wq': -20,
        'ya': -15,
        'yc': -30,
        'yg': -25,
        'yo': -25,
        'yq': -20,
        'xo': -15,
    }
    const adjustedSizeMultiplier = sizeMultiplier < 1? sizeMultiplier + 0.3 : sizeMultiplier
    const S_KERNING = 10 * adjustedSizeMultiplier
    if (COMBOS[combo] != null) {
        return (kerning + COMBOS[combo]) * adjustedSizeMultiplier
    }
    if (previousLetter == 's' || letter == 's') {
        return kerning * adjustedSizeMultiplier + S_KERNING
    }
    return kerning * adjustedSizeMultiplier
}


const GET_CAPITAL_EXTRA_HEIGHT = function(sizeMultiplier=1) { return 75 * sizeMultiplier }
window.GET_CAPITAL_EXTRA_HEIGHT =GET_CAPITAL_EXTRA_HEIGHT
function isLetterTall(letter) {
    return TALL_LETTERS.includes(letter)
}
function getLetterHeight(letter, isCapital=false, sizeMultiplier=1) {
    const letterHeight = isLetterTall(letter)? GET_TALL_LETTER_HEIGHT(sizeMultiplier): GET_SHORT_LETTER_HEIGHT(sizeMultiplier)
    if (isCapital) {
        return letterHeight + GET_CAPITAL_EXTRA_HEIGHT(sizeMultiplier)
    }
    return letterHeight
}



export function QGTitle1({ text, className, style, hueShift, height }) {
    const canvasRef = useRef(null)
    const defaultSize = 60
    const newStyle = {
        height: (height == null? defaultSize + 'px' : (height + 'px')),
        filter: (hueShift == null? null: `hue-rotate(${hueShift}deg)`),
        ...style
    }

    const sizeMultiplier = height / defaultSize
    useEffect(() => {
        const canvas = canvasRef.current
        drawQGTextOnCanvas(canvas, text, sizeMultiplier)
    }, [])

    return <canvas ref={canvasRef} className={`qg-title1 ${className}`} style={newStyle}/>
}



export async function drawQGTextOnCanvas(canvas, text, sizeMultiplier=1) {

    const letterImage = {}
    const imageLoadingPromises = LETTERS.split('').map(letter => new Promise((resolve, reject) => {
        if (letterImage[letter] == null) {
            letterImage[letter] = new Image()
            letterImage[letter].src = `/FontLetters/${letter}.png`
        }
        const thisLetterImage = letterImage[letter]
        if (thisLetterImage.complete && thisLetterImage.naturalWidth != NaN) {
            resolve()
        } else {
            thisLetterImage.onload = () => {
                resolve()
            }
        }
    }))
    await Promise.all(imageLoadingPromises)


    function getTextWidth(text) {
        let widthSoFar = 0
        for (let i = 0; i < text.length; i++) {
            const letter = text.charAt(i)
            const letterLowerCase = letter.toLowerCase()
            const isCapital = letter.toLowerCase() != letter
            if (letter == ' ') {
                widthSoFar += GET_SPACE_WIDTH(sizeMultiplier)
                continue
            }
            const img = letterImage[letterLowerCase]
            const letterHeight = getLetterHeight(letterLowerCase, isCapital, sizeMultiplier)
            const extraWidth = (isCapital? getImageRelativeWidthAtHeight(img, letterHeight) : (img.naturalWidth * sizeMultiplier))
            widthSoFar += extraWidth

            const previousLetter = i > 0? text.charAt(i - 1): null
            if (previousLetter != null && previousLetter != ' ') {
                const kerning = getKerning(previousLetter, letterLowerCase, sizeMultiplier)
                widthSoFar += kerning
            }
        }
        return widthSoFar
    }

    

    const textWidth = getTextWidth(text)
    canvas.width = textWidth
    canvas.height = GET_TALL_LETTER_HEIGHT(sizeMultiplier)
    let drawX = 0

    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i)
        const letterLowerCase = char.toLowerCase()
        const isCapital = char.toLowerCase() != char

        if (char == ' ') {
            drawX += GET_SPACE_WIDTH(sizeMultiplier)
            continue
        }

        
        const image = letterImage[letterLowerCase]

        const previousLetter = i > 0? text.charAt(i - 1): null
        if (previousLetter != null && previousLetter != ' ') {
            const kerning = getKerning(previousLetter, letterLowerCase, sizeMultiplier)
            drawX += kerning
        }

        window.GET_CAPITAL_EXTRA_HEIGHT = GET_CAPITAL_EXTRA_HEIGHT
        const yOffset = GET_LETTER_OFFSET_TOP(letterLowerCase, sizeMultiplier)
        const drawY = isCapital? yOffset: (GET_CAPITAL_EXTRA_HEIGHT(sizeMultiplier) + yOffset)
        const imageHeight = (isCapital? image.naturalHeight * sizeMultiplier + GET_CAPITAL_EXTRA_HEIGHT(sizeMultiplier): (image.naturalHeight * sizeMultiplier))
        drawImageOnCanvasAsync(canvas, image.src, drawX, drawY, null, imageHeight)
        const extraWidth = (isCapital? getImageRelativeWidthAtHeight(image, getLetterHeight(letterLowerCase, isCapital, sizeMultiplier)) : image.naturalWidth * sizeMultiplier)
        drawX += extraWidth
    }

    
}


export default function TitleGenerator() {


    const [canvas, setCanvas] = useState(null)
    const [letterImage, setLetterImage] = useState({})

    useEffect(() => {
        const cv = document.getElementById('Title-Canvas')
        setCanvas(cv)

        const newLetterImage = {}
        for (let i = 0; i < LETTERS.length; i++) {
            const char = LETTERS.charAt(i)
            newLetterImage[char] = new Image()
            newLetterImage[char].src = `/FontLetters/${char}.png`
            setLetterImage(newLetterImage)
        }
    }, [])

    function getTextWidth(text) {
        let widthSoFar = 0
        for (let i = 0; i < text.length; i++) {
            const letter = text.charAt(i)
            const letterLowerCase = letter.toLowerCase()
            const isCapital = letter.toLowerCase() != letter
            if (letter == ' ') {
                
                widthSoFar += GET_SPACE_WIDTH()
                continue
            }
            const img = letterImage[letterLowerCase]
            const extraWidth = isCapital? getImageRelativeWidthAtHeight(img, getLetterHeight(letterLowerCase, isCapital)) : img.naturalWidth
            widthSoFar += extraWidth

            const previousLetter = i > 0? text.charAt(i - 1): null
            if (previousLetter != null && previousLetter != ' ') {
                const kerning = getKerning(previousLetter, letterLowerCase)
                widthSoFar += kerning
            }
        }
        return widthSoFar
    }

    async function generate() {
        const text = document.getElementById('Input').value
        const textWidth = getTextWidth(text)
        canvas.width = textWidth
        let drawX = 0
        
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i)
            const letterLowerCase = char.toLowerCase()
            const isCapital = char.toLowerCase() != char

            if (char == ' ') {
                drawX += GET_SPACE_WIDTH()
                continue
            }

            const drawY = (isCapital? 0: GET_CAPITAL_EXTRA_HEIGHT()) + LETTER_OFFSET_TOP[letterLowerCase]
            const image = letterImage[letterLowerCase]

            const previousLetter = i > 0? text.charAt(i - 1): null
            if (previousLetter != null && previousLetter != ' ') {
                const kerning = getKerning(previousLetter, letterLowerCase)
                drawX += kerning
            }

            const imageHeight = isCapital? image.naturalHeight + GET_CAPITAL_EXTRA_HEIGHT(): image.naturalHeight
            drawImageOnCanvasAsync(canvas, image.src, drawX, drawY, null, imageHeight)
            const extraWidth = isCapital? getImageRelativeWidthAtHeight(image, getLetterHeight(letterLowerCase, isCapital)) : image.naturalWidth
            drawX += extraWidth

            

            document.body.appendChild(image)
        }
    }

    return <Page>
        <input id="Input"/>
        <button className="button" onClick={generate}>Generate</button>
        <canvas id="Title-Canvas" height="600" style={{width: '100%'}}></canvas>
    </Page>
}
