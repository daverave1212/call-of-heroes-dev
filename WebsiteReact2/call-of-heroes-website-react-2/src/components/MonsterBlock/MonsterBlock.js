import * as U from '../../utils.js'
import MonsterCalculations from '../../databases/MonsterCalculations.json'
import Page from '../../containers/Page/Page'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import SmallStat from '../SmallStat/SmallStat'
import Separator from '../Separator/Separator'
import MonsterAbility from '../MonsterAbility/MonsterAbility'
import Icon from '../Icon'
import CopySpellButton from '../CopyButton/CopySpellButton.js'
import PageH0 from '../PageH0/PageH0.js'
import PageH1 from '../PageH1/PageH1.js'

export default function MonsterBlock({monsterName, monster, isPreview}) {

    if (monsterName == null) {
        monsterName = monster.Name
    }
    if (isPreview !== true) {
        isPreview = false
    }

    const monsterStats   = U.getMonsterStatsAsObject(monster.Stats)
    const statOtherColor = 'rgb(55, 10, 85)'

    const IsCondensedLeft = monster.IsCondensedLeft == true
    const upperPartTwoColumnsType = IsCondensedLeft? 'lefty' : 'normal'

    const monsterSubtitle = monster.Type +
        (monster.Role != null? `, ${monster.Role}`: '')

    let monsterHealth = monster.Health
    if (monster.HPCoef != null) {
        const isEpic = monster.Degree != null && monster.Degree.includes('Epic')
        const maybeEpicMultiplier = isEpic == false? 1 : U.extractXPMultiplierFromText(monster.Experience)
        const monsterXPBase = U.extractBaseXPFromText(monster.Experience)
        const monsterXPToSearch = isEpic == false? monsterXPBase : monsterXPBase / maybeEpicMultiplier
        const baseHPForThisXP = MonsterCalculations.Calculations.XPToHPTable['' + monsterXPToSearch]
        if (baseHPForThisXP == null) { 
            throw `Could not find XP ${monsterXPToSearch} in calculations table`
        }
        const hpCoefMultiplier = parseFloat(monster.HPCoef)
        const hpPenaltyPerDefense = MonsterCalculations.Calculations.HPPenaltyPercentPer1Defense / 100
        const defenseMultiplier = (monster.Armor == null || monster.Armor == 0) ?
            1 :
            (1 - U.extractDefenseFromMonsterArmor(monster.Armor) * hpPenaltyPerDefense)
        
        monsterHealth = Math.floor(baseHPForThisXP * defenseMultiplier * hpCoefMultiplier * maybeEpicMultiplier)
        if (monsterHealth % 10 == 4 || monsterHealth % 10 == 9) {
            monsterHealth += 1
        } else if (monsterHealth % 10 == 6 || monsterHealth % 10 == 1) {
            monsterHealth -= 1
        }
        if (monsterHealth <= 0)
            monsterHealth = 1
    }

    function MonsterLore() {
        return monster.Lore != null? (
            <p>{monster.Lore}</p>
        ) : (
            <p>
                Lorem ipsum dolor sit amet.
                Aenean blandit metus nisi, non commodo tortor volutpat ut.
                Aenean suscipit, justo vitae faucibus viverra, lectus lacus laoreet ipsum, quis suscipit purus ex et tellus. Suspendisse congue libero sed molestie efficitur. Proin maximus sagittis nunc lacinia porttitor.
                Maecenas fermentum lacinia mi, a elementum nibh tristique at. In eget nisl nunc.
            </p>
        )
    }

    return (
        <div subtitle={monsterSubtitle} id={`Monster-Block_${monsterName}`}>
            { !isPreview && (
                <PageH1>{monsterName}</PageH1>
            ) }
            { !isPreview && (
                <TwoColumns type='lefty'>
                    <Column>
                        { IsCondensedLeft ? (
                            <TwoColumns type="lefty">
                                <Column>
                                    <MonsterLore/>
                                </Column>
                                <Column></Column>
                            </TwoColumns>
                        ) : (
                            <MonsterLore/>
                        )}
                    </Column>
                    <Column>
                        {}
                    </Column>
                </TwoColumns>
            )}
            
            <TwoColumns type='lefty'>
                <Column>
                    <TwoColumns className="two-columns--half-padding" type={upperPartTwoColumnsType}>
                        <Column>
                            <div className='with-margined-children'>
                                <SmallStat type="large" name="Health">{monsterHealth}<Icon name="Health" type="small-stat"/></SmallStat>
                                { monster.Armor != '0' && monster.Armor != null && (<SmallStat type="large" name="Defense">{monster.Armor}<Icon name="Defense" type="small-stat"/></SmallStat>) }
                                <SmallStat type="large" name="Speed">{monster.Speed}</SmallStat>
                                <SmallStat type="vertical-large" name="Initiative">{monster.Initiative}</SmallStat>
                                { IsCondensedLeft && <SmallStat color={statOtherColor} type="large" name="XP">{monster.Experience}</SmallStat> }
                                { IsCondensedLeft && monster.Degree != 'Normal' && monster.Degree != null && (<SmallStat color={statOtherColor} type="large" name="Degree">{monster.Degree != null? monster.Degree : 'Normal'}</SmallStat>) }

                            </div>
                        </Column>
                        <Column>
                            {
                                IsCondensedLeft == false && (
                                    <div className='with-margined-children'>
                                        <SmallStat color={statOtherColor} type="large" name="XP">{monster.Experience}</SmallStat>
                                        { monster.Degree != 'Normal' && monster.Degree != null && (<SmallStat color={statOtherColor} type="large" name="Degree">{monster.Degree != null? monster.Degree : 'Normal'}</SmallStat>) }
                                    </div>
                                )
                            }
                        </Column>
                    </TwoColumns>


                    <Separator/>
                    <div style={{display: 'flex', justifyContent: 'space-around', gap: '10px'}}>
                        { monsterStats.map(nameValue => (
                            <SmallStat style={{width: '19%'}} name={nameValue.name} type="vertical-large">{nameValue.value}</SmallStat>
                        )) }
                    </div>
                    <Separator/>
                </Column>
                <Column>
                    {}
                </Column>
            </TwoColumns>
            
            <TwoColumns type='lefty'>
                <Column>
                    <div>
                        { (monster.Abilities == null || monster.Abilities == 'None') ? (
                            <div></div>
                        ) : (monster.Abilities.length >= 2) ? (
                            <div>
                                <TwoColumns className="two-columns--quarter-padding">
                                    <Column>
                                        <MonsterAbility ability={monster.Abilities[0]} key={0}/>
                                        { monster.Abilities.length >= 3 && (<MonsterAbility ability={monster.Abilities[2]} key={2}/>) }
                                    </Column>
                                    <Column>
                                        <MonsterAbility ability={monster.Abilities[1]} key={1}/>
                                        { monster.Abilities.length >= 4 && (<MonsterAbility ability={monster.Abilities[3]} key={3}/>) }
                                    </Column>
                                </TwoColumns>
                            </div>
                        ) : (
                            monster.Abilities.map((ability, i) => (
                                <MonsterAbility ability={ability} key={i}/>
                            ))
                        )}
                    </div>

                    <div>
                        { monster.Passives != null && monster.Passives.map((ability, i) => (
                            <MonsterAbility ability={ability} key={i} isPassive={true}/>
                        )) }
                    </div>
                </Column>
                <Column style={{position: 'relative'}}>
                    { monster.Variants != null && (
                        <div className='monster-variants'>{monster.Variants}</div>
                    ) }
                    { monster.Behavior != null && (<p>{monster.Behavior}</p>) }
                    { monster.Pair != null && (<p>{monster.Pair}</p>) }
                    { monster['Suggested Obstacles'] != null && monster['Suggested Obstacles'] != 'None' && (
                        <div>
                            Suggested obstacles:
                            <ul>
                                { Array.isArray(monster['Suggested Obstacles']) ?
                                    monster['Suggested Obstacles'].map(text => (<li>{text}</li>)) :
                                    <li>{ monster['Suggested Obstacles'] }</li>
                                }
                            </ul>
                        </div>
                    ) }
                    { monster['Story Ideas'] != null && (
                        <div className='monster-story-ideas'>{ monster['Story Ideas'] }</div>
                    ) }
                </Column>
            </TwoColumns>
            <CopySpellButton elementId={`Monster-Block_${monsterName}`}/>
        </div>
    )
}