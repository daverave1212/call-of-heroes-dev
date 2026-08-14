

import { Link } from 'react-router-dom'
import { useLocalStorageState } from '../../utils'
import Popup from '../Popup/Popup'
import Toggle from '../Toggle/Toggle'
import './CookiesPopup.css'


export default function CookiesPopup() {

    const [cookiesState, setCookiesState] = useLocalStorageState('cookiesPopup', {
        isOpen: true,
        preferences: {
            essential: 'on',
            analytics: 'off'
        }
    })

    function withPreference(name, to) {
        const newState = {...cookiesState}
        newState.preferences[name] = to
        return newState
    }

    function onAnalyticsToggle(evt) {
        const newValue = evt.target.value
        const newState = withPreference('analytics', newValue)
        setCookiesState(newState)
    }

    const closeCookies = () => setCookiesState({...cookiesState, isOpen: false})

    return <Popup isOpen={cookiesState.isOpen} close={closeCookies} canBeClosed={false}>
        <div className='flex column gap-1 cookies-popup'>
            <div className='flex column gap-quarter'>
                <h1 style={{marginBottom: '1rem'}}>We use cookies</h1>
                <p>QuestGuard uses essential cookies and browser storage to provide core functionality, including authentication, saving your work, accessing purchased content, and maintaining security.</p>
                <p>With your permission, we would also use analytics technologies to understand how QuestGuard is used and improve it.</p>
            </div>

            <div className='dashboard-panel flex column gap-half'>
                <h3>Essential technologies (required)</h3>
                <p>Required for authentication, security, purchases, saving work, and core functionality. These can not be disabled.</p>
            </div>

            <div className='dashboard-panel flex row gap-half'>
                <div className='flex-4 flex column gap-half'>
                    <h3>Analytics (optional)</h3>
                    <p>Help us improve QuestGuard so we can provide the best version of our game!</p>
                </div>
                <div className='flex-1 center-content'>
                    <label className="toggle">
                        <input type="checkbox" onChange={onAnalyticsToggle} value={cookiesState.preferences.analytics}/>
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            <div className='i'>
                You can change your choices at any time from Cookie Settings option in the footer, or from your Account page.
            </div>
            <div className='flex row align-right gap-1'>
                <button className='simple' onClick={() => {
                    const newState = withPreference('analytics', 'off')
                    newState.isOpen = false
                    setCookiesState(newState)
                }}>Reject Analytics</button>
                <button onClick={() => {
                    const newState = withPreference('analytics', 'on')
                    newState.isOpen = false
                    setCookiesState(newState)
                }}>Accept All</button>
            </div>
            <div className='center-content row gap-2 padding-top-1' style={{borderTop: 'solid 1px rgb(200, 200, 200)'}}>
                <a className="ui-link" href="Download/Policies/Cookie Policy.pdf">Cookie Policy</a>
                <a className="ui-link" href="Download/Policies/Privacy Policy.pdf">Privacy Policy</a>
                <a className="ui-link" href="Download/Policies/Terms of Service.pdf">Terms of Service</a>
            </div>
        </div>
    </Popup>

}