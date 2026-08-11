import { SYMBOLS } from '../../../utils';
import Icon from '../../Icon';

export function RenderEffect({ name, key, value }) {
    name = name ?? key;

    switch (name) {
        case 'Damage':
            return <div key="Damage" className='spell-description'>
                <Icon name="Damage" />{value}
            </div>;
        case 'PreEffectGreen':
            return <div className="spell-description spell-green" key="PreEffectGreen">{PreEffectGreen}</div>;
        case 'Effect':
            return <div className='spell-description'>
                {value}
            </div>;
        case 'List':
            return <div className='spell-description'>
                {value.map(li => (
                    <div style={{ marginTop: 'var(--spell-padding-small)' }}>
                        {SYMBOLS.Diamond.func()} {li}
                    </div>
                ))}
            </div>;
        case 'Combo':
            return <div className='spell-description spell-combo' key="Combo"><span style={{ color: 'var(--blue-color)' }}>Combo: </span>{value}</div>;
        case 'EffectGreen':
            return <div className="spell-green" key="EffectGreen">{value}</div>;
        case 'Downside':
            return <div className="spell-red" key="Downside">{value}</div>;
        case 'Upgrade':
            return <div className='spell-upgrade smaller-font'>{value}</div>;
        case 'EffectOrange':
            return <div className='spell-upgrade smaller-font' style={{ color: 'var(--orange-color)' }}>{value}</div>;
        case 'Notes':
            return <div className='spell-notes italic smaller-font'>{value}</div>;
        case 'Alternatives':
            return <div className='spell-notes italic smaller-font'>Alternatives: {value}</div>;
        default:
            return <div>Unknown effect {name} with value: {value}</div>;
    }
}
