import { useState } from "react"
import { DashboardBox } from "./HelperComponents/DashboardBox"
import { getLocalStorageString, isNullOrEmpty, useLocalStorageState } from "../../utils"


export default function AccountSettings() {

    const [logs, setLogs] = useState(null)
    const [hasExtraLogs, setHasExtraLogs] = useLocalStorageState('account.settings.hasExtraLogs')

    return <div className="gap-2 padding-2">
        
        <DashboardBox className="gap-1" name="Refresh App" cornerText={null}>
            <p className="source-sans">If something crashed, or you are experiencing any issues with your account or the website, click on the button below.</p>
            <p className="source-sans">Don't worry, nothing will change about your account and products!</p>
            <button onClick={() => {
                localStorage.clear()
                window.location.href = '/'
            }}>Clear Cache</button>
        </DashboardBox>

        <DashboardBox className="gap-1" name="Enable extra logs" cornerText="">
            <p className="source-sans">If you're experiencing issues with the app, turn this setting on to activate more logs. It will help us understand your problems better!</p>
            <button onClick={() => {
                setHasExtraLogs(!hasExtraLogs)
            }}>{ hasExtraLogs? 'Deactivate': 'Activate!' }</button>
        </DashboardBox>

        <DashboardBox name="Logs" cornerText="">
            <p className="source-sans">Logs track errors accross the website. If you experienced a bug, submit it on our official Discord with a screenshot and these logs. Click on the button below to see the logs.</p>
            <button onClick={() => {
                let lsLogs = getLocalStorageString('logs') ?? ''
                if (lsLogs.length == 0) {
                    lsLogs = 'No logs to show.'
                }
                setLogs(lsLogs)
            }}>See Logs</button>
            { logs != null && (
                <textarea style={{width: '100%', height: '40vh'}}>{logs}</textarea>
            ) }
        </DashboardBox>
    </div>
}