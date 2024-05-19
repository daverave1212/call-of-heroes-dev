import { numbersUntil } from '../../utils'
import Icon from '../Icon'
import './BreadcrumbSideMenu.css'

export default function BreadcrumbSideMenu({ nBullets, highlightNumber }) {
    const numbers = numbersUntil(nBullets)
    return (
        <div className='breadcrumb-side-menu-container'>
            <div className='breadcrumb-side-menu'>
                <img className="breadcrumb-arrow up" src="/SharpEdgeUp.png"/>
                <img className="breadcrumb-arrow down" src="/SharpEdgeUp.png"/>
                { numbers.map(num => (
                    <div>
                        { num == highlightNumber ?
                            <img src="/Icons/UI/BulletPoint4Filled.png"/> :
                            <img src="/Icons/UI/BulletPoint4.png"/>
                        }
                    </div>
                )) }
            </div>
        </div>
    )
}

