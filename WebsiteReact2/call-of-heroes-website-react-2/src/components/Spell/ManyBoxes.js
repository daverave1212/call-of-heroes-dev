import React from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { sortObjectArrayByKey } from '../../utils'
import Item from './Item'

// objects: Array
export default function ManyBoxes({ objects, type }) {

    function Box({ type, object }) {
        type = type.toLowerCase()
        switch (type) {
            case 'spell': return (<Spell spell={object}/>)
            case 'weapon': return <Item item={object}/>
            case 'armor': return <Item item={object}/>
            case 'item': return <Item item={object}/>
            default: throw `Unknown type given to ManyBoxes: type='${type}'`
        }
    }

    objects = sortObjectArrayByKey(objects, 'OrderOnWebsite')

    if (objects.length == 0) {
        return (<div></div>)
    }
    if (objects.length == 1) {
        return (
            <TwoColumns>
                <Column>
                    <Box type={type} object={objects[0]}/>
                </Column>
                <Column></Column>
            </TwoColumns>
        )
    }

    const column1Boxes = []
    const column2Boxes = []

    const half = objects.length % 2 === 0? (objects.length / 2) : (Math.floor(objects.length / 2) + 1)

    for (let i = 0; i < objects.length; i++) {
        if (i < half) {
            column1Boxes.push(objects[i])
        } else {
            column2Boxes.push(objects[i])
        }
    }

    return (
        <TwoColumns>
            <Column>
                {column1Boxes.map(object => (<Box key={object.Name} type={type} object={object}/>))}
            </Column>
            <Column>
                {column2Boxes.map(object => (<Box key={object.Name} type={type} object={object}/>))}
            </Column>
        </TwoColumns>
    )
}