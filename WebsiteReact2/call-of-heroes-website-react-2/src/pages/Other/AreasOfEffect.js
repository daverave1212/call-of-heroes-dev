import React, { useState } from 'react'

import areasOfEffect from '../../databases/Rules/AreasOfEffect.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'



export default function AreasOfEffect() {

    const sectionNames = Object.keys(areasOfEffect)

    const imgStyle = {
        width: '100%',
        display: 'block',
        marginBottom: '40px'
    }

    return (
        <Page title="Areas of Effect (AoE)">
            
            <PageH3>Distance</PageH3>
            <p>{areasOfEffect.Distance}</p>

            <PageH3>Area of Effect Distance</PageH3>
            <p>{areasOfEffect['Area of Effect Distance']}</p>

            <img style={imgStyle} src="/Rules/AoERange.png"/>

            <PageH3>Line</PageH3>
            <p>{areasOfEffect.Line}</p>

            <img style={imgStyle} src="/Rules/AoELine.png"/>

            <PageH3>Cone</PageH3>
            <p>{areasOfEffect.Cone}</p>

            <img style={imgStyle} src="/Rules/AoECones1.png"/>
            <img style={imgStyle} src="/Rules/AoECones2.png"/>
            <img style={imgStyle} src="/Rules/AoECones3.png"/>
            <img style={imgStyle} src="/Rules/AoECones4.png"/>
            
        </Page>
    )

}