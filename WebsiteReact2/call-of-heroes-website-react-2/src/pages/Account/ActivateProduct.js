import { useState } from "react";
import Input from "../../components/Input/Input";
import { QGTitle1 } from "../Tools/TitleGenerator";


export default function ActivateProduct() {

    const [code, setCode] = useState('')

    function activate() {
        alert(code)
    }

    return <div className="flex column center-content center-text gap-1">
        <QGTitle1 text="Activate Product"/>
        <p>Enter a code to activate a set on Questguard!</p>
        <Input placeholder={'ASDFG-12345-QWERT-09876-ZXCVB...'} onChange={val => setCode(val)}/>
        <button onClick={activate}>Activate</button>
    </div>
}