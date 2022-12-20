import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import animals from '../../databases/Animals.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import TableNormal from '../../components/TableNormal/TableNormal'

export default function PetsAndAnimals() {

    const categoryNames = Object.keys(animals)
    console.log({categoryNames})

    function PetAnimalTable({categoryName}) {
        const animalNames = Object.keys(animals[categoryName])
        return (
            <TableNormal columns={[categoryName]}>
                { animalNames.map(name => (
                    <tr key={name}>
                        <td>{name}</td>
                    </tr>
                ))}
            </TableNormal>
        )
    }

    return (
        <Page title="Pets and Animals">
            { categoryNames.map(categoryName => (
                <PetAnimalTable key={categoryName} categoryName={categoryName}/>
            )) }
        </Page>
    )
}