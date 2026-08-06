import Page from '../../containers/Page/Page'
import PatchNotes from '../../databases/Other/PatchNotes.json'
import './Blog.css'
import { getDaysSince, parseTextWithSymbols, useConstIsPortrait } from '../../utils'

import { Link } from 'react-router-dom'

export function BlogPageHeader({ title, subtitle, isInPage=true }) {

    return <>
        <div className="blog-page-header">
            <div className={`${isInPage? 'page-content': ''} flex column gap-1 white`} style={{paddingBottom: 0}}>
                <h1 className='home-font-bold white'>{title}</h1>
                <p className='source-sans'>{subtitle}</p>
            </div>
        </div>
        <img className="full-width padding-0 margin-0" src="/separator-10.png"/>
    </>
}

export default function Blog() {

    console.log({PatchNotes})

    return <div className='width-100'>
        <BlogPageHeader title="QuestGuard Posts & Updates" subtitle="Patch notes, insight, and stories from the world of QuestGuard."/>
        <Page>
            <div className='padding-1 padding-top-4 flex column gap-1'>
                { Object.entries(PatchNotes).map(([title, content]) => (
                    <BlogPostPreview title={title} content={content}/>
                )) }
            </div>
        </Page>        
    </div>

}


export function BlogPostPreview({title, content}) {

    const { Date, Type, Intro } = content
    const daysSincePost = getDaysSince(Date)
    const isNew = daysSincePost <= 7

    const text = (Intro && parseTextWithSymbols(Intro)) ?? 'See what this post is about!'

    return <div className={`blog-post-preview flex column gap-1 ${isNew? 'breathing-glow': ''}`}>
        <div className="theme-color home-font-bold" style={{opacity: '0.8'}}>{Type?.toUpperCase() ?? ''} {isNew? '(NEW!)': ''}</div>
        <div className='flex row'>
            <div className='flex column flex-4' style={{paddingRight: '1rem', gap: '0rem'}}>
                <h3 className='padding-0 margin-0 home-font-bold' style={{fontSize: '1.5rem' }}>{title}</h3>
                <p className='padding-top-half source-sans' style={{fontWeight: 'normal'}}>{text}</p>
                <Link className="home-font theme-color bold padding-top-1" to={`/Meta/BlogPage#${title}`}>Read More →</Link>
            </div>
            <div className='flex column flex-1 gap-half padding-2' style={{paddingTop: '0rem', borderLeft: 'solid #DEDEDE 1px'}}>
                <div className='gray gray-text source-sans'><img src="/Icons/UI/Calendar.png" className='inline-icon'/>&nbsp;{Date}</div>
                <div className='gray gray-text source-sans'><img src="/Icons/UI/Cooldown.png" className='inline-icon'/>&nbsp;5 minute read</div>
            </div>
        </div>
    </div>
}