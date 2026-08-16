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
import { HeroSlide } from "../../../components/HeroSlide/HeroSlide";

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
        <div style={{backgroundColor: 'white'}}>

            <HeroSlide
                id={"Transition-Guide"}
                src="/LandingPage/Learn2.png"
                isReverse={false}
            >
                <QGTitle1 text="Transition Guide" height={60}/>
                <p className="hero-text">If you're familiar with other mainstream tabletop RPG's, check out this transition guide. It explains the differences and how to transition smoothly to QuestGuard.</p>
                <a download={true} href="/Download/Transition_Guide_2026-05-23.pdf" className="btn hero-text">Transition Guide</a>
            </HeroSlide>            

            <HeroSlide
                id={"Character-Creation"}
                src="/LandingPage/KnightSketch.png"
                isReverse={true}
            >
                <QGTitle1 text="Hero Creation" height={60}/>
                <p className="hero-text">Learn how to create a Hero in QuestGuard. Use our awesome <Link to="/Tools/CharacterCreationCalculator"><b>online Hero builder</b></Link>, and be sure to share it over on our Discord community when you're done!</p>
                <Link to="/Tools/CharacterCreationCalculator" className="btn hero-text">Create Hero</Link>
            </HeroSlide>

            <HeroSlide
                id={"Newbie Guide"}
                src="/LandingPage/Learn3.png"
                isReverse={false}
            >
                <QGTitle1 text="Newbie Guide" height={60}/>
                <p className="hero-text">Learn about tabletop roleplaying games and the very basics. Recommended if you are completely new to the genre, and have never played Questguard, Dungeons & Dragons or other similar social games.</p>
                <button disabled>Coming Soon!</button>
            </HeroSlide>

            <HeroSlide
                id={"All Rules"}
                src="/LandingPage/Learn.png"
                isReverse={true}
            >
                <QGTitle1 text="All Rules" height={60}/>
                <p className="hero-text">Click here for the complete in-depth character creation, rules, clarifications and interactions. Everthing about Questguard inside a neatly tied table of contents.</p>
                <Link to="/Other/Rules" className="btn hero-text">See Glossary</Link>
            </HeroSlide>

       </div>
    )
}