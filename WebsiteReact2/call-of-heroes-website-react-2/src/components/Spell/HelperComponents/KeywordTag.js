import './KeywordTag.css'

export default function KeywordTag({ children }) {
    let style = {};
    let icon = null
    if (children?.includes?.('Keystone')) {
        style = { backgroundColor: 'var(--orange-color)' };
    } else if (children?.includes?.('Early Access')) {
        style = { backgroundColor: 'darkgreen' };
        icon = <Icon name="BlueCircle"/>
    }
    return <div className='spell-tag smaller-font' style={style} key={children}>{icon}{children}</div>;
}