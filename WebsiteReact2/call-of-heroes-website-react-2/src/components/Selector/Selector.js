
import { getSpellIconPathByName } from '../../utils'
import './Selector.css'

export default function Selector({ name, iconName, onClick, isSelected=false }) {
    return (
        <div class={`selector spoiler ${isSelected? 'selected': ''}`} onClick={onClick}>
            <div className="flex">
                <div className="icon-wrapper">
                    <div className='icon-border'>
                        <img src={`${getSpellIconPathByName(iconName)}`}/>
                    </div>
                </div>
                <div className="name-wrapper">{ name }</div>
            </div>
        </div>
    )
}