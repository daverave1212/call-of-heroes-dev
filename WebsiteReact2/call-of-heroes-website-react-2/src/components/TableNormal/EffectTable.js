
import './TableNormal.css'

export default function EffectTable({nameEffectPairs}) {
    return <div className="effect-table">
        { nameEffectPairs.map(({ name, effect }) => (
            <div className="row">
                <div className="name">{name}</div>
                <div className="effect">{effect}</div>
            </div>
        )) }
    </div>
}