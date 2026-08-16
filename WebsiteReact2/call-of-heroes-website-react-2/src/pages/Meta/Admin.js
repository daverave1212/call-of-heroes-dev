import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import LoginRequired from "../../components/LoginRequired/LoginRequired";
import TextArea from "../../components/TextArea/TextArea";
import Page from "../../containers/Page/Page";
import { getDocInCollection, getMyDocInCollection, getUserIDFromEmail, setMyDocInCollection } from "../../services/online-database/Database";
import { isString, isStringJSON, isStringYAML } from "../../utils";



export default function AdminPage({}) {
    
    return <div>WIP</div>

    function setResult(textOrJson) {
        const text = isString(textOrJson)? textOrJson: JSON.stringify(textOrJson, null, 2)
        document.querySelector('textarea').value = text
    }

    async function getCode() {
        const textareaValue = document.querySelector('textarea').value
        let jsonText = textareaValue
        if (isStringJSON(textareaValue)) {
            jsonText = textareaValue
        } else if (isStringYAML(textareaValue)) {
            // const yaml = await import('https://esm.sh/js-yaml').then(m => m.default)
            const yaml = {}
            const jsonObj = yaml.load(textareaValue)
            jsonText = JSON.stringify(jsonObj)
        }
        console.log({textareaValue, jsonText})
        return jsonText
    }

    async function getCodeObj() {
        console.log(`Getting code object`)
        let code
        try {
            code = await getCode()
        } catch (e) {
            console.error(e)
        }
        console.log(code)
        if (isStringJSON(code)) {
            return JSON.parse(code)
        } else {
            throw `Invalid textarea input`
        }
    }

    async function trySetResult(func) {
        try {
            const result = await func()
            setResult(result)
        } catch (e) {
            setResult(e)
        }
    }
    
    return <LoginRequired location="AdminPage">
        <Page title="Admin">
            <div className="flex column gap-1">

                {/* Find users */}
                <InputButton name="Find user by email" placeholder="Collection Name/Document ID" onClick={async text => {
                    trySetResult(async () => {
                        return await getUserIDFromEmail(text)
                    })
                }}/>

                {/* Get/Set My Data */}
                <InputButton name="Get My Doc" placeholder="Collection Name (gets my document in that collection)" onClick={async text => {
                    setResult(`Getting setResult(text)...`)
                    try {
                        const myDoc = await getMyDocInCollection(text)
                        setResult(myDoc)
                    } catch (e) {
                        setResult(e)
                    }
                }}/>
                <InputButton name="Set My Doc" placeholder="Collection Name (gets my document in that collection)" onClick={async text => {
                    try {
                        const inputObj = await getCodeObj()
                        const result = await setMyDocInCollection(text, inputObj)
                        setResult('✅')
                    } catch (e) {
                        setResult(e)
                    }
                }}/>


                <InputButton name="Get Doc By Path" placeholder="Collection Name/Document ID" onClick={async text => {
                    const [collectionName, docId] = text.split('/')
                    trySetResult(async () => {
                        return await getDocInCollection(collectionName, docId)
                    })
                }}/>


                <textarea className="relative width-100" rows="40"/>
            </div>
        </Page>
    </LoginRequired>
}


function InputButton({placeholder, name, onClick}) {

    function onButtonClick() {
        const inputDom = document.querySelector(`input[name="${name}"]`)
        const inputValue = inputDom.value
        onClick(inputValue)
    }

    return <div className="flex row width-100">
        <div className="flex-1">
            <input placeholder={placeholder} name={name} className="relative width-100 height-100" onKeyDown={evt => { if (evt.key == 'Enter') onButtonClick()}}/>
        </div>
        <div className="flex-1">
            <button className="btn" onClick={onButtonClick}>{name}</button>
        </div>
    </div>
}
function DoubleInputButton({placeholder1, placeholder2, name, onClick}) {

    function onButtonClick() {
        const input1Dom = document.querySelector(`input[name="${name + placeholder1}"]`)
        const input2Dom = document.querySelector(`input[name="${name + placeholder2}"]`)
        const inputValue1 = input1Dom.value
        const inputValue2 = input2Dom.value
        onClick(inputValue1, inputValue2)
    }

    return <div className="flex row width-100">
        <div className="flex-1">
            <input placeholder={placeholder1} name={name + placeholder1} className="relative width-100 height-100" onKeyDown={evt => { if (evt.key == 'Enter') onButtonClick()}}/>
        </div>
        <div className="flex-1">
            <input placeholder={placeholder2} name={name + placeholder1} className="relative width-100 height-100" onKeyDown={evt => { if (evt.key == 'Enter') onButtonClick()}}/>
        </div>
        <div className="flex-1">
            <button className="btn" onClick={onButtonClick}>{name}</button>
        </div>
    </div>
}