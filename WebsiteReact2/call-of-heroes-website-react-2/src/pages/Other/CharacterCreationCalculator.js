import React, { useEffect, useState } from 'react'

import './CharacterCreation.css'

import { Races, Classes } from '../Other/AllRacesAndClasses'
import Backgrounds from '../../databases/Backgrounds.json'

import abilities from '../../databases/Abilities.json'
import overallData from '../../databases/OverallData.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'

import cc from '../../databases/Rules/CharacterCreation.json'
import PageH3 from '../../components/PageH3/PageH3'
import PageH2 from '../../components/PageH2/PageH2'
import SmallStat from '../../components/SmallStat/SmallStat'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'
import Separator from '../../components/Separator/Separator'
import { asIntOr, formValueIntOr, isFormValueInt, isFormValueNumeric, isNumeric, isStringNumeric, removeTildes, stringToIntOr, styleMargined } from '../../utils'
import ManySmallStats from '../../components/SmallStat/ManySmallStats'
import SmallStatList from '../../components/SmallStat/SmallStatList'
import Icon from '../../components/Icon'
import Page from '../../containers/Page/Page'


export default function CharacterCreationCalculator() {


    let [state, setState] = useState({
        Race: 'Bertle',
        Class: 'Cleric',
        Background: 'Acolyte',

        'Main Stat': 'Wisdom',

        Level: '1',

        Might: '0',
        Dexterity: '0',
        Intelligence: '0',
        Wisdom: '0',
        Charisma: '0'
    })

    const raceObj  = Races[state.Race]
    const classObj = Classes[state.Class]
    const backgroundObj = Backgrounds[state.Background]

    const updateStateFromFormElemStat = (evt, fieldName) => {
        const oldValue = state[fieldName]
        const newValue = evt.target.value
        const value = formValueIntOr(newValue, oldValue)

        const newState = {...state}
        newState[fieldName] = value
        setState(newState)
    }
    const updateStateFromSelect = evt => {
        const statName = evt.target.name
        const newState = {...state}
        newState[statName] = evt.target.value
        console.log({newState})
        setState(newState)
    }

    function StatInput({name}) {
        return (
            <SmallStat name={name} topDown={true}>
                <input className='cc-input' name={name} value={state[name]} onChange={evt => updateStateFromFormElemStat(evt, name)}></input>
            </SmallStat>
        )
    }

    function checkStatDistributionValid() { // Returns true if valid; otherwise, returns an error message
        const mig = parseInt(state.Might)
        const dex = parseInt(state.Dexterity)
        const int = parseInt(state.Intelligence)
        const wis = parseInt(state.Wisdom)
        const cha = parseInt(state.Charisma)

        const isStatLowest  = stat => stat <= mig && stat <= dex && stat <= int && stat <= wis && stat <= cha
        const isStatHighest = stat => stat >= mig && stat >= dex && stat >= int && stat >= wis && stat >= cha

        switch (state.Race) {
            case 'Bertle':
                if (dex < 2) return `Your Dexterity must be at least 2 (Bertle).`
                break
            case 'Elf':
                if (dex < 1) return `Your Dexterity must be at least 1 (Elf).`
                break
            case 'Dragonborn':
                if (int < 1 || mig < 1) return `Your Might and Intelligence must be at least 1 (Dragonborn).`
                break
            case 'Dwarf':
                if (mig < 1) return `Your Might must be at least 1 (Dwarf).`
                const isDexLowest = isStatLowest(dex)
                const isChaLowest = isStatLowest(cha)
                if (isDexLowest == false && isChaLowest == false)
                    return `Your lowest stat must be either Dexterity or Charisma (Dwarf).`
                break
            case 'Gnome':
                if ((isStatHighest(mig) || isStatLowest(mig)) == false)
                    return `Your Might must be either 3 or -1 (Gnome).`
                break
            case 'Hollow':
                if ((isStatLowest(mig) || isStatLowest(dex)) == false)
                    return `Your lowest stat must be either Might or Dexterity (Hollow).`
                if (wis < 1)
                    return `Your Wisdom must be at least 1 (Hollow).`
                break
            case 'Human':
                return true
            case 'Orc':
                if (mig < 2)
                    return 'Your Might must be at least 2 (Orc).'
                break
        }
        return true
    }

    const statDistributionValidResult = checkStatDistributionValid()

    return (
        <Page title="Character Helper">
            <TwoColumns style={styleMargined}>
                <Column>
                    <label className='cc-label'>Race</label>
                    <select className='cc-select' name="Race" onChange={updateStateFromSelect}>
                        { overallData.Races.map(race => (
                            <option key={race} value={race}>{race}</option>
                        )) }
                    </select>

                    <br/>
                    <br/>
                    <label className='cc-label'>Background</label>
                    <select className='cc-select' name="Background" onChange={updateStateFromSelect}>
                        { overallData.Backgrounds.map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        )) }
                    </select>

                </Column>
                <Column>
                    <label className='cc-label'>Class</label>
                    <select className='cc-select' name="Class" onChange={updateStateFromSelect}>
                        { overallData.Classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                        )) }
                    </select>

                    <br/>
                    <br/>
                    <label className='cc-label'>Level</label>
                    <select className='cc-select' name="Level" onChange={updateStateFromSelect}>
                        { [1,2,3,4,5,6,7,8,9,10].map(level => (
                            <option key={level} value={level}>{level}</option>
                        )) }
                    </select>
                </Column>
            </TwoColumns>

            <div className='character-creation__stats-container'>   {/* These are not written as components because that screws up the rendering due to inputs*/}
                { StatInput({name: 'Might'}) }
                { StatInput({name: 'Dexterity'}) }
                { StatInput({name: 'Intelligence'}) }
                { StatInput({name: 'Wisdom'}) }
                { StatInput({name: 'Charisma'}) }
            </div>

            { statDistributionValidResult != true && (
                <div className='form-error'>
                    {statDistributionValidResult}
                </div>
            )}

            <br/>
            <label className='cc-label'>Main Stat</label>
            <select className='cc-select' name="Main Stat" onChange={updateStateFromSelect}>
                {(_ => {
                    const allStatNames = ['Might', 'Dexterity', 'Intelligence', 'Wisdom', 'Charisma']
                    const statOptions = allStatNames.filter(statName => classObj.Spellcasting['Main Stat'].includes(statName))
                    return statOptions.map(statName => (<option key={statName} value={statName} >{statName}</option>))
                })()}
            </select>

            <Separator/>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>

                        <div>
                            <SmallStat name="Maximum Health">{
                                parseInt(raceObj.Stats['Base Health']) +
                                parseInt(classObj['Base Health']) + 
                                asIntOr(state.Might, 0) +
                                (parseInt(state.Level) - 1) * classObj['Level Up']['Every Level']['Health']
                            }</SmallStat>
                            <i className='stat-notes'>
                                {(_ => {
                                    const raceHealth  = parseInt(raceObj.Stats['Base Health'])
                                    const raceName    = state.Race
                                    const classHealth = parseInt(classObj['Base Health'])
                                    const className   = state.Class

                                    const might       = asIntOr(state.Might, 0)
                                    const plusMinusMight = might < 0? '-' : '+'
                                    const displayedMight = Math.abs(might)

                                    const level       = parseInt(state.Level)
                                    const levelHealth = (level - 1) * parseInt(classObj['Level Up']['Every Level']['Health'])
                                    const displayedLevel = level > 1 ? `+ ${levelHealth} (Level ${level})` : ''

                                    return `${raceHealth} (${raceName}) + ${classHealth} (${className}) ${plusMinusMight} ${displayedMight} (Might) ${displayedLevel}`
                                })()}
                            </i>
                        </div>


                        <SmallStat name="Speed">{raceObj.Stats.Movement}</SmallStat>
                        <SmallStat name="Defense" topDown={true}>Depends on the Armor you choose. You can wear {classObj['Armor Training']} (from {state.Class}). You can also start with an Armor of that type from the Armors list.</SmallStat>

                        <div>
                            <SmallStat name="Initiative">{parseInt(state.Dexterity) + parseInt(state.Charisma)}</SmallStat>
                            <i className='stat-notes'>
                                {(_ => {
                                    const dex = parseInt(state.Dexterity)
                                    const cha = parseInt(state.Charisma)
                                    
                                    return `${dex} (Dexterity) ${cha >= 0? "+" : "-"} ${Math.abs(cha)} (Charisma)`
                                })()}
                            </i>
                        </div>

                        <SmallStat name="Feat">{ classObj.Feats }</SmallStat>

                        
                        <Separator/>


                        <SmallStat name="Spellcasting Type" color="blue">{ classObj.Spellcasting.Type }</SmallStat>

                        <SmallStat name="Counter Check Grade" color="blue">{ parseInt(state[state['Main Stat']]) + 6 }</SmallStat>

                        { classObj.Spellcasting.Type == 'Mana-based' && (
                            <div>
                                <SmallStat name="Mana" color="blue">{
                                    parseInt(classObj.Spellcasting.Mana.Amount) + parseInt(state.Level) - 1
                                }</SmallStat>
                                <i className='stat-notes'>You regain all Mana back when you Long Rest.</i>
                            </div>
                        )}

                        { classObj.Spellcasting.Type == 'Special Mana-based' && (
                            <div>
                                <SmallStat name="Mana" color="blue">{
                                    parseInt(classObj.Spellcasting.Mana.Amount) + (
                                        (parseInt(state.Level) >= 3? 1 : 0) +
                                        (parseInt(state.Level) >= 6? 1 : 0) +
                                        (parseInt(state.Level) >= 9? 1 : 0)
                                    )
                                }</SmallStat>
                                <i className='stat-notes'>Mana instantly replenishes 10 minutes after finishing every combat encounter (if you don't enter another combat meanwhile).</i>
                            </div>
                        )}

                        { classObj.Spellcasting['Known Spells'] != null && (
                            <div>
                                <SmallStat name="Known Spells" color="blue">{
                                    parseInt(classObj.Spellcasting.BaseKnownSpells) + parseInt(state.Intelligence) + parseInt(state.Level) - 1
                                }</SmallStat>
                                <i className='stat-notes'>{
                                    (_ => {
                                        const baseNSpells = parseInt(classObj.Spellcasting.BaseKnownSpells)
                                        const int = parseInt(state.Intelligence)
                                        const level = parseInt(state.Level)
                                        return `${baseNSpells} ${int >= 0? '+' : '-'} ${int} (Intelligence) + ${level} (Level - 1)`
                                    })()
                                }</i>
                            </div>
                        )}

                        <SmallStatList name="Spell Lists" color="blue">{
                            classObj['Spellcasting']['Spell Lists'].map(spellCategory => (
                                <div key={spellCategory}>{ spellCategory }</div>
                            ))
                        }</SmallStatList>
                    </div>
                </Column>
                <Column>
                    <div className='with-margined-children'>
                        <ManySmallStats name="Weapon Training" topDown={true} texts={(_ => {
                            const trainings = []
                            if (backgroundObj.Training != null) {
                                trainings.push(`${backgroundObj.Training} (${state.Background})`)
                            }
                            if (classObj.Weapons != null) {
                                trainings.push(`${classObj.Weapons} (${state.Class})`)
                            }
                            if (raceObj.Weapons != null) {
                                trainings.push(`${raceObj.Weapons} (${state.Race})`)
                            }
                            if (raceObj.Training != null) {
                                const int = parseInt(state.Intelligence)
                                let thisTraining = `${raceObj.Training} (${state.Race})`
                                if (
                                    (state.Race == 'Bertle' && int < 1) ||
                                    (state.Race == 'Dwarf' && int < 1) ||
                                    (state.Race == 'Elf' && int < 1) ||
                                    (state.Race == 'Gnome' && int < 0) ||
                                    (state.Race == 'Orc' && int < 1)
                                ) {
                                    thisTraining = (<span style={{color: '#CCCCCC'}}>{thisTraining}</span>)
                                }
                                trainings.push(thisTraining)
                            }
                            return trainings
                        })()}/>
                        <ManySmallStats name="Proficiencies" topDown={true} texts={(_ => {
                            console.log("ASDASD")
                            const profs = []
                            if (raceObj.Proficiencies != null) {
                                for (const profName of Object.keys(raceObj.Proficiencies)) {
                                    profs.push(`You have ${removeTildes(profName)} (${state.Race})`)
                                }
                            }
                            if (classObj.Proficiencies != null) {
                                for (const profName of Object.keys(classObj.Proficiencies)) {
                                    profs.push(`You have ${removeTildes(profName)} (${state.Class})`)
                                }
                            }
                            if (backgroundObj.Abilities != null) {
                                for (const profName of Object.keys(backgroundObj.Abilities)) {
                                    profs.push(`You have ${removeTildes(profName)} (${state.Background})`)
                                }
                            }

                            if (raceObj['Proficiency Choices'] != null) {
                                const choices = Object.keys(raceObj['Proficiency Choices']).map(choice => removeTildes(choice))
                                profs.push(`Choose one between ${choices.join(', ')} (${state.Race})`)
                            }
                            if (classObj['Proficiency Choices'] != null) {
                                const choices = Object.keys(classObj['Proficiency Choices']).map(choice => removeTildes(choice))
                                profs.push(`Choose one between ${choices.join(', ')} (${state.Class})`)
                            }

                            return profs
                        })()}/>
                        <ManySmallStats name="Languages" color="var(--dark-green)" topDown={true} texts={(_ => {
                            const languages = ['You speak Common.']

                            if (backgroundObj.Language != null) {
                                const thisLanguage = backgroundObj.Language
                                languages.push(thisLanguage)
                            }

                            if (raceObj.Language != null) {
                                const int = parseInt(state.Intelligence)
                                let thisLanguage = raceObj.Language
                                if (
                                    (state.Race == 'Bertle' && int < 2) ||
                                    (state.Race == 'Human' && int < 1) ||
                                    (state.Race == 'Orc' && int < 2)
                                ) {
                                    thisLanguage = (<span style={{color: '#CCCCCC'}}>{thisLanguage}</span>)
                                }
                                languages.push(thisLanguage)
                            }
                        
                            if (classObj.Language != null) {
                                const int = parseInt(state.Intelligence)
                                let thisLanguage = classObj.Language
                                let isAddingThisLanguage = true
                                if (
                                    (state.Class == 'Cleric' && int < 2) ||
                                    (state.Class == 'Hunter' && int < 1) ||
                                    (state.Class == 'Paladin' && int < 2) ||
                                    (state.Class == 'Rogue' && int < 1) ||
                                    (state.Class == 'Shaman' && int < 2) ||
                                    (state.Class == 'Warlock' && int < 2)
                                ) {
                                    thisLanguage = (<span style={{color: '#CCCCCC'}}>{thisLanguage}</span>)
                                } else if (state.Class == 'Druid') {
                                    let [lang1, lang2] = classObj.Language.split('\n')
                                    if (int < 1) {
                                        lang1 = (<span style={{color: '#CCCCCC'}}>{lang1}</span>)
                                    }
                                    if (int < 2) {
                                        lang2 = (<span style={{color: '#CCCCCC'}}>{lang2}</span>)
                                    }
                                    languages.push(lang1)
                                    languages.push(lang2)
                                    isAddingThisLanguage = false
                                } else if (state.Class == 'Mage') {
                                    let [lang1, lang2] = classObj.Language.split('\n')
                                    console.log(classObj.Language)
                                    console.log(classObj.Language.split('\n'))
                                    console.log({lang1})
                                    console.log({lang2})
                                    languages.push(lang1)
                                    if (int < 2) {
                                        lang2 = (<span style={{color: '#CCCCCC'}}>{lang2}</span>)
                                    }
                                    languages.push(lang2)
                                    isAddingThisLanguage = false
                                }
                                if (isAddingThisLanguage) {
                                    languages.push(thisLanguage)
                                }
                            }
                            return languages
                        })()}/>

                        <SmallStat name="Starting Gold" color="var(--dark-green)">{backgroundObj.Money} <Icon name="Gold"/></SmallStat>

                        <ManySmallStats name="Starting Equipment" color="var(--dark-green)" topDown={true} texts={[
                            'You start with one Armor of any Armor type you are Trained in.',
                            'You start with one Weapon of any Weapon you are Trained in.'
                        ]}/>

                    </div>
                </Column>
            </TwoColumns>
            
        </Page>
    )
}