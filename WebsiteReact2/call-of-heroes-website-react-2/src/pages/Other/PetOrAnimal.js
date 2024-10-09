import React from 'react'

import { useState } from 'react'

import * as U from '../../utils'

import animals from '../../databases/Animals.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import TableNormal from '../../components/TableNormal/TableNormal'
import { useLocation } from 'react-router-dom'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import TwoColumnsDescriptive from '../../components/TwoColumns/TwoColumnsDescriptive'
import Column from '../../components/TwoColumns/Column'
import SmallStat from '../../components/SmallStat/SmallStat'
import Icon from '../../components/Icon'
import Separator from '../../components/Separator/Separator'
import LandingPageSeparator from '../../components/LandingPageSeparator/LandingPageSeparator'
import MonsterAbility from '../../components/MonsterAbility/MonsterAbility'
import Spell from '../../components/Spell/Spell'


export function PetOrAnimalTopSide({animal}) {
    return (
        <div>
            { animal.Description != null? (
                <p>{animal.Description}</p>
            ) : (
                <p>
                    Lorem ipsum dolor sit amet.
                    Aenean blandit metus nisi, non commodo tortor volutpat ut.
                    Aenean suscipit, justo vitae faucibus viverra, lectus lacus laoreet ipsum, quis suscipit purus ex et tellus. Suspendisse congue libero sed molestie efficitur. Proin maximus sagittis nunc lacinia porttitor.
                    Maecenas fermentum lacinia mi, a elementum nibh tristique at. In eget nisl nunc.
                </p>
            ) }
            { animal.Alternatives && (
                <div style={{color: 'gray', fontStyle: 'italic' }}>
                    Alternatives: { animal.Alternatives }
                    <br/>
                    <br/>
                    <br/>
                </div>
            ) }
        </div>
    )
}
export function PetOrAnimalStats({animal}) {

    const animalStats    = U.getMonsterStatsAsObject(animal.Stats)
    const statValueStyle = { textAlign: 'center' }
    const statNameStyle  = { textAlign: 'center' }

    return <div>
        <div className='with-margined-children'>
            <SmallStat nameStyle={statNameStyle} valueStyle={statValueStyle} name="Health">{animal.Health}<Icon name="Health" type="small-stat"/></SmallStat>
            <SmallStat nameStyle={statNameStyle} valueStyle={statValueStyle} name="Defense">{animal.Defense}<Icon name="Defense" type="small-stat"/></SmallStat>
            <SmallStat nameStyle={statNameStyle} valueStyle={statValueStyle} name="Speed">{animal.Speed}</SmallStat>
            { animal.Initiative != null && (<SmallStat nameStyle={statNameStyle} valueStyle={statValueStyle} name="Initiative">{animal.Initiative}</SmallStat>) }
        </div>

        { animal.Druid != null && (
            <SmallStat type="vertical" name="Druid Extras">{animal.Druid}</SmallStat>
        ) }

        <Separator/>
        <div style={{display: 'flex', justifyContent: 'space-around', gap: '10px'}}>
            { animalStats.map(nameValue => (
                <SmallStat style={{width: '19%'}} contentStyle={{width: '100%', textAlign: 'center'}} name={nameValue.name} type="vertical" key={nameValue.name}>{nameValue.value}</SmallStat>
            )) }
        </div>
        <Separator/>
    </div>
}
export function PetOrAnimalAbilities({animal}) {
    if (animal.Abilities == null) {
        return <div></div>
    }
    console.log(animal.Abilities)
    const abilities = U.spellsFromObject(animal.Abilities)
    return <div>
        { abilities.map(ability => (
            <Spell spell={ability} hasIcon={false} hasBorder={false} key={ability.Name}/>
        )) }
    </div>
}

export function PetOrAnimalBlock({animal}) {

    return (
        <div className='monster'>
            <TwoColumns type='lefty'>
                <Column>
                    <PetOrAnimalTopSide animal={animal}/>
                </Column>
                <Column>
                    {}
                </Column>
            </TwoColumns>
            <TwoColumns type='lefty'>
                <Column>
                    <PetOrAnimalStats animal={animal}/>
                </Column>
                <Column>
                    {}
                </Column>
            </TwoColumns>
            
            <TwoColumns type='lefty'>
                <Column>
                    <PetOrAnimalAbilities animal={animal}/>
                </Column>
                <Column style={{position: 'relative'}}>

                </Column>
            </TwoColumns>
        </div>
    )
}

export function PetOrAnimalLeftOnly({animal}) {
    return <div className='monster'>
        <PageH2 style={{marginTop: '0px'}}>{ animal.Name }</PageH2>
        { animal.Description != null && (<p>{ animal.Description }</p>)}
        <PetOrAnimalStats animal={animal}/>
        <PetOrAnimalAbilities animal={animal}/>
    </div>
}

export default function PetOrAnimal() {

    const location = useLocation()
    const animalName = U.getPageHashFromLocation(location)

    console.log(animalName)
    console.log({animals})

    let animal = null
    for (const category of Object.keys(animals)) {
        console.log(`Category: ${category}...${animals[category][animalName]}`)
        console.log(animals[category])
        console.log(animals[category][animalName])
        if (animals[category][animalName] != null) {
            animal = animals[category][animalName]
            break
        }
    }
    if (animal == null) {
        return (
            <Page title={`${animalName} Not Found`}></Page>
        )
    }

    return (
        <Page title={animalName}>
            <PetOrAnimalBlock animal={animal}/>
        </Page>
    )
}
