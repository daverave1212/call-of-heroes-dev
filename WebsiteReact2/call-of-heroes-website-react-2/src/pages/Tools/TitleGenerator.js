import { useEffect, useRef, useState } from "react";
import Page from "../../containers/Page/Page";
import { drawImageOnCanvasAsync, getImageRelativeWidthAtHeight, loadImageAsync, useLocalStorageState } from "../../utils";
import './TitleGenerator.css'
import Input from "../../components/Input/Input";

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
const GET_SPACE_WIDTH = function(sizeMultiplier=1) { return 200 * sizeMultiplier }

const GET_SHORT_LETTER_HEIGHT = function(sizeMultiplier=1) { return 363 * sizeMultiplier }
const GET_TALL_LETTER_HEIGHT = function(sizeMultiplier=1) { return 463 * sizeMultiplier }
const TALL_LETTERS = ['j', 'q']
const LETTER_OFFSETS_TOP = {
    'a': 0, 'b': 10, 'c': 0, 'd': 10, 'e': 12, 'f': 11, 'g': 0, 'h': 10,'i': 9,'j': 9,'k': 10, 'l': 9,
    'm': 13,'n': 13,'o': 0, 'p': 9, 'q': 0,'r': 8,'s': 0,'t': 10,'u': 10,'v': 10,
    'w': 10,'x': 10,'y': 10,'z': 10,
}
const GET_LETTER_OFFSET_TOP = function(letter, sizeMultiplier=1) {
    return LETTER_OFFSETS_TOP[letter] * sizeMultiplier
}
const LETTER_SRC_MAPPING = Object.keys(LETTER_OFFSETS_TOP)
    .map(letter => {
        let letterSrc = `/FontLetters/${letter}.png`
        if (['q', 'a', 's'].includes(letter)) {
            letterSrc = `/FontLetters/${letter}.svg`
        }
        return {
            letter: letter,
            src: letterSrc
        }
    })
    .reduce((objSoFar, {letter, src}) => ({...objSoFar, [letter]: src}), {})

const GET_DEFAULT_KERNING = function(sizeMultiplier=1) { return 30 * sizeMultiplier }
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
        'ag': -10,
        'aj': -10,
        'ao': -10,
        'aq': -10,
        'at': -10,
        'au': -10,
        'av': -10,
        'aw': -10,
        'ay': -10,
        'cd': -5,
        'ce': -5,
        'cf': -5,
        'cd': -5,
        'ch': 10,
        'ci': -5,
        'cj': -5,
        'ck': -5,
        'cl': 5,
        'cm': -5,
        'cn': -5,
        'cp': -5,
        'cr': -5,
        'cw': -10,
        'cx': -10,
        'cy': -10,
        'dv': -10,
        'dw': -10,
        'dy': -10,
        'es': 12,
        'er': 20,
        'fa': -25,
        'gt': -15,
        'gv': -15,
        'gw': -25,
        'gy': -15,
        'gu': -5,
        'lv': -15,
        'lw': -15,
        'ly': -15,
        'lu': -10,
        'ov': -10,
        'ow': -10,
        'ox': -10,
        'oy': -10,

        'da': -10,
        'ja': -10,
        'oa': -10,
        'ob': -20,
        'pa': -10,
        'po': -5,
        'rv': -30,
        'ru': -7,
        'qa': -10,
        'qv': -15,
        'qw': -15,
        'qy': -15,
        'ta': -10,
        'ua': -15,
        'va': -80,
        'vc': -25,
        'vg': -15,
        'vo': -15,
        'vq': -15,
        'wa': -30,
        'wb': -25,
        'wc': -25,
        'wi': -10,
        'wg': -25,
        'wo': -15,
        'wq': -15,
        'ya': -10,
        'yc': -25,
        'yg': -20,
        'yo': -20,
        'yq': -15,
        'xo': -10,
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



