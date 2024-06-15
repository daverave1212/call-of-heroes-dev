import { Link } from "react-router-dom";
import LandingPageSeparator from "../../../components/LandingPageSeparator/LandingPageSeparator";
import classNames from "classnames";
import './Learn.css'
import HeroButton from "../../../components/HeroButton/HeroButton";
import { SideMenu } from "../../../components/SideMenu/SideMenu";
import BreadcrumbSideMenu from "../../../components/BreadcrumbSideMenu/BreadcrumbSideMenu";
import { useEffect, useState } from "react";

export function HeroSectionTitle({imgSrc, title}) {
    if (imgSrc != null)
        return (
            <img className={'hero-logo-img'} src={imgSrc}/>
        )
            
    if (title != null) return <h1 className="hero-logo-text">{ title }</h1>
    return ""
}

function Section({
    isReverse, isAlignedLeft, title, logoImgSrc, imgSrc, buttonName, linkTo, children, isDownload,

    CHeroLogo

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
                        { CHeroLogo }
                        <Text/>
                        { buttonName != null && (<HeroButton isDownload={isDownload} href={linkTo}>{ buttonName }</HeroButton>) }
                    </div>
                </div>
            </div>

            <div className="hero-page portrait-only">
                <div className='hero-image-container'>
                    <Img/>
                </div>

                <div className='hero-content'>
                    { CHeroLogo }
                    <Text/>
                    
                    <div className='hero-buttons'>
                        <button className='Basic-button'>
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
        </div>
    )
}

export function HeroSection({nBullets, CHeroLogo, highlightNumber, isReverse, isAlignedLeft, title, titleStyle, logoImgSrc, imgSrc, buttonName, linkTo, children, isDownload }) {
    return (
        <div style={{position: 'relative'}}>
            { nBullets != null && (<BreadcrumbSideMenu nBullets={nBullets} highlightNumber={highlightNumber}/>) }
            <Section CHeroLogo={CHeroLogo} isAlignedLeft={isAlignedLeft} isReverse={isReverse == true? true : false} titleStyle={titleStyle} title={title} isDownload={isDownload} imgSrc={imgSrc} logoImgSrc={logoImgSrc} buttonName={buttonName} linkTo={linkTo}>
                { children }
            </Section>
            <LandingPageSeparator type="8"/>
        </div>
    )
}

export default function() {
    
    return (
        <div>

            <HeroSection
                nBullets={4} highlightNumber={0}
                isDownload={true} linkTo={"/Download/Transition_Guide_2024-05-01.pdf"}
                imgSrc="/LandingPage/Learn2.png"
                CHeroLogo={<HeroSectionTitle imgSrc="/LandingPage/TransitionGuideLogo.png"/>}
                buttonName="Transition Guide">
                If you're familiar with Dungeons and Dragons or Pathfinder, check out this transition guide. It explains the differences and how to transition smoothly to Questguard.
            </HeroSection>

            <HeroSection
                nBullets={4} highlightNumber={1}
                isReverse={true} isDownload={true}
                CHeroLogo={<HeroSectionTitle imgSrc="/LandingPage/CharacterCreationLogo.png"/>}
                imgSrc="/LandingPage/Learn4.png"
                buttonName="Creation Guide"
                linkTo="/Download/Character_Creation_Guide_2024-05-01.pdf">
                Learn how to create a Character and fill in the Character Sheet in QuestGuard. Be sure to share it over on our Discord community when you're done!
            </HeroSection>


            <HeroSection
                nBullets={4} highlightNumber={2}
                CHeroLogo={<HeroSectionTitle title="For New Players"/>}
                imgSrc="/LandingPage/Learn3.png"
                buttonName="Tutorial"
                linkTo="/Other/TransitionGuide">
                Learn about tabletop roleplaying games and the very basics. Recommended if you are completely new to the genre, and have never played Questguard, Dungeons & Dragons or other similar social games.
            </HeroSection>

            <HeroSection
                nBullets={4} highlightNumber={2}
                isReverse={true}
                CHeroLogo={<HeroSectionTitle title="Rules Glossary"/>}
                imgSrc="/LandingPage/Learn.png"
                buttonName="View Rules"
                linkTo="/Other/Rules">
                Click here for the complete in-depth character creation, rules, clarifications and interactions. Everthing about Questguard inside a neatly tied table of contents.
            </HeroSection>
            {/* <div style={{position: 'relative'}}>
                <BreadcrumbSideMenu nBullets={4} highlightNumber={0}/>
                <Section isDownload={true} imgSrc="/LandingPage/Learn2.png" logoImgSrc="/LandingPage/TransitionGuideLogo.png" buttonName="Transition Guide" linkTo="/Download/Transition_Guide_2024-05-01.pdf">
                    If you're familiar with Dungeons and Dragons or Pathfinder, check out this transition guide. It explains the differences and how to transition smoothly to Questguard.
                </Section>
                <LandingPageSeparator type="8"/>
            </div> */}

            {/* <div style={{position: 'relative'}}>
                <BreadcrumbSideMenu nBullets={4} highlightNumber={1}/>
                <Section isReverse={true} isDownload={true} logoImgSrc="/LandingPage/CharacterCreationLogo.png" imgSrc="/LandingPage/Learn4.png" buttonName="Creation Guide" linkTo="/Download/Character_Creation_Guide_2024-05-01.pdf">
                    Learn how to create a Character and fill in the Character Sheet in QuestGuard. Be sure to share it over on our Discord community when you're done!
                </Section>
                <LandingPageSeparator type="8"/>
            </div> */}

            {/* <div style={{position: 'relative'}}>
                <BreadcrumbSideMenu nBullets={4} highlightNumber={2}/>
                <Section title="For New Players" imgSrc="/LandingPage/Learn3.png" buttonName="Tutorial" linkTo="/Other/TransitionGuide">
                    Learn about tabletop roleplaying games and the very basics. Recommended if you are completely new to the genre, and have never played Questguard, Dungeons & Dragons or other similar social games.
                </Section>
                <LandingPageSeparator type="8"/>
            </div>

            <div style={{position: 'relative'}}>
                <BreadcrumbSideMenu nBullets={4} highlightNumber={3}/>
                <Section isReverse={true} title="Rules Glossary" imgSrc="/LandingPage/Learn.png" buttonName="View Rules" linkTo="/Other/Rules">
                    Click here for the complete in-depth character creation, rules, clarifications and interactions. Everthing about Questguard inside a neatly tied table of contents.
                </Section>
                <LandingPageSeparator type="8"/>
            </div> */}

       </div>
    )
}