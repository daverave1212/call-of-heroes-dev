
import './ChangeStatDialog.css'

import { useEffect, useState } from "react"
import Dialog from "../../../components/Dialog/Dialog"
import { useArmors, useManualBonuses } from "./CharacterData"
import PageH2 from "../../../components/PageH2/PageH2"
import { LabelWithInput } from './SectionNames'
import { BigStatValue } from '../../../components/BigStat/BigStatValue'

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
export default function ChangeStatDialog({ defaultInputValue, defaultNumberValue, description, title, close, onDone, increment=1 }) {

    console.log({ defaultInputValue, defaultNumberValue, description, title, close, onDone, increment })

    const [numberValue, setNumberValue] = useState(defaultNumberValue)
    const [inputValue, setInputValue] = useState(defaultInputValue)

    console.log({ defaultInputValue, defaultNumberValue, description, title, close, onDone, increment, numberValue, inputValue })
    
    const nameUsed = defaultInputValue ?? defaultNumberValue ?? 'Unknown'
    const usedTitle = title ?? 'Add'
    const descriptionUsed = description ?? `Add extra points to this that are not autocalculated (e.g. from magic items, level up, etc)`

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
                        <BigStatValue name={nameUsed} value={numberValue}/>
                        <div className="wrapper plus-minus unselectable" onClick={onPlus}>
                            <div>+</div>
                        </div>
                    </div>
                }
            </div>
        </Dialog>
    )
}
