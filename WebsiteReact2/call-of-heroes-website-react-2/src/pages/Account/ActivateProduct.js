import { useState } from "react";
import Input from "../../components/Input/Input";
import { QGTitle1 } from "../Tools/TitleGenerator";
import { useAuth } from "../../services/auth/Auth";
import { activateCodeAsync } from "../../services/backend-services/redeem-code";




export default function ActivateProduct() {

    const { user } = useAuth('ActivateProduct')
    const [code, setCode] = useState('')


    async function activate() {
        const result = await activateCodeAsync(user, code)
        if (result.success) {
            alert(`Set activated! Reload the page!`)
        } else {
            alert(`Could not activate code: ${result.message}`)
        }
    }

    return <div className="flex column gap-2 padding-2">
        <div className="dashboard-panel center-content flex column gap-half padding-top-half">
            <p>Enter a code to activate a set on Questguard!</p>
            <Input className="padding-half" style={{display: 'block', minWidth: '300px'}} placeholder={'ASDFG-12345-QWERT-09876-ZXCVB...'} onChange={val => setCode(val)}/>
            <button onClick={activate}>Activate</button>
        </div>
    </div>
}



// export default function ActivateProduct() {

//     const [code, setCode] = useState('')

//     function activate() {
//         alert(code)
//     }

//     return <div className="flex column center-content center-text gap-1">
//         <QGTitle1 text="Activate Product"/>
//     </div>
// }