import React from 'react'

import './HomeBanner.css'

export default function HomeBanner2({ title, text }) {
    return (
        <div className='home-banner-2'>
            <div className='home-banner-2__img-wrapper'>
                <img src={`/Banners/${title}.png`}/>
            </div>
            <div className='home-banner-2__bottom'>
                <h2>{title}</h2>
            </div>
        </div>
    )
}