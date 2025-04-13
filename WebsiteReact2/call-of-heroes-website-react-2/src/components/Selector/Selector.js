
import { getSpellIconPathByName } from '../../utils'
import './Selector.css'

export default function Selector({ name, src, onClick, isSelected=false, className, style }) {
    return (
        <div class={`selector spoiler ${isSelected? 'selected': ''} ${className}`} onClick={onClick} style={style}>
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