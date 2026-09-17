import Page from "../../containers/Page/Page";
import { QGTitle1 } from "../Tools/TitleGenerator";


export default function TransitionGuidePage() {

    const borderStyle = { maxWidth: '30%', aspectRatio: '1/1' }

    return <div className="relative">
        <img className="absolute rotate-90" src="/Book/PageBorderBottomLeft.png" style={{...borderStyle, left: '5%', top: '5%'}}/>
        <img className="absolute" src="/Book/PageBorderBottomLeft.png" style={{...borderStyle, left: '5%', bottom: '5%'}}/>
        <img className="absolute rotate-270" src="/Book/PageBorderBottomLeft.png" style={{...borderStyle, right: '5%', bottom: '5%'}}/>
        <img className="absolute rotate-180" src="/Book/PageBorderBottomLeft.png" style={{...borderStyle, right: '5%', top: '5%'}}/>
        <div className="flex center-content center-text padding-4 relative full-page-height" style={{gap: '4rem'}}>
            <QGTitle1 text={"Transition Guide"}/>
            <div className="flex center-content gap-2">
                <p>You can download the PDF version of the transition guide here:</p>
                <a className="btn" href="/Download/Transition_Guide_2026-09-17d.pdf" download={true}>Download PDF</a>
            </div>
        </div>
    </div>
}