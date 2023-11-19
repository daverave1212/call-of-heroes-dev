import { Link } from "react-router-dom";
import LandingPageSeparator from "../../../components/LandingPageSeparator/LandingPageSeparator";

export default function() {
    // For New Players
    // For D&D Players (or Pathfinder)
    // Character Creation
    // Tools
    // Rules Glossary
    return (
        <div>
            <div className="hero-page">
                <div className='hero-image-container smaller'>
                    <img src="/LandingPage/Learn2.png"/>
                </div>

                <div className='hero-content'>
                    <h1 className="hero-logo-text">For New Players</h1>
                    <p className='home-text-style' style={{textAlign: 'center'}}>
                        Learn about tabletop roleplaying games and the very basics. Recommended if you are completely new to the genre, and have never played Questguard, Dungeons & Dragons or other similar social games.
                    </p>
                    
                    <div className='hero-buttons'>
                        <button className='Basic-button'>
                            <Link to="/Other/HowToPlayForNewPlayers">Tutorial</Link>
                        </button>
                        <div className='hero-buttons-separators'>
                            <img src="/button-separator.png"/>
                            <img src="/button-separator-reversed.png"/>
                        </div>
                    </div>

                </div>
            </div>

            <LandingPageSeparator type="8"/>

            <div className="hero-page">
                <div className='hero-image-container reversed'>
                    <img src="/LandingPage/Learn3.png" style={{height: '80%', marginTop: '5%'}}/>
                </div>

                <div className='hero-content reversed'>
                    <h1 className="hero-logo-text">For <span style={{color: '#880000'}}>D&D</span> Players</h1>
                    <p className='home-text-style' style={{textAlign: 'center'}}>
                        If you're familiar with Dungeons and Dragons or Pathfinder, check out this transition guide. It explains the differences and how to transition smoothly to Questguard.
                    </p>
                    
                    <div className='hero-buttons'>
                        <button className='Basic-button'>
                            <Link to="/Other/TransitionGuide">Transition Guide</Link>
                        </button>
                        <div className='hero-buttons-separators'>
                            <img src="/button-separator.png"/>
                            <img src="/button-separator-reversed.png"/>
                        </div>
                    </div>

                </div>
            </div>

            <LandingPageSeparator type="8"/>

            <div className="hero-page">
                <div className='hero-image-container'>
                    <img src="/LandingPage/Learn.png"/>
                </div>

                <div className='hero-content'>
                    <h1 className="hero-logo-text">Rules Glossary</h1>
                    <p className='home-text-style' style={{textAlign: 'center'}}>
                        Click here for the complete in-depth character creation, rules, clarifications and interactions. Everthing about Questguard inside a neatly tied table of contents.
                    </p>
                    
                    <div className='hero-buttons'>
                        <button className='Basic-button'>
                            <Link to="/Other/Rules">Rules</Link>
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