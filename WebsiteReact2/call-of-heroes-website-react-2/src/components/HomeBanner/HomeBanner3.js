import React from 'react'

import './HomeBanner.css'

export default function HomeBanner3({ title, text }) {
    return (
        <div className='home-banner-3'>
            <div className='home-banner-3__img-wrapper'>
                <img className='home-banner__img' src={`/Banners/Undernav/${title}.png`}/>
            </div>
            <div className='home-banner-3__bottom'>
                <h2>{title}</h2>
            </div>
        </div>
    )
}