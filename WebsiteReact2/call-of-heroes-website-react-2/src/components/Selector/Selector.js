
import { getSpellIconPathByName } from '../../utils'
import './Selector.css'

export default function Selector({ name, iconName}) {
    return (
        <div class="selector">
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