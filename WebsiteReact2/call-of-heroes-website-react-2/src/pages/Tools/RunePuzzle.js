import React from 'react'
import { useState } from 'react'
import Page from '../../containers/Page/Page'
import { formValueIntOr, range, shuffle, takeRandomElements } from '../../utils'


const allSymbols = [
    '¶', '§', 'ℇ', 'ℐ', 'ℑ', '℔', '℥', '℩', 'ℭ', 'ℱ',
    'ℵ', 'ℷ', '⅁', '☊', '☖', '☨', '☲', '☶', '☱',
    '♃', '♅', '♇', '♮', '⚗', '⚲', '✜', '✛', '✷',
    '✴', '✶', '❍', '❡', '₹', '₪', '₰', '௹', '₺',
    '₼', '৲', '৳', '៛', 'Þ', 'ð', 'ſ', 'ƍ', 'Ƈ',
    'Ƣ', 'ƭ', 'ƺ', 'ƾ', 'ƿ', 'ȴ', 'ɚ', 'ɷ', 'ʯ',
    'ʮ', '∐', '∞', '∮', '≎', '≱', '≰', '⋌', '⋢',
    '⋳', '⋲', '⋹', '‡', '⁆', '月', '山', '火', '水',
    '门', 'ク', 'キ', 'ち', 'や', 'ぬ', 'み', 'Ђ',
    'Ҁ', 'ဥ', 'ဉ', 'ၡ', 'ꩴ', 'ꧨ', '꧲', '꧳', 'অ',
    'দ', 'ত', 'য', 'ก', 'จ', 'อ', 'ⴡ', 'ქ'
]


export default function RunePuzzle() {

    const [inputValue, setInputValue] = useState('')
    const [solution, setSolution] = useState({
        possibleSymbols: [],
        correctIndices: []
    })

    function generate() {
        const randomizedSymbols = shuffle([...allSymbols])
        const difficulty = formValueIntOr(inputValue, 5)
        const possibleSymbols = randomizedSymbols.slice(0, difficulty * 5)
        const symbolIndices   = possibleSymbols.map((s, i) => i)
        const correctIndices  = takeRandomElements(symbolIndices, difficulty)
        setSolution({ possibleSymbols, correctIndices })
    }

    function Rune({index, symbol}) {
        const style = {
            position: 'relative',
            width: '80px', height: '80px',
            fontSize: '57px',
            border: 'solid gray 1px',
            backgroundColor: 'white',
            color: 'blue',
            font: 'TitleFont',
            textAlign: 'center'
        }
        return (
            <div style={style}>
                {symbol}
                <div style={{
                    position: 'absolute',
                    color: 'gray',
                    bottom: '0px',
                    left: '2px',
                    fontSize: '18px'
                }}>
                    {index}
                </div>
            </div>
        )
    }

    return (
        <Page>
            <br/><br/><br/><br/>
            <h3>Difficulty</h3>
            <input value={inputValue} onChange={(evt) => setInputValue(evt.target.value)}/>
            <button onClick={generate}>Go</button>

            <br/><br/><br/><br/>
            <h2>Correct Sequence</h2>
            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                { solution.correctIndices.map(i => (
                    <Rune index={null} symbol={solution.possibleSymbols[i]}/>
                )) }
            </div>

            <br/><br/><br/><br/>
            <h2>Guesser's Sequence</h2>
            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                { solution.possibleSymbols.map((symbol, i) => (
                    <Rune index={i} symbol={symbol}/>
                )) }
            </div>
        </Page>
    )
}