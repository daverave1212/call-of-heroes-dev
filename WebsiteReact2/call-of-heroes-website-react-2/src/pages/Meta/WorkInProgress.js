import Page from "../../containers/Page/Page";
import useConstWindowDimensions from "../../utils";
import { QGTitle1 } from "../Tools/TitleGenerator";


export default function WorkInProgress() {

    const windowDimensions = useConstWindowDimensions()
    const titleSize = windowDimensions.width > 625? 50: 27

    return <Page>
        <div className="center-content padding-top-4 gap-2">
            <img src="/WorkInProgress.png"/>
            <QGTitle1 text={"Work In Progress"} height={titleSize}/>
            <p className="center-text home-font">Oops! It appears this page is still work in progress.<br/>Check back later this month!</p>
        </div>
    </Page>
}