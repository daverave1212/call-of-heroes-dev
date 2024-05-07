import { Link } from "react-router-dom";
import LandingPageSeparator from "../../../components/LandingPageSeparator/LandingPageSeparator";
import classNames from "classnames";

function NormalSection({ title, imgSrc, buttonName, linkTo, children, isDownload }) {

    return (
        <div className="hero-page">
            <div className='hero-image-container'>
                <img src={imgSrc}/>
            </div>

            <div className='hero-content'>
                <h1 className="hero-logo-text">{ title }</h1>
                <p className='home-text-style' style={{textAlign: 'center'}}>
                    { children }
                </p>
                
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
    )
}
function MaybeReverseSection({ title, imgSrc, buttonName, children, linkTo, isDownload }) {
    function Img() {
        return <img src={imgSrc} style={{height: '80%', marginTop: '5%'}}/>
    }
    return (
        <div>
            <div className="hero-page landscape-only">
                <div className='hero-image-container reversed'>
                    <Img/>
                </div>

                <div className='hero-content reversed'>
                    <h1 className="hero-logo-text">{ title }</h1>
                    <p className='home-text-style' style={{textAlign: 'center'}}>
                        { children }
                    </p>
                    
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
            <div className="hero-page portrait-only">
                <div className='hero-image-container'>
                    <Img/>
                </div>

                <div className='hero-content'>
                    <h1 className="hero-logo-text">{ title }</h1>
                    <p className='home-text-style' style={{textAlign: 'center'}}>
                        { children }
                    </p>
                    
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

export default function() {
    // For New Players
    // For D&D Players (or Pathfinder)
    // Character Creation
    // Tools
    // Rules Glossary
    return (
        <div>
            <NormalSection isDownload={true} title="For D&D Players" imgSrc="/LandingPage/Learn2.png" buttonName="Transition Guide" linkTo="/Download/Transition_Guide_2024-05-01.pdf">
                If you're familiar with Dungeons and Dragons or Pathfinder, check out this transition guide. It explains the differences and how to transition smoothly to Questguard.
            </NormalSection>
            <LandingPageSeparator type="8"/>

            <MaybeReverseSection isDownload={true} title="Character Creation" imgSrc="/LandingPage/Learn4.png" buttonName="Creation Guide" linkTo="/Download/Character_Creation_Guide_2024-05-01.pdf">
                Learn how to create a Character and fill in the Character Sheet in QuestGuard. Be sure to share it over on our Discord community when you're done!
            </MaybeReverseSection>
            <LandingPageSeparator type="8"/>

            <NormalSection title="For New Players" imgSrc="/LandingPage/Learn3.png" buttonName="Tutorial" linkTo="/Other/TransitionGuide">
                Learn about tabletop roleplaying games and the very basics. Recommended if you are completely new to the genre, and have never played Questguard, Dungeons & Dragons or other similar social games.
            </NormalSection>
            <LandingPageSeparator type="8"/>

            <MaybeReverseSection title="Rules Glossary" imgSrc="/LandingPage/Learn.png" buttonName="View Rules" linkTo="/Other/Rules">
                Click here for the complete in-depth character creation, rules, clarifications and interactions. Everthing about Questguard inside a neatly tied table of contents.
            </MaybeReverseSection>
            <LandingPageSeparator type="8"/>

       </div>
    )
}