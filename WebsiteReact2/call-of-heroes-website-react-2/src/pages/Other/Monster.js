import React from 'react'
import './Monster.css'

import { useState } from 'react'

import * as U from '../../utils'

import monsters from '../../databases/Monsters.json'

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


export default function Monster() {

    const location = useLocation()
    const monsterName = U.getPageHashFromLocation(location)
    console.log({monsterName})

    const monster = monsters[monsterName]
    
    const monsterStats   = U.getMonsterStatsAsObject(monster.Stats)
    const statValueStyle = { width: '115px', textAlign: 'center' }
    const statNameStyle  = { width: '125px', textAlign: 'center' }
    const inttvNameStyle = { width: 'calc(125px + 115px)', textAlign: 'center'}
    const metaValueStyle = { width: '135px', textAlign: 'center' }
    const metaNameStyle  = { width: '105px', textAlign: 'center' }
    const statColumnPadding = 'calc(var(--two-columns-padding-middle-per-column) / 2)'
    const statOtherColor = 'rgb(55, 10, 85)'

    const monsterSubtitle = monster.Type +
        (monster.Role != null? `, ${monster.Role}`: '')

    console.log({monsterSubtitle, type: monster.Type})

    return (
        <Page title={monsterName} subtitle={monsterSubtitle}>
            <TwoColumns type='lefty'>
                <Column>
                { monster.Lore != null? (
                    <p>{monster.Lore}</p>
                ) : (
                    <p>
                        Lorem ipsum dolor sit amet.
                        Aenean blandit metus nisi, non commodo tortor volutpat ut.
                        Aenean suscipit, justo vitae faucibus viverra, lectus lacus laoreet ipsum, quis suscipit purus ex et tellus. Suspendisse congue libero sed molestie efficitur. Proin maximus sagittis nunc lacinia porttitor.
                        Maecenas fermentum lacinia mi, a elementum nibh tristique at. In eget nisl nunc.
                    </p>
                ) }
                </Column>
                <Column>
                    {}
                </Column>
            </TwoColumns>
            
            <TwoColumns type='lefty'>
                <Column>
                    <TwoColumns className="two-columns--half-padding">
                        <Column>
                            <div className='with-margined-children'>
                                <SmallStat nameStyle={statNameStyle} valueStyle={statValueStyle} name="Health">{monster.Health}<Icon name="Health" type="small-stat"/></SmallStat>
                                { monster.Armor != 0 && (<SmallStat nameStyle={statNameStyle} valueStyle={statValueStyle} name="Defense">{monster.Armor}<Icon name="Defense" type="small-stat"/></SmallStat>) }
                                <SmallStat nameStyle={statNameStyle} valueStyle={statValueStyle} name="Speed">{monster.Speed}</SmallStat>
                                <SmallStat topDown={true} nameStyle={inttvNameStyle} valueStyle={inttvNameStyle} name="Initiative">{monster.Initiative}</SmallStat>
                            </div>
                        </Column>
                        <Column>
                            <div className='with-margined-children'>
                                <SmallStat color={statOtherColor} nameStyle={metaNameStyle} valueStyle={metaValueStyle} name="XP">{monster.Experience}</SmallStat>
                                { monster.Degree != 'Normal' && (<SmallStat color={statOtherColor} nameStyle={metaNameStyle} valueStyle={metaValueStyle} name="Degree">{monster.Degree != null? monster.Degree : 'Normal'}</SmallStat>) }
                            </div>
                        </Column>
                    </TwoColumns>


                    <Separator/>
                    <div style={{display: 'flex', justifyContent: 'space-around', gap: '10px'}}>
                        { monsterStats.map(nameValue => (
                            <SmallStat style={{width: '19%'}} contentStyle={{width: '100%', textAlign: 'center'}} name={nameValue.name} topDown={true}>{nameValue.value}</SmallStat>
                        )) }
                    </div>
                    <Separator/>
                </Column>
                <Column>
                    {}
                </Column>
            </TwoColumns>
            
            <TwoColumns type='lefty'>
                <Column>
                    <div>
                        { (monster.Abilities == null || monster.Abilities == 'None') ? (
                            <div></div>
                        ) : (monster.Abilities.length >= 2) ? (
                            <div>
                                <TwoColumns className="two-columns--quarter-padding">
                                    <Column>
                                        <MonsterAbility ability={monster.Abilities[0]} key={0}/>
                                        { monster.Abilities.length >= 3 && (<MonsterAbility ability={monster.Abilities[2]} key={2}/>) }
                                    </Column>
                                    <Column>
                                        <MonsterAbility ability={monster.Abilities[1]} key={1}/>
                                        { monster.Abilities.length >= 4 && (<MonsterAbility ability={monster.Abilities[3]} key={3}/>) }
                                    </Column>
                                </TwoColumns>
                            </div>
                        ) : (
                            monster.Abilities.map((ability, i) => (
                                <MonsterAbility ability={ability} key={i}/>
                            ))
                        )}
                    </div>

                    <div>
                        { monster.Passives != null && monster.Passives.map((ability, i) => (
                            <MonsterAbility ability={ability} key={i} isPassive={true}/>
                        )) }
                    </div>
                </Column>
                <Column style={{position: 'relative'}}>
                    { monster.Variants != null && (
                        <div className='monster-variants'>{monster.Variants}</div>
                    ) }
                    { monster.Behavior != null && (<p>{monster.Behavior}</p>) }
                    { monster.Pair != null && (<p>{monster.Pair}</p>) }
                    { monster['Suggested Obstacles'] != null && monster['Suggested Obstacles'] != 'None' && (
                        <div>
                            Suggested obstacles:
                            <ul>
                                { monster['Suggested Obstacles'].map(text => (<li>{text}</li>)) }
                            </ul>
                        </div>
                    ) }
                    { monster['Story Ideas'] != null && (
                        <div className='monster-story-ideas'>{ monster['Story Ideas'] }</div>
                    ) }
                </Column>
            </TwoColumns>
        </Page>
    )
}
