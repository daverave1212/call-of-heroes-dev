import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import * as U from '../../utils'

import animals from '../../databases/Animals.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import TableNormal from '../../components/TableNormal/TableNormal'
import ThreeColumns from '../../components/TwoColumns/ThreeColumns'
import Column from '../../components/TwoColumns/Column'
import { TDBullet, TDSleek1, TDSleek2, TDSleek3, TDSleekBox } from '../../components/TableNormal/TDSleek'

export default function PetsAndAnimals() {

    function getMaybeRequiredLevelText(animalName, categoryName) {
        const requirement = animals[categoryName][animalName]['Druid Requirement']
        if (requirement == null)
            return <span></span>
        return <span style={{color: '#AAAAAA'}}> ({requirement})</span>

    }

    function PetAnimalTable({categoryName}) {
        const animalNames = Object.keys(animals[categoryName])
        return (
            <div>
                <TDSleek2>{categoryName}</TDSleek2>
                { animalNames.map(name => (
                    <TDSleek3 key={name}>
                        <TDBullet/>
                        <Link to={`/Other/PetOrAnimal#${name}`}>{name}{getMaybeRequiredLevelText(name, categoryName)}</Link>
                    </TDSleek3>
                ))}
            </div>
        )
    }

    return (
        <Page title="Pets and Animals">
            <TDSleekBox>
                <ThreeColumns>
                    <Column>
                        <TDSleek1>Animals</TDSleek1>
                        <PetAnimalTable categoryName="Standard Animals"/>
                        <PetAnimalTable categoryName="Exotic Pets"/>
                    </Column>
                    <Column>
                        <TDSleek1>Other</TDSleek1>
                        <PetAnimalTable categoryName="Druid Special"/>
                        <PetAnimalTable categoryName="Constructs"/>
                    </Column>
                    <Column>
                        <TDSleek1>People</TDSleek1>
                        <PetAnimalTable categoryName="Squires"/>
                    </Column>
                </ThreeColumns>
            </TDSleekBox>
        </Page>
    )
}