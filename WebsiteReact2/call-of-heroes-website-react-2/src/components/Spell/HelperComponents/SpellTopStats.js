import { getSpellValidTopStatsObject, isNumber } from '../../../utils';
import { getSpellTags } from '../../../utils';

export function SpellTopStats({ className, tags, keywords }) {
    const { A, DisplayA, Cost, Range, Cooldown, Duration, Requirement, DisplayRequirement, Replacement, Hands, Stat, Special, Price, XP, Name } = tags;
    const validSpellTopTags = getSpellValidTopStatsObject(tags);
    const nTopStats = Object.keys(validSpellTopTags).length;

    function getDisplayA() {
        const usedA = DisplayA != null ?
            DisplayA
            : A != null ?
                A
                : null;
        if (isNumber(usedA)) {
            return `${usedA} Action Points`;
        }
        return usedA;
    }

    let displayedA = DisplayA;

    const parsedKeywords = getSpellTags({ Tags: keywords });

    function KeywordTag({ children }) {
        let style = {};
        if (children?.includes?.('Keystone')) {
            style = { backgroundColor: 'var(--orange-color)' };
        }
        return <div className='tag smaller-font' style={style} key={children}>{children}</div>;
    }

    function KeywordTags() {
        return <>{parsedKeywords.map(tag => <KeywordTag key={tag}>{tag}</KeywordTag>)}</>;
    }

    return (
        <div className='relative'>
            <div className={`spell-top-stats text-font smaller-font ${className}`}>
                {(displayedA != null) && (
                    <div>
                        <img src="/Icons/UI/Hand.png" className="inline-icon--spell" />{displayedA}
                    </div>
                )}
                {Cost != null && (
                    Cost.includes('Health') ?
                        (<div>
                            <img src="/Icons/UI/Health.png" className="inline-icon--spell" />
                            {Cost}
                        </div>)
                        :
                        (<div>
                            <img src="/Icons/UI/Mana.png" className="inline-icon--spell" />
                            {Cost}
                        </div>)
                )}
                {Hands != null && (<div><img src="/Icons/UI/Hand.png" className="inline-icon--spell" />{Hands}</div>)}
                {Range != null && (<div><img src="/Icons/UI/Range.png" className="inline-icon--spell" />{Range}</div>)}
                {Stat != null && (<div><img src="/Icons/UI/Special.png" className="inline-icon--spell" />{Stat}</div>)}
                {Special != null && (<div><img src="/Icons/UI/Special.png" className="inline-icon--spell" />{Special}</div>)}
                {Cooldown != null && (<div><img src="/Icons/UI/Cooldown.png" className="inline-icon--spell" />{Cooldown}</div>)}
                {Duration != null && (<div><img src="/Icons/UI/Duration.png" className="inline-icon--spell" />{Duration}</div>)}
                {(Requirement != null || DisplayRequirement != null) && (
                    <div>
                        <img src="/Icons/UI/Level.png" className="inline-icon--spell" />
                        <span style={{ color: '#FF5A00' }}>{Requirement != null ? Requirement : DisplayRequirement}</span>
                    </div>
                )}
                {Replacement != null && (
                    <div>
                        <img src="/Icons/UI/Replacement.png" className="inline-icon--spell" />
                        <span style={{ color: 'var(--blue-color)' }}>{Replacement}</span>
                    </div>
                )}
                {Price != null && (<div><img src="/Icons/UI/Gold.png" className="inline-icon--spell-downer" />{Price}</div>)}
                {XP != null && (<div><img src="/Icons/UI/XP.png" className="inline-icon--spell" />{XP}</div>)}
            </div>
            {keywords &&
                <div className='spell-top-stats' style={{ paddingTop: 0, marginTop: '-3px' }}>
                    <KeywordTags />
                </div>}
        </div>
    );
}/*
    Spell Example:
TODO
*/



export const VALID_SPELL_TOP_STATS = [
    'A', 'DisplayA', 'Cost',
    'Range', 'Cooldown', 'Duration',
    'Requirement', 'DisplayRequirement', 'Replacement',
    'Hands', 'Stat', 'Special', 'Price', 'XP'
]

