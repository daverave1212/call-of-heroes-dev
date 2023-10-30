import React, { useState, useContext, useEffect } from 'react'

import PageH1 from '../../components/PageH1/PageH1'
import PageH0 from '../../components/PageH0/PageH0'

import './Page.css'
import Separator from '../../components/Separator/Separator'

import AppStateContext from '../../services/AppStateContext'
import LandingPageSeparator from '../../components/LandingPageSeparator/LandingPageSeparator'
import { titleToId } from '../../utils'



export default function Page({
    children,
    title,
    subtitle,
    id,

    isCollapsable,                  // If true, clicking on the title collapses the page
    isSecondaryPage,                // Default false; if true, it will not update title
    hasNoLimits                     // Default is false; if true, it will have no width limits
}) {

    isSecondaryPage = isSecondaryPage == null? false : true

    const [appState, setAppState] = useContext(AppStateContext)
    const [state, setState] = useState({ isExpanded: true })

    const togglePageDisplay = () => {
        if (isCollapsable != false) {
            setState({ isExpanded: !state.isExpanded })
        }
    }

    useEffect(() => {
        if (! isSecondaryPage) {
            document.title = title
        }
    }, [title])

    return (
        <div className={`page ${appState.isSimple? '' : 'page--has-background'} ${hasNoLimits == true? 'page--no-limits' : ''}`}>
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
            {/* <LandingPageSeparator type="8"/> */}
        </div>
    )

}