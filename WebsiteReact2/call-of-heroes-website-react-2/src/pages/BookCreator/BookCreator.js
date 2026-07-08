import Spell from '../../components/Spell/Spell'
import Column from '../../components/TwoColumns/Column'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import { testPDF } from '../../services/pdf-tools/pdf-tool'
import { getOnlyEntry, getSpellByName, getValueByPath, isObject, isString, keepOnly, printToPDF } from '../../utils'
import './PDFUnitsOverriding.css'
import './BookCreator.css'

import Book from '../../databases/Book/QuestGuard Book.json'
import PageH2 from '../../components/PageH2/PageH2'
import { Children, isValidElement } from 'react'
import { QGTitle1 } from '../Tools/TitleGenerator'
import PageH3 from '../../components/PageH3/PageH3'
import { BigTitle, H1, Header, organizePDFByPages, P, PDFPage, Section } from './BookCreatorUtils'
import TwoColumnsAuto from '../../components/TwoColumns/TwoColumnsAuto'
import SectionNames from '../Other/CharacterCreationCalculator/SectionNames'

const { Introduction, Preface } = Book
export default function() {

    function generate() {
        // testPDF(document.querySelector('iframe'))
        printToPDF()
    }

    // return <div className='center-content' style={{width: '100%', minHeight: '100vh', backgroundColor: 'gray'}}>
    return <div>

        {/* <button className='btn' onClick={generate}>Go</button> */}

        {/* <iframe style={{width: '100%', height: '80vh'}}></iframe> */}

        {/* <div id="PDF" className='flex column gap-1 padding-top-4'> */}


        <div id="PDF">

            <TransitionGuidePages/>

            {/* <PDFPage>
                <BigTitle>
                    <img style={{width: '115%', maxWidth: '115%'}} src="/Book/QuestGuardFancy.png"/>
                </BigTitle>
            </PDFPage>

            <PDFPage>
                <Column>
                    <Section path="Credits.Made By"/>
                </Column>
                <Column></Column>
            </PDFPage> */}


            {/* <PDFPage>
                <Column>
                    <Section path="Introduction.What We Want"/>
                    <Header path="Introduction.Welcome To QuestGuard"/>
                    <Section path="Introduction.Welcome To QuestGuard.Text"/>
                </Column>
                <Column>
                    <Section path="Introduction.Welcome To QuestGuard.Quest Master"/>
                    <Section path="Introduction.Welcome To QuestGuard.Trying Things"/>
                </Column>
            </PDFPage> */}


            
        </div>
    </div>

}



function TransitionGuidePages() {

    // const transitionGuideYAML = keepOnly(Book, 'For D&D Players')
    const transitionGuideYAML = { 'For DnD Players': Book['For D&D Players'] }
    const pages = organizePDFByPages(transitionGuideYAML)
    console.log({pages})


    return <>
        { pages.map((page, i) => <PDFPage number={i+1}>
            { page.h1 && <div className='center-content' style={{marginBottom: '15%'}}>
                <QGTitle1>{page.h1}</QGTitle1>
            </div> }
            <TwoColumnsAuto style={{flex: 1, minHeight: 0, columnGap: 'var(--pdf-column-gap)'}}>
                {/* <p>QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school!</p>
                <p>QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school!</p>
                <p>QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school! QuestGuard is a gamified tactical tabletop roleplaying game for the younger generation, who are more used to video games and board games, and want a fast, rules-light, combat-focused alternative to the mainstream and older systems: it’s the opposite of old-school!</p> */}
                { page.content.map(sectionContent => <Section sectionContent={sectionContent}/>) }
            </TwoColumnsAuto>
        </PDFPage>) }
    </>
}







