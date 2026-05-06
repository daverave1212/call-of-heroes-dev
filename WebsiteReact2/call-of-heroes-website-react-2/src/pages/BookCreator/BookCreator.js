import Spell from '../../components/Spell/Spell'
import Column from '../../components/TwoColumns/Column'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import { testPDF } from '../../services/pdf-tools/pdf-tool'
import { getOnlyEntry, getSpellByName, getValueByPath, isObject, isString, printToPDF } from '../../utils'
import './PDFUnitsOverriding.css'
import './BookCreator.css'

import Book from '../../databases/Book/QuestGuard Book.json'
import PageH2 from '../../components/PageH2/PageH2'
import { Children, isValidElement } from 'react'
import { QGTitle1 } from '../Tools/TitleGenerator'
import PageH3 from '../../components/PageH3/PageH3'
import { BigTitle, H1, Header, P, PDFPage, Section } from './BookCreatorUtils'

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

            <PDFPage>
                <BigTitle>
                    <img style={{width: '115%', maxWidth: '115%'}} src="/Book/QuestGuardFancy.png"/>
                </BigTitle>
            </PDFPage>

            <PDFPage>
                <Column>
                    <Section path="Preface.Made By"/>
                </Column>
                <Column></Column>
            </PDFPage>


            <PDFPage>
                <Column>
                    <Section path="Introduction.What We Want"/>
                    <Header path="Introduction.Welcome To QuestGuard"/>
                    <Section path="Introduction.Welcome To QuestGuard.Text"/>
                </Column>
                <Column>
                    <Section path="Introduction.Welcome To QuestGuard.Quest Master"/>
                    <Section path="Introduction.Welcome To QuestGuard.Trying Things"/>
                </Column>
            </PDFPage>

            <PDFPage>


            </PDFPage>


            <PDFPage>
                <Column>
                    <Section path="Introduction.What You Need"/>
                </Column>
                <Column>
                    
                </Column>
            </PDFPage>
            
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    <TwoColumns>
                        <Column>                            
                        </Column>
                        <Column></Column>
                    </TwoColumns>
                </div>
            </div>
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    hello world
                </div>
            </div>
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    hello world
                </div>
            </div>
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    hello world
                </div>
            </div>

        </div>
    </div>

}









