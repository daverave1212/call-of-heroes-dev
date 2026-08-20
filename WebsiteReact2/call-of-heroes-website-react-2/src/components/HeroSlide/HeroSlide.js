import { QGTitle1 } from "../../pages/Tools/TitleGenerator";
import AnchorFixer from "../AnchorFixer/AnchorFixer";
import './HeroSlide.css'

export function HeroSlide({ id, isReverse, src, children }) {

    const maybeReverseClass = isReverse? 'reverse': ''

    return (
        <div className="hero-slide relative z-content">
            <AnchorFixer id={id}/>
            <div className={`landscape-only relative width-100 height-100 flex row ${maybeReverseClass}`}>
                <div className="flex-4 max-height-100 center-content relative padding-2">
                    <img className="absolute" src={src} style={{maxHeight: 'calc(0.8 * var(--hero-page-height))', zIndex: 'var(--z-overlay)'}}/>
                </div>
                <div className="flex-1"/>
                <div className="flex-5 center-content center-text gap-3" style={{maxWidth: '780px'}}>
                    { children }
                </div>
                <div className="flex-1"/>
            </div>
            <div className={`portrait-only relative width-100 center-content center-text padding-2 gap-2`}>
                { children }
            </div>
        </div>
    )
}
