import React, { useState } from 'react'
import PageH2 from '../../components/PageH2/PageH2'
import PageH3 from '../../components/PageH3/PageH3'
import Page from '../../containers/Page/Page'

import patchNotes from '../../databases/Other/PatchNotes.json'
import { def, getOnlyProp, isNumber, isObject, isString } from '../../utils'
import BlogPost from './BlogPost'


export default function PatchNotes() {

    return <div>
        { Object.entries(patchNotes).map(([title, content]) => (
            <BlogPost title={title} blog={content}/>
        )) }
    </div>

}