
import './Separator.css'

export default function SeparatorFancy() {
    return <div className="separator flex row">
        <div className='flex-11 center-content'>
            <img className='separator-graphic' src="/SeparatorGraphic.png"/>
        </div>
        <div className="flex-1 center-text center-content star">✦</div>
        <div className='flex-11 center-content'>
            <img className='separator-graphic flipped' src="/SeparatorGraphic.png"/>
        </div>
    </div>
}