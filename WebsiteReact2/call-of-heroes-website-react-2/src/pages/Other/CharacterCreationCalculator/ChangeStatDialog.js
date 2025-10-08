
import './ChangeStatDialog.css'

import { useEffect, useState } from "react"
import Dialog from "../../../components/Dialog/Dialog"
import { useArmors, useManualBonuses } from "./CharacterData"
import PageH2 from "../../../components/PageH2/PageH2"
import { StatValue } from "./SectionStats"
import { LabelWithInput } from './SectionNames'

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
export default function ChangeStatDialog({ defaultInputValue, defaultNumberValue, description, title, close, onDone }) {

    
    const [numberValue, setNumberValue] = useState(defaultNumberValue)
    const [inputValue, setInputValue] = useState(defaultInputValue)
    
    const nameUsed = defaultInputValue ?? defaultNumberValue ?? 'Unknown'
    const usedTitle = title ?? 'Add'
    const descriptionUsed = description ?? `Add extra points to this that are not autocalculated (e.g. from magic items, level up, etc)`

    useEffect(() => {
        setNumberValue(defaultNumberValue)
    }, [defaultNumberValue])

    function onMinus() {
        setNumberValue(numberValue - 1)
    }
    function onPlus() {
        setNumberValue(numberValue + 1)
    }
    function onSave() {
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
                        <StatValue name={nameUsed} value={numberValue}/>
                        <div className="wrapper plus-minus unselectable" onClick={onPlus}>
                            <div>+</div>
                        </div>
                    </div>
                }
            </div>
        </Dialog>
    )
}
