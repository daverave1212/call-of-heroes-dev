
import { getSpellIconPathByName } from '../../utils'
import './Selector.css'

export default function Selector({ name, src, onClick, isSelected=false }) {
    return (
        <div class={`selector spoiler ${isSelected? 'selected': ''}`} onClick={onClick}>
            <div className="flex">
                <div className="icon-wrapper">
                    <div className='icon-border'>
                        <img src={src}/>
                    </div>
                </div>
                <div className="name-wrapper">{ name }</div>
            </div>
        </div>
    )
}