import { getNumberPartsString } from '../../utils'
import './NumberAligner.css'

export default function NumberAligner({number, includePlus=false, slotWidth='0.45em', isFractionGray=false }) {

    let { sign, left, right } = getNumberPartsString(number, { includeDotOnRight: true })
    
    const parts = []

    if (number > 0 && includePlus) {
        sign = '+'
    }
    
    if (left.length == 1) {
        parts.push({ value: '', type: 'sign' })
        parts.push({ value: sign, type: 'sign' })
        parts.push({ value: left, type: 'left'})
    } else {
        parts.push({ value: sign, type: 'sign' })
        parts.push({ value: left[0], type: 'left'})
        parts.push({ value: left[1], type: 'left'})
    }

    if (right.startsWith('.')) {
        parts.push({ value: '.', type: 'dot'})
        right = right.slice(1, right.length)
    } else {
        parts.push({ value: '', type: 'dot'})
    }

    if (right.length == 0) {
        parts.push({ value: '', type: 'right'})
        parts.push({ value: '', type: 'right'})
    } else if (right.length == 1) {
        parts.push({ value: right, type: 'right'})
        parts.push({ value: '', type: 'right'})
    } else {
        parts.push({ value: right[0], type: 'right'})
        parts.push({ value: right[1], type: 'right'})
    }

    console.green(`For number ${number}:`)
    console.log({sign, left, right, parts, slotWidth})


    return <span className='inline-flex flex-end pre'>
        { parts.map(({ value, type }) => <span style={{
            display: 'inline-block',
            width: type == 'dot'? '0.25em': slotWidth,
            textAlign: 'center',
            flexShrink: 0,
        }}>
            { type == 'sign' || type == 'left' || type == 'dot'?
                value
              :isFractionGray?
                <span style={{color: '#BBBBBB'}}>{value}</span>
              :
                value
            }
        </span>) }
    </span>

}