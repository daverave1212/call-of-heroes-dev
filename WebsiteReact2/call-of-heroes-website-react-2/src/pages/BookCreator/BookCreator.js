import { testPDF } from '../../services/pdf-tools/pdf-tool'
import './BookCreator.css'

export default function() {

    function generate() {
        testPDF(document.querySelector('iframe'))
    }

    return <div className='center-content' style={{width: '100%', minHeight: '100vh', backgroundColor: 'gray'}}>

        <button className='btn' onClick={generate}>Go</button>

        <iframe style={{width: '100%', height: '80vh'}}></iframe>

        <div id="PDF" className='flex column gap-1 padding-top-4'>
            
            <div className='pdf-page-with-bleed'>
                <div className='pdf-page'>
                    hello world
                </div>
            </div>
            <div className='pdf-page-with-bleed'>
                <div className='pdf-page'>
                    hello world
                </div>
            </div>

        </div>
    </div>

}