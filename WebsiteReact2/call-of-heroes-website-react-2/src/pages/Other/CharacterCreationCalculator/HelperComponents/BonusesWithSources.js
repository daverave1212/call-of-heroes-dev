

function BonusesWithSources({bonusesSources}) {
    return <>{
        bonusesSources.map(source => <div className="extra" style={{color: 'var(--green-color)'}}>
            { source.bonus >= 0? <span>+</span>: ''}
            { source.bonus } { source.statName }
            &nbsp;({ source.source })
        </div>)
    }</>
} 