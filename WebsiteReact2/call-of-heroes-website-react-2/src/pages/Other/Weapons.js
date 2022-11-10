import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import weapons from '../../databases/Weapons.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'

export default function Weapons() {

    console.log(Object.keys(weapons))

    const categories = Object.keys(weapons).filter(name => name != 'default')

    console.log({categories})

    return (
        <div>

            { categories.map(categoryName => (
                <div className='page' key={categoryName}>
                    <PageH1>{categoryName}</PageH1>
                    <ManyBoxes type='weapon' objects={ U.spellsFromObject(weapons[categoryName]) }/>
                </div>
            )) }

        </div>
    )
}