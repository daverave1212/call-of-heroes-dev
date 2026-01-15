import { useState } from "react";
import PageH1 from "../../components/PageH1/PageH1";
import Page from "../../containers/Page/Page";
import { QGTitle1 } from "./TitleGenerator";
import { getNumberFromString } from "../../utils";

const MERCHANT_TYPE_LETTER_MAP = {
    'Blacksmith': {
        tags: ['Weapon', 'Armor', 'Metal', 'Ammo'],
        specificItems: [
            "Smith's Tools"
        ]
    },
    'General Goods': {
        tags: [
            'Adventuring Gear', 'General Goods', 'Other Items', 'Instruments',
            'Potion', 'Scroll', 'Consumable', 'Poison', 'Toy'
        ]
    },
    'Church': {
        tags: [
            'Religion', 'Book'
        ]
    }
}

export default function MerchantGenerator({}) {

    const [merchantCode, setMerchantCode] = useState('')

    function seeMerchant() {
        const productDiversity = getNumberFromString(merchantCode) ?? 2
        const codeNoNumber = merchantCode.replaceAll(`${productDiversity}`, '')
        const merchantTypeLetter = codeNoNumber.charAt(codeNoNumber.length - 1)
    }

    return <Page>
        <div className="center-content gap-1">
            <QGTitle1 text={"Merchant"} height={40}/>
            <input value={merchantCode} placeholder="Merchant's Code" onChange={evt => setMerchantCode(evt.target.value)}/>
            <button onClick={seeMerchant}>See Merchant</button>
        </div>
    </Page>

}