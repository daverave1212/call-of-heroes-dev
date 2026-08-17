import classNames from 'classnames';
import { hexColorToRgbVector, getSpellTags, getItemIconPathByName, getSpellIconPathByName } from '../../../utils';
import { SpellTopStats } from './SpellTopStats';
import { IconSpinner } from '../../Other/IconSpinner';

export function ItemTop(params) {

    const { hasVariants, variantIndex, Variants, onIconClick, onIconRightClick, iconPath, hasIcon, DisplayName, Name, showTopStats = true, A, item, spell } = params
    
    if (spell == null) {
        return <div style={{ color: 'red' }}>Error</div>;
    }    
    if (hasIcon === false) {
        return <SpellTop {...params}/>
    }

    const maxVariantIndex = hasVariants ? Variants.length : null;
    const tintColors = spell.TintColor == null ? [] : hexColorToRgbVector(spell.TintColor);
    const parsedKeywords = getSpellTags({ Tags: spell.Tags });

    const IconContent = () => (<>
        <img src={iconPath} className='splash-img' />
        {spell.HasUpgradeIcon === true && (
            <div className='secondary-icon-wrapper absolute'>
                <img src="/Icons/Spells/!UpgradeIcon.png" />
            </div>
        )}
        {spell.MiniIconName != null && (
            <div className='secondary-icon-wrapper absolute' style={{ borderTop: 'solid black 1px', borderLeft: 'solid black 1px' }}>
                <img src={spell.MiniIconType == 'Item' ?
                    getItemIconPathByName(spell.MiniIconName)
                    :
                    getSpellIconPathByName(spell.MiniIconName)} />
            </div>
        )}
        {spell.CustomMiniIconPath != null && (
            <div className='secondary-icon-wrapper absolute' style={{ borderTop: 'solid black 1px', borderLeft: 'solid black 1px' }}>
                <img src={spell.CustomMiniIconPath} />
            </div>
        )}
    </>)
    
    return <div>
        <div className='splash-box'>
            {hasVariants === true && (
                <div className='variant-counter' onClick={onIconClick} onContextMenu={evt => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    onIconRightClick?.();
                }}>
                    {variantIndex + 1}/{maxVariantIndex}
                </div>
            )}
            {hasVariants? (
                <IconSpinner>
                    <IconContent/>
                </IconSpinner>
            ): (
                <IconContent/>
            )}
        </div>
        <div className='flex-1'>
            <div className='title-wrapper'>
                <div className='title text-font'>{DisplayName != null ? DisplayName : Name}</div>
            </div>
            {showTopStats === true && <SpellTopStats keywords={spell.Tags} tags={{ ...spell, A: A == null ? spell.A : A }} />}
        </div>
    </div>

}

export function SpellTop({
    hasVariants, variantIndex, Variants, onIconClick, onIconRightClick, iconPath, hasIcon, DisplayName, Name, showTopStats = true, A, item, spell
}) {
    if (spell == null) {
        return <div style={{ color: 'red' }}>Error</div>;
    }

    const obj = item != null ? item : spell;
    if (hasIcon === false) {
        return (
            <div className='spell-top'>
                <div className='width-100'>
                    <div className='center-content width-100'>
                        <div className='title-wrapper no-icon'>
                            <div className='title text-font'>{Name}</div>
                        </div>
                    </div>
                    <div style={{ width: '70%', margin: 'auto' }}>
                        {showTopStats === true && <SpellTopStats tags={{ ...obj, A }} keywords={spell.Tags} className="spell-top-stats--no-padding-side" />}
                    </div>
                </div>
            </div>
        );
    }

    function SpellTopLeft() {
        const maxVariantIndex = hasVariants ? Variants.length : null;
        const tintColors = spell.TintColor == null ? [] : hexColorToRgbVector(spell.TintColor);
        const parsedKeywords = getSpellTags({ Tags: spell.Tags });
        const talentType = parsedKeywords.some(tag => tag.includes('Keystone')) ?
            'Keystone'
            :
            'Minor';
        const glowColor = talentType == 'Keystone' ?
            'var(--orange-color)'
            :
            '';
        const glowStyle = talentType == 'Minor' ? {} : {
            '--color-1': 'rgba(255 255 255 0)',
            '--color-2': glowColor
        };
        return (
            <div className={`left`}>

                {hasVariants === true && (
                    <div className='variant-counter' onClick={onIconClick} onContextMenu={evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        onIconRightClick?.();
                    }}>
                        {variantIndex + 1}/{maxVariantIndex}
                    </div>
                )}

                <div style={glowStyle} className={classNames('spell-icon-wrapper relative', {
                    'breathing-glow': talentType != 'Minor'
                })}>
                    {hasVariants === true && (
                        <div className='variant-spinner'></div>
                    )}
                    <div className={`spell-img-wrapper ${spell.TintColor == null ? '' : 'tinted-icon-wrapper'}`} style={{ '--tint-rgb': tintColors.join(' ') }}>
                        <img src={iconPath} />
                    </div>
                    {spell.HasUpgradeIcon === true && (
                        <div className='secondary-icon-wrapper absolute'>
                            <img src="/Icons/Spells/!UpgradeIcon.png" />
                        </div>
                    )}
                    {spell.MiniIconName != null && (
                        <div className='secondary-icon-wrapper absolute' style={{ borderTop: 'solid black 1px', borderLeft: 'solid black 1px' }}>
                            <img src={spell.MiniIconType == 'Item' ?
                                getItemIconPathByName(spell.MiniIconName)
                                :
                                getSpellIconPathByName(spell.MiniIconName)} />
                        </div>
                    )}
                    {spell.CustomMiniIconPath != null && (
                        <div className='secondary-icon-wrapper absolute' style={{ borderTop: 'solid black 1px', borderLeft: 'solid black 1px' }}>
                            <img src={spell.CustomMiniIconPath} />
                        </div>
                    )}
                </div>

            </div>
        );
    }

    return (
        <div className='spell-top'>
            <SpellTopLeft
                src={iconPath}
                onIconClick={onIconClick}
                hasSpinner={hasVariants} hasVariants={hasVariants}
                variantIndex={variantIndex} maxVariantIndex={hasVariants ? Variants.length : null}
                hasUpgradeIcon={spell.HasUpgradeIcon} />

            <div className='flex-1'>
                <div className='title-wrapper'>
                    <div className='title text-font'>{DisplayName != null ? DisplayName : Name}</div>
                </div>
                {showTopStats === true && <SpellTopStats keywords={spell.Tags} tags={{ ...obj, A: A == null ? obj.A : A }} />}
            </div>
        </div>
    );
}
