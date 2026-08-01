import Page from "../../containers/Page/Page";
import { QGTitle1 } from "../Tools/TitleGenerator";


export default function Buy() {
    return <Page>
        <div className="flex column center-content gap-1 center-text padding-top-4">
            <QGTitle1 text={"Buy Core Set"}/>
            <a href="https://buy.stripe.com/test_aFadRa5N3gqS3w9aqq0RG01">Buy Now</a>
        </div>
    </Page>
}