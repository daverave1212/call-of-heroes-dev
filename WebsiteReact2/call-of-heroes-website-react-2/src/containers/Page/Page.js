import React, { useState, useContext } from 'react'

import PageH1 from '../../components/PageH1/PageH1'
import PageH0 from '../../components/PageH0/PageH0'

import './Page.css'
import Separator from '../../components/Separator/Separator'

import AppStateContext from '../../services/AppStateContext'
import LandingPageSeparator from '../../components/LandingPageSeparator/LandingPageSeparator'
import { titleToId } from '../../utils'



export default function Page({ children, title, subtitle, id }) {

    const [appState, setAppState] = useContext(AppStateContext)
    const [state, setState] = useState({ isExpanded: true })

    const pageDisplayStyle  = state.isExpanded == true? { display: '' } : { display: 'none' }
    const togglePageDisplay = () => {
        setState({ isExpanded: !state.isExpanded })

    }

    return (
        <div className={`page ${appState.isSimple? '' : 'page--has-background'}`}>
            { subtitle != null && (
                <div>
                    <p className='page-subtitle'>
                        { subtitle }
                    </p>
                </div>
            )}
            <div className='page-content' style={pageDisplayStyle}>
                { title != null && (
                    <PageH1 onClick={togglePageDisplay} id={`${titleToId(title)}`}>{ title }</PageH1>
                    // <PageH0 onClick={togglePageDisplay} id={`${titleToId(title)}`}>{ title }</PageH0>
                ) }
                { children }
            </div>
            <LandingPageSeparator type="8"/>
        </div>
    )

}