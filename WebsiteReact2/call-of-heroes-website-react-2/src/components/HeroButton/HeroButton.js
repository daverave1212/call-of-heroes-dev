import { Link } from 'react-router-dom'
import './HeroButton.css'

export default function HeroButton({ children, onClick, isDownload, href }) {
    return (
        <div className='hero-button'>
            { isDownload === true? 
                <a href={href} target="_blank" download>{ children }</a> :
                <Link to={href}>{ children }</Link>
            }
        </div>
    )
}