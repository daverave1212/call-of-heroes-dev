
import './ChangeStatDialog.css'

import { useEffect, useState } from "react"
import Dialog from "../../../components/Dialog/Dialog"
import { useArmors, useManualBonuses } from "./CharacterData"
import PageH2 from "../../../components/PageH2/PageH2"
import { LabelWithInput } from './SectionNames'
import { BigStatValue } from '../../../components/BigStat/BigStatValue'
import { GrayFractionText } from '../../../components/GrayFractionText/GrayFractionText'
import { playStarsAnimation } from '../../../services/dom/star-particles/star-particles'
import ProgressBar from '../../../components/ResourceBar/ProgressBar'
import { flashElement } from '../../../services/dom/flash-glow'

// WIP
// export function CustomArmorDialog({ isOpen, setIsOpen }) {
    
//     let [name, setName] = useState('')
//     let [effect, setEffect] = useState('')

//     const [armorNames, setArmorNames] = useArmors()

//     function onButtonClick() {

//     }

//     return (
//         <Dialog buttonText="Add" isOpen={isOpen} onButtonClick={onSave} setIsOpen={setIsOpen}>
//             <div>
//                 <LabelWithInput labelText="Armor Name" value={name} onChange={newVal => setName(newVal)}/>
//                 <LabelWithInput labelText="Effect" value={effect} onChange={newVal => setEffect(newVal)}/>
//             </div>
//         </Dialog>
//     )
// }
export const ChangeStatDialogTypes = {
    NORMAL: 'normal',
    FRACTION: 'fraction'
}
export default function ChangeStatDialog(params) {
    const type = params.type ?? 'normal'
    if (type == 'normal') {
        return ChangeStatDialogNormal(params)
    }
    return ChangeStatWithFractionDialog(params)
}
export function ChangeStatDialogNormal({ display, defaultInputValue, defaultNumberValue, description, title, close, onDone, increment=1, isFractionGray=false }) {

    // console.log({ defaultInputValue, defaultNumberValue, description, title, close, onDone, increment, numberValue, inputValue })

    const [numberValue, setNumberValue] = useState(defaultNumberValue)
    const [inputValue, setInputValue] = useState(defaultInputValue)
    
    const nameUsed = defaultInputValue ?? defaultNumberValue ?? 'Unknown'
    const usedTitle = title ?? 'Add'
    const descriptionUsed = description ?? `Add extra points to this that are not autocalculated (e.g. from magic items, level up, etc)`
    const bigNumber = isFractionGray? <GrayFractionText value={numberValue}/>: numberValue

    useEffect(() => {
        console.green(`CHANGED defaultNumberValue: now at ${defaultNumberValue}`)
        setNumberValue(defaultNumberValue)
    }, [defaultNumberValue])

    function onMinus() {
        console.warn(`ON MINUS TRIGGERED!!!!!`)
        setNumberValue(numberValue - increment)
    }
    function onPlus() {
        setNumberValue(numberValue + increment)
    }
    function onSave() {
        console.log(`✅ Saving value as ${numberValue}`)
        onDone({ name: inputValue, value: numberValue})
        close()
    }

    return (
        <Dialog buttonText="Finished" isOpen={true} onButtonClick={onSave} setIsOpen={(bool) => {
            if (bool == false) {
                close()
            }
        }}>
            <div className="center-content">
                <h2 className='center-text' style={{fontFamily: 'HomeFont', fontWeight: 'normal'}}>{usedTitle}</h2>
                <p className='center-text'>
                    { descriptionUsed }
                </p>
                { defaultInputValue != null &&
                    <div>
                        <input className="text-input margin-bottom-1" onChange={evt => setInputValue(evt.target.value)} value={inputValue} onKeyUp={evt => {
                            if (evt.key == 'Enter') {
                                onSave()
                            }
                        }}/>
                    </div>
                }
                
                { defaultNumberValue != null && 
                    <div className="flex-row gap-1">
                        <div className="wrapper plus-minus unselectable" onClick={onMinus}>
                            <div>-</div>
                        </div>
                        {/* <BigStatValue name={nameUsed} value={display(numberValue)}/> */}
                        <BigStatValue name={nameUsed} value={bigNumber}/>
                        <div className="wrapper plus-minus unselectable" onClick={onPlus}>
                            <div>+</div>
                        </div>
                    </div>
                }
            </div>
        </Dialog>
    )
}



export function ChangeStatWithFractionDialog({
    id,
    title, name,
    close, onDone,
    shouldPlayAnimation = (num, delta) => false,
    displayTitle = (num, delta) => 'Change Stat',
    displayValue = num => num,
    displayDescription = num => `Add extra points to this that are not autocalculated (e.g. from magic items, level up, etc)`,
    displayName = num => '',
    displayProgressBarMax = (num, delta) => 1,
    displayProgressBarValue = (num, delta) => num,
    defaultNumberValue = 0,
}) {

    // console.log({ defaultInputValue, defaultNumberValue, description, title, close, onDone, increment, numberValue, inputValue })

    const [numberValue, setNumberValue] = useState(defaultNumberValue)
    
    const increment = 1
    const delta = numberValue - defaultNumberValue
    const bigNumber = <GrayFractionText value={displayValue(numberValue, delta)}/>

    useEffect(() => {
        console.green(`CHANGED defaultNumberValue: now at ${defaultNumberValue}`)
        setNumberValue(defaultNumberValue)
    }, [defaultNumberValue])

    function onMinus() {
        console.warn(`ON MINUS TRIGGERED!!!!!`)
        setNumberValue(numberValue - increment)
    }
    function onPlus() {
        const newNumber = numberValue + increment
        console.green(`Delta: ${delta} with newNumber=${newNumber} and defaultNumberValue=${defaultNumberValue}`)
        if (shouldPlayAnimation(newNumber, delta + 1)) {
            playStarsAnimation(document.querySelector('#' + id))
            flashElement(document.querySelector('#' + "Change-Stat-Dialogue-Bar"), 'gold')
        }
        setNumberValue(newNumber)
    }
    function onSave() {
        console.log(`✅ Saving value as ${numberValue}`)
        onDone({ value: numberValue, delta })
        close()
    }

    return (
        <Dialog buttonText="Finished" isOpen={true} onButtonClick={onSave} setIsOpen={(bool) => {
            if (bool == false) {
                close()
            }
        }}>
            <div id={id} className="center-content">
                <h2 className='center-text' style={{fontFamily: 'HomeFont', fontWeight: 'normal'}}>{displayTitle(numberValue, delta)}</h2>
                <p className='center-text margin-top-1'>
                    { displayDescription(numberValue, delta) }
                </p>
                
                { defaultNumberValue != null && 
                    <div className="flex-row gap-1">
                        <div className="wrapper plus-minus unselectable" onClick={onMinus}>
                            <div>-</div>
                        </div>
                        <BigStatValue name={displayName(numberValue, delta) ?? name} value={bigNumber}/>
                        <div className="wrapper plus-minus unselectable" onClick={onPlus}>
                            <div>+</div>
                        </div>
                    </div>
                }

                <div className='relative center-content margin-top-half' style={{width: 'var(--stat-selector-size)'}}>
                    <ProgressBar id="Change-Stat-Dialogue-Bar" maxValue={displayProgressBarMax(numberValue, delta)} value={displayProgressBarValue(numberValue, delta)} color2='var(--theme-color)'/>
                </div>
            </div>
        </Dialog>
    )
}
