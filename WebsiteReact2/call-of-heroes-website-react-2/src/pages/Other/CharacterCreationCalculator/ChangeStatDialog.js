
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
export default function ChangeStatDialog({ statName, setStatName }) {

    const [bonuses, setBonuses] = useManualBonuses()
    const [currentValue, setCurrentValue] = useState(bonuses[statName])

    useEffect(() => {
        setCurrentValue(bonuses[statName])
    }, [bonuses, statName])

    function close() {
        setStatName(null)
    }
    function onMinus() {
        setCurrentValue(currentValue - 1)
    }
    function onPlus() {
        setCurrentValue(currentValue + 1)
    }
    function onSave() {
        bonuses[statName] = currentValue
        setBonuses(bonuses)
        close()
    }

    return (
        <Dialog buttonText="Finished" isOpen={statName != null} onButtonClick={onSave} setIsOpen={(bool) => {
            if (bool == false) {
                setStatName(null)
            }
        }}>
            <div className="center-content">
                <h2 className='center-text' style={{fontFamily: 'HomeFont', fontWeight: 'normal'}}>Add Extra to {statName} (from other sources)</h2>
                <p className='center-text'>
                    Use this to add extra {statName} from other sources, like magic items or permanent stat buffs from magic tomes, etc.<br/>
                    It will be automatically calculated into your Character's {statName}.<br/>
                    Don't forget to remove it if you ever remove magic item, or a permanent stat buff is lost, etc.
                </p>
                <div className="flex-row gap-1">
                    <div className="wrapper plus-minus" onClick={onMinus}>
                        <div>-</div>
                    </div>
                    <StatValue name={statName} value={currentValue}/>
                    <div className="wrapper plus-minus" onClick={onPlus}>
                        <div>+</div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
