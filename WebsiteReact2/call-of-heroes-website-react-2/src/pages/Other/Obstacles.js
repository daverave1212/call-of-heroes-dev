import React, { useState } from 'react'

import obstacles from '../../databases/Obstacles.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'



export default function Obstacles() {

    const categories = Object.keys(obstacles).filter(c => c != 'default')

    return (
        <Page title="Obstacles">
            { categories.map(categoryName => (
                <div>
                    <PageH3>{categoryName}</PageH3>
                    <p>{obstacles[categoryName]}</p>
                </div>
            ))}
        </Page>
    )

}