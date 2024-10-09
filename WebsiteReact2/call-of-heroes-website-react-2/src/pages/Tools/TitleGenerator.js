import { useEffect, useState } from "react";
import Page from "../../containers/Page/Page";
import { drawImageOnCanvasAsync, getImageRelativeWidthAtHeight } from "../../utils";


const letters = 'abcdefghijklmnopqrstuvwxyz'
const SPACE_WIDTH = 200

const SHORT_LETTER_HEIGHT = 363
const TALL_LETTER_HEIGHT = 463
const TALL_LETTERS = ['j', 'q']
const LETTER_OFFSET_TOP = {
    'a': 0, 'b': 10, 'c': 0, 'd': 10, 'e': 12, 'f': 11, 'g': 0, 'h': 10,'i': 9,'j': 9,'k': 10, 'l': 9,
    'm': 13,'n': 13,'o': 0, 'p': 9, 'q': 0,'r': 10,'s': 0,'t': 10,'u': 10,'v': 10,
    'w': 10,'x': 10,'y': 10,'z': 10,
}
const DEFAULT_KERNING = 28
const KERNING = {

}
function hasSpaceStartBottom(letter) { return ['c', 'g', 'o', 'q', 't', 'u', 'v', 'w', 'y'].includes(letter) }
function hasSpaceStartTop(letter) { return ['a', 'c', 'g', 'o', 'q', 's'].includes(letter) }
function hasSpaceEndBottom(letter) { return ['d', 'f', 'o', 'p', 'u', 'v', 'w', 'y'].includes(letter) }
function hasSpaceEndTop(letter) { return ['a', 'b', 'd', 'g', 'l', 'o', 'q', 'r'].includes(letter) }
function getKerning(previousLetter, letter) {
    previousLetter = previousLetter.toLowerCase()
    letter = letter.toLowerCase()
    let kerning = KERNING[previousLetter] != null? KERNING[previousLetter]: DEFAULT_KERNING
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
        'cl': -15,
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
        'wa': -15,
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
    const S_KERNING = 10
    if (COMBOS[combo] != null) {
        return kerning + COMBOS[combo]
    }
    if (previousLetter == 's' || letter == 's') {
        return kerning + S_KERNING 
    }
    return kerning
}



console.log(getKerning('b', 'c'))

const CAPITAL_EXTRA_HEIGHT = 75
function isLetterTall(letter) {
    return TALL_LETTERS.includes(letter)
}
function getLetterHeight(letter, isCapital=false) {
    const letterHeight = isLetterTall(letter)? TALL_LETTER_HEIGHT: SHORT_LETTER_HEIGHT
    if (isCapital) {
        return letterHeight + CAPITAL_EXTRA_HEIGHT
    }
    return letterHeight
}




export default function TitleGenerator() {


    const [canvas, setCanvas] = useState(null)
    const [letterImage, setLetterImage] = useState({})

    useEffect(() => {
        const cv = document.getElementById('Title-Canvas')
        setCanvas(cv)

        const newLetterImage = {}
        for (let i = 0; i < letters.length; i++) {
            const char = letters.charAt(i)
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
                widthSoFar += SPACE_WIDTH
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
                drawX += SPACE_WIDTH
                continue
            }

            const drawY = (isCapital? 0: CAPITAL_EXTRA_HEIGHT) + LETTER_OFFSET_TOP[letterLowerCase]
            const image = letterImage[letterLowerCase]

            const previousLetter = i > 0? text.charAt(i - 1): null
            if (previousLetter != null && previousLetter != ' ') {
                const kerning = getKerning(previousLetter, letterLowerCase)
                drawX += kerning
            }

            const imageHeight = isCapital? image.naturalHeight + CAPITAL_EXTRA_HEIGHT: image.naturalHeight
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