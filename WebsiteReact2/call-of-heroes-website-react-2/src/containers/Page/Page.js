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
            <div className='page-content'>
                { title != null && (
                    <PageH1 onClick={togglePageDisplay} id={`${titleToId(title)}`}>{ title }</PageH1>
                ) }
                <div style={state.isExpanded == true? { display: 'none' } : { display: '' }}>
                    <span style={{fontSize: '45px', lineHeight: '20px'}}>. . .</span>
                </div>
                <div style={state.isExpanded == true? { display: '' } : { display: 'none' }}>
                    { children }
                </div>
            </div>
            <LandingPageSeparator type="8"/>
        </div>
    )

}