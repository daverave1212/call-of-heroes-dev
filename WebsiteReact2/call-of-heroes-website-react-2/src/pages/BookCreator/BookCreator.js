import Spell from '../../components/Spell/Spell'
import Column from '../../components/TwoColumns/Column'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import { testPDF } from '../../services/pdf-tools/pdf-tool'
import { getSpellByName, printToPDF } from '../../utils'
import './PDFUnitsOverriding.css'
import './BookCreator.css'

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
            
            <div className='pdf-page'>
                <div className='pdf-trim-box'>
                    <p>hello world</p>
                    <br/>
                    <TwoColumns>
                        <Column>
                            <Spell spell={getSpellByName('Awe')}/>
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