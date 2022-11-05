import React from 'react'

import './HomeBanner.css'

export default function HomeBanner1({ title, text }) {
    return (
        <div className='home-banner-1'>
            <img src="/Banners/Dwarf.png"/>
            <div className='home-banner__dark-overlay'></div>
            <div className='home-banner__window'>
                <div className='home-banner__content'>
                    <h2>{title}</h2>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}