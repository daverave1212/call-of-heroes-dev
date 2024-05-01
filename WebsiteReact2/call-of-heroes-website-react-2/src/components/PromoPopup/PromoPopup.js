import './PromoPopup.css'

export default function PromoPopup({children, id}) {
    return (
        <div id={id} className='promo-popup'>
            { children }
        </div>
    )
}