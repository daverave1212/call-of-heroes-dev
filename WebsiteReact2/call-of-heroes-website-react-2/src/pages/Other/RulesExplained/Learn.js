import { Link, useLocation } from "react-router-dom";
import LandingPageSeparator from "../../../components/LandingPageSeparator/LandingPageSeparator";
import classNames from "classnames";
import './Learn.css'
import HeroButton from "../../../components/HeroButton/HeroButton";
import { SideMenu } from "../../../components/SideMenu/SideMenu";
import BreadcrumbSideMenu from "../../../components/BreadcrumbSideMenu/BreadcrumbSideMenu";
import { useEffect, useState } from "react";
import { getPageHashFromLocation } from "../../../utils";
import AnchorFixer from "../../../components/AnchorFixer/AnchorFixer";
import { QGTitle1 } from "../../Tools/TitleGenerator";

export function HeroSlidePageTitle({imgSrc, title}) {
    if (imgSrc != null)
        return (
            <img className={'hero-logo-img'} src={imgSrc}/>
        )
            
    if (title != null) return <h1 className="hero-logo-text">{ title }</h1>
    return ""
}

function SlidePage({
    name,
    isReverse, isButtonDisabled, isAlignedLeft, title, logoImgSrc, imgSrc, buttonName, linkTo, children, isDownload
}) {

    function Img() {
        return <img className='slide-image' src={imgSrc}/>
    }
    function Text() {
        return (
            <p className='home-text-style' style={{textAlign: isAlignedLeft == true? 'left': 'center'}}>
                { children }
            </p>
        )
    }
    function Button() {
        if (buttonName == null) {
            return <></>
        }
        return <div className="center-content">
            {
                isButtonDisabled?
                    <button disabled={isButtonDisabled}>{ buttonName }</button>
                :isDownload?
                    <button><a style={{color: 'white'}} target="_blank" href={linkTo} download={buttonName}>{ buttonName }</a></button>
                :
                    <button><Link style={{color: 'white'}} to={linkTo}>{ buttonName }</Link></button>
            }
        </div>
    }
    return (
        <div>
            <div className={classNames("slide-page", "landscape-only", {
                "reverse": isReverse === true,
                'normal': isReverse !== true
            })}>
                <div className='slide-right'>
                    <Img/>
                </div>

                <div className='slide-left'>
                    <div className="slide-left-content">
                        <div className="center-content">
                            <QGTitle1 height={50} text={name}/>
                        </div>
                        <Text/>
                        <Button/>
                    </div>
                </div>
            </div>

            <div className="hero-page portrait-only">
                <div className='hero-image-container'>
                    <Img/>
                </div>

                <div className='hero-content'>
                    <div className="center-content">
                        <QGTitle1 height={50} text={name}/>
                    </div>
                    <Text/>
                    
                    <div className='hero-buttons'>
                        <button>
                            {
                                isDownload === true ?
                                    <a href={linkTo} target="_blank" download>{ buttonName }</a> :
                                    <Link to={linkTo}>{buttonName}</Link>
                            } 
                        </button>
                        <div className='hero-buttons-separators'>
                            <img src="/button-separator.png"/>
                            <img src="/button-separator-reversed.png"/>
                        </div>
                    </div>

                </div>
            </div>
            <LandingPageSeparator type="8"/>
        </div>
    )
}

export function HeroSlidePage({id, name, nBullets, CHeroLogo, highlightNumber, isButtonDisabled, isReverse, isAlignedLeft, title, titleStyle, logoImgSrc, imgSrc, buttonName, linkTo, children, isDownload }) {
    return (
        <div style={{position: 'relative'}}>
            <AnchorFixer id={id}/>
            { nBullets != null && (<BreadcrumbSideMenu nBullets={nBullets} highlightNumber={highlightNumber}/>) }
            <SlidePage name={name} isButtonDisabled={isButtonDisabled} CHeroLogo={CHeroLogo} isAlignedLeft={isAlignedLeft} isReverse={isReverse == true? true : false} titleStyle={titleStyle} title={title} isDownload={isDownload} imgSrc={imgSrc} logoImgSrc={logoImgSrc} buttonName={buttonName} linkTo={linkTo}>
                { children }
            </SlidePage>
        </div>
    )
}

export default function() {

    const location = useLocation()

    useEffect(() => {
        const hash = getPageHashFromLocation(location)
        if (hash != null && hash?.length > 0) {
            const element = document.querySelector('#' + hash)
            if (element != null) {
                element.scrollIntoView()
            }
        }
    }, [])
    
    return (
        <div>

            <HeroSlidePage
                id="Transition-Guide"
                nBullets={4} highlightNumber={0}
                isDownload={true} linkTo={"/Download/Transition_Guide_2026-05-23.pdf"}
                imgSrc="/LandingPage/Learn2.png"
                CHeroLogo={<HeroSlidePageTitle imgSrc="/LandingPage/TransitionGuideLogo.png"/>}
                name="Transition Guide"
                buttonName="Transition Guide">
                If you're familiar with other mainstream tabletop RPG's, check out this transition guide. It explains the differences and how to transition smoothly to QuestGuard.
            </HeroSlidePage>

            <HeroSlidePage
                id="Character-Creation"
                nBullets={4} highlightNumber={1}
                isReverse={true} isDownload={true}
                CHeroLogo={<HeroSlidePageTitle imgSrc="/LandingPage/CharacterCreationLogo.png"/>}
                imgSrc="/LandingPage/Learn4.png"
                buttonName="Creation Guide"
                name="Create a Hero"
                linkTo="/Tools/CharacterCreationCalculator"
                // linkTo="/Download/Character_Creation_Guide_2024-06-16b.pdf"
            >
                Learn how to create a Hero in QuestGuard. Use our awesome <Link to="/Tools/CharacterCreationCalculator"><b>online Hero builder</b></Link>, and be sure to share it over on our Discord community when you're done!
            </HeroSlidePage>

            <HeroSlidePage
                id="For-New-Players"
                nBullets={4} highlightNumber={2}
                CHeroLogo={<HeroSlidePageTitle title="For New Players"/>}
                imgSrc="/LandingPage/Learn3.png"
                buttonName="Coming Soon!"
                isButtonDisabled={true}
                name="New Player Guide"
                linkTo="/404">
                Learn about tabletop roleplaying games and the very basics. Recommended if you are completely new to the genre, and have never played Questguard, Dungeons & Dragons or other similar social games.
            </HeroSlidePage>

            <HeroSlidePage
                id="Rules"
                nBullets={4} highlightNumber={2}
                isReverse={true}
                CHeroLogo={<HeroSlidePageTitle title="Rules Glossary"/>}
                imgSrc="/LandingPage/Learn.png"
                buttonName="View Rules"
                name="All Rules"
                linkTo="/Other/Rules">
                Click here for the complete in-depth character creation, rules, clarifications and interactions. Everthing about Questguard inside a neatly tied table of contents.
            </HeroSlidePage>
       </div>
    )
}