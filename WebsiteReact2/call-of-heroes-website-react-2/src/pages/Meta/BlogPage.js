import Page from '../../containers/Page/Page'
import PatchNotes from '../../databases/Other/PatchNotes.json'
import './Blog.css'
import { getPageHashFromLocation, parseTextWithSymbols } from '../../utils'

import { useLocation } from 'react-router-dom'
import BlogPost from './BlogPost'

export default function BlogPage() {

    const location = useLocation()
    const postTitle = getPageHashFromLocation(location)
    const postContent = PatchNotes[postTitle]

    console.log({postTitle, postContent})

    return <BlogPost title={postTitle} blog={postContent}/>
    
}