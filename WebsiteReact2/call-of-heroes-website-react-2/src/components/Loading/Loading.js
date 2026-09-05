
import './Loading.css'

export default function Loading({ style, className, id }) {
    return <span className="loader"></span>
}
export function LoadingCenter({ style, className='', id }) {
    return <div style={style} id={id} className={`center-content width-100 padding-2 ${className}`}>
        <Loading/>
    </div>
}