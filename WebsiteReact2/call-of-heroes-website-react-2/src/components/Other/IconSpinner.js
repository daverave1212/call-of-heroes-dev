export function IconSpinner({ src, className }) {
    return (
        <div className={className} style={{position: 'relative'}}>
            <img className='non-spell-icon' src={src}/>
            <div className='non-spell-spinner'></div>
        </div>
    )
}