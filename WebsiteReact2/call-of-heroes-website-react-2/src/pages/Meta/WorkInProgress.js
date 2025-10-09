import Page from "../../containers/Page/Page";
import useConstWindowDimensions from "../../utils";
import { QGTitle1 } from "../Tools/TitleGenerator";


export default function WorkInProgress() {

    const windowDimensions = useConstWindowDimensions()
    const titleSize = windowDimensions.width > 625? 50: 27

    return <Page hasNoMargins={true} hasNoLimits={true}>
        <div className="center-content padding-top-4">
            <img src="/WorkInProgress.png" style={{width: 'min(50vw, 50vh)'}}/>
            <QGTitle1 text={"Work In Progress"} height={titleSize}/>
            <p className="center-text home-font">Oops! It appears this page is still work in progress.<br/>Check back later this month!</p>
        </div>
    </Page>
}