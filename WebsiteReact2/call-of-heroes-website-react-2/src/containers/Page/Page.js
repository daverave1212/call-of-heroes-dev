import React, { useState, useContext, useEffect } from 'react'

import PageH1 from '../../components/PageH1/PageH1'
import PageH0 from '../../components/PageH0/PageH0'

import './Page.css'
import Separator from '../../components/Separator/Separator'

import AppStateContext from '../../services/AppStateContext'
import LandingPageSeparator from '../../components/LandingPageSeparator/LandingPageSeparator'
import { titleToId } from '../../utils'
import classNames from 'classnames'



export default function Page({
    children,
    title,
    subtitle,
    id,
    style,

    isCollapsable,                  // If true, clicking on the title collapses the page
    isSecondaryPage,                // Default false; if true, it will not update title
    hasNoLimits,                    // Default is false; if true, it will have no width limits
    hasNoMargins,                   // Default is false; if true, has no margins
    isCentered,                     // Default is false
    hasCopyButton
}) {

    const [appState, setAppState] = useContext(AppStateContext)
    const [state, setState] = useState({ isExpanded: true })

    const pageClasses = classNames('page', {
        'page--no-limits': hasNoLimits == true,
        'no-margin': hasNoMargins == true
    })

    const togglePageDisplay = () => {
        if (isCollapsable != false) {
            setState({ isExpanded: !state.isExpanded })
        }
    }

    useEffect(() => {
        if (isSecondaryPage != true && title != null) {
            console.log(`Setting title to ${title}`)
            document.title = title
        }
    }, [title])

    return (
        <div className={pageClasses} id={id} style={style}>
            
            { subtitle != null && (
                <div>
                    <p className='page-subtitle'>
                        { subtitle }
                    </p>
                </div>
            )}


            <div className={`page-content ${isCentered === true? 'page-content-centered': ''}`}>
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


        </div>
    )

}