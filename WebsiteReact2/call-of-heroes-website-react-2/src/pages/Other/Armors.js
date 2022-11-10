import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import armors from '../../databases/Armors.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'

export default function Armors() {

    console.log({armors})

    // const armorsArray = U.spellsFromObject(armors)

    const armorCategories = Object.keys(armors).filter(key => key != 'default')

    return (
        <div className='page'>
            {
                armorCategories.map(categoryName => (
                    <div>
                        <PageH1>{categoryName}</PageH1>
                        <ManyBoxes objects={U.spellsFromObject(armors[categoryName])} type='armor'/>
                    </div>
                ))
            }
        </div>
    )
}