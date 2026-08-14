import ProgressBar from '../ResourceBar/ProgressBar'
import './BigStat.css'

export function BigStatValue({
    name,
    value,
    displayValue = val => val,
    onClick,
    className, children, style,
    hasProgressBar=false,
    progressBarValue=0,
    progressBarMax=0,
    progessBarHasNumbers=true
}) {
    const extraClasses = className?.includes('small')? '': 'large'
    return (
        <div className={`stat-input ${extraClasses} ${onClick == null? '': 'pointer'} ${className}`} style={style}>
            <div onClick={onClick}>{ displayValue(value) }</div>


            { hasProgressBar? <>
                <div className="input-name input-name-styled" style={{bottom: '1.5rem'}}>{ name }</div>
                <div className='flex absolute full-width padding-quarter' style={{bottom: '0'}}>
                    <ProgressBar value={progressBarValue} maxValue={progressBarMax} color2="var(--theme-color)" isSmall={true} hasNumbers={progessBarHasNumbers}/>
                </div>
              </>:
                <div className="input-name input-name-styled">{ name }</div>
            }
            { children && (
                <div style={{zIndex: "var(--z-overlay)"}}>
                    { children }
                </div>
            ) }
            
        </div>
    )
}