export function QGTitle1__({ text, className, style, hueShift, height=60 }) {

    const h2Style = {
        fontFamily: 'NewTitleFont',
        fontSize: `${Math.floor(height * 1.25)}px`,
        lineHeight: `${Math.floor(height * 1.25)}px`,
        margin: '0px',
        paddingTop: '32px',
        paddingBottom: '16px',
        filter: (hueShift == null? null: `hue-rotate(${hueShift}deg)`)
    }

    return <h2 className={"title-text " + className} style={{...h2Style, ...style}}>{text}</h2>

    return <canvas ref={canvasRef} className={`qg-title1 ${className}`}/>
}
export function QGTitle1({ id, text, className, style, hueShift, height=60 }) {
    const [newStyle, setNewStyle] = useState({
        // height: height + 'px',
        filter: (hueShift == null? null: `hue-rotate(${hueShift}deg)`),
        ...style
    })
    const canvasRef = useRef(null)

    const size60BaseMultiplier = 0.1296
    const heightMultiplier = height / 60
    const sizeMultiplier = size60BaseMultiplier * heightMultiplier
    useEffect(() => {
        const canvas = canvasRef.current
        drawQGTextOnCanvas(canvas, text, sizeMultiplier).then(() => {
            setNewStyle({
                ...newStyle,
                aspectRatio: `${canvas.width}/${canvas.height}`
            })
        })
    }, [])

    return <canvas id={id} style={newStyle} ref={canvasRef} className={`qg-title1 ${className}`}/>
}


const letterImage = {}

export async function drawQGTextOnCanvas(canvas, text, sizeMultiplier=1) {

    async function maybePreloadLetterImages() {
        async function maybePreloadLetterImage(letter) {
            if (letterImage[letter] == null) {
                try {
                    letterImage[letter] = await loadImageAsync(LETTER_SRC_MAPPING[letter])
                } catch (e) {
                    console.error(`Failed to load image for letter ${letter} from src="${LETTER_SRC_MAPPING[letter]}". Exception:`)
                    throw e
                }
            }
            const thisLetterImage = letterImage[letter]
            
            if (isNaN(thisLetterImage.naturalWidth)) {
                throw `Letter ${letter} image naturalWidth is NaN`
            }
        }

        const allLetters = LETTERS.split('')
        for (const letter of allLetters) {
            await maybePreloadLetterImage(letter)
        }
    }
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
            try {
                const extraWidth = (isCapital? getImageRelativeWidthAtHeight(img, letterHeight) : (img.naturalWidth * sizeMultiplier))
                widthSoFar += extraWidth
            } catch (e) {
                console.error(`An error occurect for getTextWidth("${text}") at i=${i} letter=${letter}; isCapital=${isCapital} letterHeight=${letterHeight}`)
                throw e
            }

            const previousLetter = i > 0? text.charAt(i - 1): null
            if (previousLetter != null && previousLetter != ' ') {
                const kerning = getKerning(previousLetter, letterLowerCase, sizeMultiplier)
                widthSoFar += kerning
            }
        }
        return widthSoFar
    }
    function drawCharAt(i, drawX) {
        if (text.charAt(i) == ' ') {
            return drawX + GET_SPACE_WIDTH(sizeMultiplier)
        }
        
        const char = text.charAt(i)
        const letterLowerCase = char.toLowerCase()
        const isCapital = char.toLowerCase() != char
        const image = letterImage[letterLowerCase]
        const previousLetter = i > 0? text.charAt(i - 1): null

        if (previousLetter != null && previousLetter != ' ') {
            const kerning = getKerning(previousLetter, letterLowerCase, sizeMultiplier)
            drawX += kerning
        }

        const yOffset = GET_LETTER_OFFSET_TOP(letterLowerCase, sizeMultiplier)
        const drawY = isCapital? yOffset: (GET_CAPITAL_EXTRA_HEIGHT(sizeMultiplier) + yOffset)
        const imageHeight = (isCapital? image.naturalHeight * sizeMultiplier + GET_CAPITAL_EXTRA_HEIGHT(sizeMultiplier): (image.naturalHeight * sizeMultiplier))
        drawImageOnCanvasAsync(canvas, image.src, drawX, drawY, null, imageHeight)
        const extraWidth = (isCapital? getImageRelativeWidthAtHeight(image, getLetterHeight(letterLowerCase, isCapital, sizeMultiplier)) : image.naturalWidth * sizeMultiplier)
        drawX += extraWidth
        return drawX
    }

    await maybePreloadLetterImages()

    canvas.width = getTextWidth(text)
    canvas.height = GET_TALL_LETTER_HEIGHT(sizeMultiplier)

    let drawX = 0

    for (let i = 0; i < text.length; i++) {
        drawX = drawCharAt(i, drawX)
    }

    
}


export default function TitleGenerator() {

    function generate() {
        const canvas = document.querySelector('canvas')
        const text = inputState
        drawQGTextOnCanvas(canvas, text, 0.1296)
    }

    let [inputState, setInputState] = useLocalStorageState('')

    return <Page>
        <input value={inputState} onChange={evt => setInputState(evt.target.value)}/>
        <button className="button" onClick={generate}>Generate</button>
        <canvas id="Title-Canvas"></canvas>
    </Page>
}
