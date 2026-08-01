import Page from "../../containers/Page/Page";


export default function Griffincraft() {
    return <Page>
        <div className="flex column center-content center-text padding-top-4" style={{gap: '4rem'}}>
            <img src="/Other/Griffincraft.png"/>
            <p>
                We're here to resolve any issue you might have with our products and services.<br/>
                Send an email to <i>david.i.irimia@hotmail.com</i> and we'll talk!
            </p>
            <p className="gray-text italic">GRIFFINCRAFT S.R.L., Romania (45597040).</p>
        </div>
    </Page>
}