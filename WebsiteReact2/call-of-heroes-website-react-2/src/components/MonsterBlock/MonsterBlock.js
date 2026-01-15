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
import { getMonsterStatsAsObject } from '../../services/game-lib/stat-calculations.js'
import PageH3 from '../PageH3/PageH3.js'
import PageH2 from '../PageH2/PageH2.js'
import { useState } from 'react'

export default function MonsterBlock({monsterName, monster, isPreview}) {

    if (monsterName == null) {
        monsterName = monster.Name
    }
    if (isPreview !== true) {
        isPreview = false
    }

    const monsterTotalXPOriginal = U.getMonsterTotalXP(monster)
    const [monsterTotalXP, setMonsterTotalXP] = useState(monsterTotalXPOriginal)
    const didModifyXP = monsterTotalXP != monsterTotalXPOriginal

    const abilities = monster.Abilities.filter(a => U.getOnlyValue(a)?.IsUltimate != true)
    const ultimateAbilities = monster?.Abilities?.filter(a => U.getOnlyValue(a)?.IsUltimate)

    const monsterStats   = getMonsterStatsAsObject(monster.Stats)
    const statOtherColor = 'rgb(55, 10, 85)'

    const IsCondensedLeft = monster.IsCondensedLeft == true
    const upperPartTwoColumnsType = IsCondensedLeft? 'lefty' : 'normal'

    const setback = calculateMonsterSetback(monster.Initiative)
    const hpPenaltyPer1DefenseCoef = MonsterCalculations.Calculations.HPPenaltyPercentPer1Defense / 100
    const hpPenaltyCoefDueToDefense = U.isNumber(monster.Defense)? (1 - hpPenaltyPer1DefenseCoef * monster.Defense): 1
    const isEpic = U.isMonsterEpic(monster)
    const howManyMonstersIsItWorth = isEpic? U.calculateHowManyMonstersThisEpicIsWorth(monster): 1
    const baseXPForOneMonster = roundToNearest25(monsterTotalXP / howManyMonstersIsItWorth)

    
    
    const monsterSubtitle = monster.Type + (monster.Role != null? `, ${monster.Role}`: '')

    let monsterHealth = monster.Health
    if (monster.HPCoef != null) {
        if (isEpic) {
            const baseHealthForThatXP = MonsterCalculations.Calculations.XPToHPTable[baseXPForOneMonster]
            const epicHPCoef = MonsterCalculations.Calculations.EpicHPMultiplierByActionPoints[monster.Degree]
            monsterHealth = Math.floor(baseHealthForThatXP * epicHPCoef * monster.HPCoef)
            console.log({monsterTotalXP, baseHealthForThatXP, epicHPCoef, monsterHealth})
        } else {
            const baseHPForThisXP = MonsterCalculations.Calculations.XPToHPTable['' + monsterTotalXP]
            if (baseHPForThisXP == null) { 
                throw `Could not find XP ${monsterTotalXP} in calculations table`
            }
            const hpCoefMultiplier = parseFloat(monster.HPCoef)
            
            monsterHealth = Math.floor(baseHPForThisXP * hpCoefMultiplier * hpPenaltyCoefDueToDefense)  // * maybeEpicMultiplier
        }
        if (monsterHealth > 30 && !didModifyXP) {
            monsterHealth = U.roundToNearest(monsterHealth, 5)
        }
        if (monsterHealth <= 0)
            monsterHealth = 1
    }

    const maybeElderStyle = monsterName != 'Elder'? {}: { fontFamily: 'UnknownFont'}


    function scaleUp() {
        console.log('Upscaling')
        setMonsterTotalXP(roundToNearest25(monsterTotalXP + 25 * howManyMonstersIsItWorth))
    }
    function scaleDown() {
        if (monsterTotalXP <= 0) {
            return
        }
        console.log('DOwnscaling')
        setMonsterTotalXP(roundToNearest25(monsterTotalXP - 25 * howManyMonstersIsItWorth))
    }


    function MonsterLore() {
        return (
            <div className='margin-bottom-1'>
                {
                    monster.Lore != null? (
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
            </div>
        )
    }

    return (
        <div subtitle={monsterSubtitle} id={`Monster-Block_${monsterName}`} style={maybeElderStyle}>
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
                    { isEpic && <PageH2 hasMargin={false} className="center-text" style={{marginBottom: '0.75rem'}}>EPIC Monster</PageH2>}
                    <TwoColumns className="two-columns--half-padding" type={upperPartTwoColumnsType}>
                        <Column>
                            <div className='with-margined-children'>
                                <SmallStat className="row large" name="Health">{monsterHealth}<Icon name="Health" type="small-stat"/></SmallStat>
                                { monster.Armor != '0' && monster.Armor != null && (<SmallStat className="row large" name="Defense">{monster.Armor}<Icon name="Defense" type="small-stat"/></SmallStat>) }
                                <SmallStat className="row large" name="Speed">{monster.Speed} meters</SmallStat>
                                {/* <SmallStat className="column large center-text" name="Initiative">{monster.Initiative}</SmallStat> */}
                                { setback != null && <SmallStat className="column large center-text" name="Setback">{setback}</SmallStat>}
                                { IsCondensedLeft && <SmallStat color={statOtherColor} className="row large" name="XP">{monsterTotalXP}</SmallStat> }
                                {/* { IsCondensedLeft && monster.Degree != 'Normal' && monster.Degree != null && (<SmallStat color={statOtherColor} className="row large" name="Degree">{monster.Degree != null? monster.Degree : 'Normal'}</SmallStat>) } */}
                                { IsCondensedLeft && monster.Degree != 'Normal' && monster.Degree != null && (<SmallStat color={statOtherColor} className="row large" name="Action Points">{monster.Degree != null? monster.Degree : '3'}</SmallStat>) }

                            </div>
                        </Column>
                        <Column>
                            {
                                IsCondensedLeft == false && (
                                    <div className='with-margined-children'>
                                        <SmallStat color={statOtherColor} className="row large" name="XP">{monsterTotalXP}{isEpic && ` (${baseXPForOneMonster} x${howManyMonstersIsItWorth})`}</SmallStat>
                                        {/* { monster.Degree != 'Normal' && monster.Degree != null && (<SmallStat color={statOtherColor} className="row large" name="Degree">{monster.Degree != null? monster.Degree : 'Normal'}</SmallStat>) } */}
                                        { monster.Degree != 'Normal' && monster.Degree != null && (<SmallStat color={statOtherColor} className="row large" name="Action Points">{monster.Degree != null? monster.Degree : '3'}</SmallStat>) }
                                        <div className='flex row' style={{gap: '5%'}}>
                                            <button style={{backgroundColor: 'var(--theme-color-1-darker)', width: '50%'}} onClick={scaleDown}><Icon name="Premium" style={{marginTop: '4px'}}/> Downscale</button>
                                            <button style={{backgroundColor: 'var(--theme-color-1-darker)', width: '45%'}} onClick={scaleUp}><Icon name="Premium" style={{marginTop: '4px'}}/> Upscale</button>
                                        </div>
                                    </div>
                                )
                            }
                        </Column>
                    </TwoColumns>


                    <Separator/>
                    <div style={{display: 'flex', justifyContent: 'space-around', gap: '10px'}}>
                        { monsterStats.map(nameValue => (
                            <SmallStat style={{width: '19%'}} key={nameValue.name} name={nameValue.name} className="column large center-text">{nameValue.value}</SmallStat>
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
                        { (abilities == null || abilities == 'None') ? (
                            <div></div>
                        ) : (abilities.length >= 2) ? (
                            <div>
                                <TwoColumns className="two-columns--quarter-padding">
                                    <Column>
                                        <MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={abilities[0]} key={0} style={maybeElderStyle}/>
                                        { abilities.length >= 3 && (<MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={abilities[2]} key={2} style={maybeElderStyle}/>) }
                                        { abilities.length >= 5 && (<MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={abilities[4]} key={4} style={maybeElderStyle}/>) }
                                    </Column>
                                    <Column>
                                        <MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={abilities[1]} key={1} style={maybeElderStyle}/>
                                        { abilities.length >= 4 && (<MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={abilities[3]} key={3} style={maybeElderStyle}/>) }
                                        { abilities.length >= 6 && (<MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={abilities[5]} key={5} style={maybeElderStyle}/>) }
                                    </Column>
                                </TwoColumns>
                                { ultimateAbilities.map((ability, i) => (
                                    <MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={ability} key={'u-' + i} style={maybeElderStyle}/>
                                )) }
                            </div>
                        ) : (
                            abilities.map((ability, i) => (
                                <MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={ability} key={i} style={maybeElderStyle}/>
                            ))
                        )}
                    </div>

                    <div>
                        { monster.Passives != null && monster.Passives.map((ability, i) => (
                            <MonsterAbility monster={monster} monsterXP={monsterTotalXP} ability={ability} key={i} isPassive={true} style={maybeElderStyle}/>
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

function calculateMonsterSetback(initiative) {

    function getSetbackFromInitiativeNumber(number) {
        number = parseInt(number)
        const clampedInitiative = Math.min(Math.max(number, 0), 10);
        const reverseInitiative = 10 - clampedInitiative
        const setback = Math.floor(reverseInitiative / 2)
        return setback
    }
    window.getSetbackFromInitiativeNumber = getSetbackFromInitiativeNumber


    if (initiative == null) {
        return 99
    }
    
    const parts = U.splitByNumbers((initiative + '').trim())
    const parsedParts = parts.map(part => U.isNumber(part)? getSetbackFromInitiativeNumber(part): part)
    return parsedParts.join(' ')

}


// 1 Unit AP per combat: 6 Action Points
// 1 Unit AP / Combat = 2

// 1 Unit Damage AP / combat: 2 AP (gets only 1 turn)
// 2 Unit Damage AP / combat: 2 AP | 2 AP + 1 AP (2nd Unit gets 1.5 turns)
// 3 Unit Damage AP / combat: 2 AP | 2 AP + 1 AP | 2 AP + 2 AP (3rd Unit gets 2 turns)
// 4 Unit Damage AP / combat: 2 AP | 2 AP + 1 AP | 2 AP + 2 AP | 2 AP + 3 AP

//   Effective AP / combat
// 1 Damage AP / combat: 1 AP (gets only 1 turn)
// 2 Damage AP / combat: 1 AP | 1 + 0.5 AP = 2.5 AP
// 3 Damage AP / combat: 1 AP | 1 + 0.5 AP | 1 + 1 AP = 4.5
// 4 Damage AP / combat: 1 AP | 1 + 0.5 AP | 1 + 1 AP | 1 + 1.5 AP = 7
// 5 Damage AP / combat: 1 AP | 1 + 0.5 AP | 1 + 1 AP | 1 + 1.5 AP | 1 + 2 AP = 10

//   Additive AP / epic monster combat (one 2 AP monster will make 2.5 AP per combat)
// 1 Damage AP / combat: 1 AP * 1 = 1 AP
// 2 Damage AP / combat: (1 + 0.5 AP) * 2 = 3 AP
// 3 Damage AP / combat: (1 + 1 AP) * 3 = 6 AP
// 4 Damage AP / combat: (1 + 1.5 AP) * 4 = 10 AP

// Jesus don't ask why... it just kind of works
function singleDamageAPToAPPerCombat(ap) {
  return (1 + (ap) / 2) * (ap - 1) + 0.5
}
window.singleDamageAPToAPPerCombat = singleDamageAPToAPPerCombat

function multipleDamageAPToAPPerCombat(ap) {
  let total = 0
  for (let i = 1; i <= ap; i++) {
    total += 1 + (i - 1) / 2
  }
  return total
}
window.multipleDamageAPToAPPerCombat = multipleDamageAPToAPPerCombat

function getNormalHealthPerAP(xp) {
  return MonsterCalculations.Calculations.XPToHPTable[xp] / 2
}
window.getNormalHealthPerAP = getNormalHealthPerAP

function getEpicMonsterHPRatio(nActionPoints) {
  const damageActionPoints = nActionPoints - 1
  const accurateAPPerCombatIfSpreadBetweenMultipleUnits = multipleDamageAPToAPPerCombat(damageActionPoints)
  const apPerCombatIfItWereJust1Unit = singleDamageAPToAPPerCombat(damageActionPoints)
  const hpRatio = accurateAPPerCombatIfSpreadBetweenMultipleUnits / apPerCombatIfItWereJust1Unit
  return hpRatio
}
window.getEpicMonsterHPRatio = getEpicMonsterHPRatio

function roundDownTo25(n) {
  return Math.floor(n / 25) * 25;
}
function roundToNearest25(n) {
  return Math.round(n / 25) * 25;
}

function getEpicMonsterBaseHP(xp, actionPoints) {
    const damageActionPoints = actionPoints - 1
    const howManyUnitsTheEpicMonsterIsWorth = damageActionPoints / 2
    const howMuch1UnitWouldBeWorthInXP = roundToNearest25(xp / howManyUnitsTheEpicMonsterIsWorth)
    
    const normalUnitHPPerAP = getNormalHealthPerAP(howMuch1UnitWouldBeWorthInXP)
    const normalTotalUnitHP = damageActionPoints * normalUnitHPPerAP
    
    const epicMonsterHealthRatio = getEpicMonsterHPRatio(actionPoints)
    return normalTotalUnitHP * epicMonsterHealthRatio

}
window.getEpicMonsterBaseHP = getEpicMonsterBaseHP