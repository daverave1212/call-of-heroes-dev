import { Link } from 'react-router-dom'
import './HeroButton.css'

export default function HeroButton({ children, style, onClick, isDownload, href, className, isCustomContent }) {
    return (
        <div className={`hero-button ${className}`} style={style} onClick={onClick}>
            { isDownload === true?
                <a href={href} target="_blank" download>{ children }</a> :
              href != null && href.startsWith('#')?
                <a href={href}>{ children }</a> :
              isCustomContent === true?
                <div className='hero-button-content'>{ children }</div> :
              <Link to={href}>{ children }</Link>
            }
        </div>
    )
}