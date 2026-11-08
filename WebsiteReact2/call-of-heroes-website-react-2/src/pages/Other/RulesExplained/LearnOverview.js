import Page from "../../../containers/Page/Page";

import './LearnOverview.css'

export function LearnOverview() {



    return <div className="page learn-overview">
        <div className="padding-2 gap-half">
            <h2>Quick Start Guide</h2>
            <p>Just need a quick overview? This guide is for you!</p>
        </div>
        <BlackSection>
            <div className="padding-2 gap-half">
                <h2>Transition Guide (PDF)</h2>
                <p>You a reader? Check out this guide to transition from D&D or Pathfinder!</p>
            </div>
        </BlackSection>
        <div className="padding-2 gap-half">
            <h2>New Player Guide</h2>
            <p>Are you brand new to tabletop RPG's? Here's a detailed, easy to understand explanation!</p>
        </div>
        <BlackSection>
            <div className="padding-2 gap-half">
                <h2>Rules Glossary</h2>
                <p>View all the rules in the game, organized as a glossary.</p>
            </div>
        </BlackSection>
    </div>
}

function BlackSection({children}) {
    return <div className="block" style={{color: 'white'}}>
        <img className="block width-100 flip-v" src="/separator-10.png"/>
        <div className="block width-100 margin-0" style={{backgroundColor: 'var(--darkest-gray-color)', marginTop: '-2px'}}>
            { children }
        </div>
        <img className="block width-100" src="/separator-10.png"/>
    </div>
}