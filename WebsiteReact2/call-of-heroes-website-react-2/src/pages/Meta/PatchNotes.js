import React, { useState } from 'react'
import PageH2 from '../../components/PageH2/PageH2'
import PageH3 from '../../components/PageH3/PageH3'
import Page from '../../containers/Page/Page'

import patchNotes from '../../databases/Other/PatchNotes.json'
import { def, getOnlyProp, isNumber, isObject, isString } from '../../utils'


export default function PatchNotes() {

    const updateNames = Object.keys(patchNotes)

    return (
        <div>
            { updateNames.map(updateName => {
                const updateObj = patchNotes[updateName]
                const subtitles = Object.keys(updateObj)
                console.log({updateName})
                return (
                    <Page title={updateName}>
                        { subtitles.map(subtitle => {
                            const subObj = updateObj[subtitle]
                            if (isString(subObj)) {
                                return (
                                    <div>
                                        <PageH3>{ subtitle }</PageH3>
                                        <p>{ subObj }</p>
                                    </div>
                                )
                            } else if (Array.isArray(subObj)) {
                                return (
                                    <div>
                                        <PageH3>{ subtitle }</PageH3>
                                        <ul>
                                            { subObj.map(listItem => (
                                                (isString(listItem) || isNumber(listItem)) ?
                                                    (<li>{listItem}</li>) :
                                                    (isObject(listItem) && listItem != null) ?
                                                        (
                                                            <li>
                                                                <p style={{fontWeight: 'bold'}}>{ getOnlyProp(listItem) }</p>
                                                                <ul>
                                                                    { def(listItem[getOnlyProp(listItem)], objValue => (
                                                                        Array.isArray(objValue) ?
                                                                            (objValue.map(val => <li>{val}</li>)) :
                                                                            (objValue)
                                                                    )) }
                                                                </ul>
                                                            </li>
                                                        ) : 
                                                        ('Hm...')
                                            )) }
                                        </ul>
                                    </div>
                                )
                            } else {
                                return <p>?</p>
                            }
                        }) }
                    </Page>)
            }) }
        </div>
    )

}