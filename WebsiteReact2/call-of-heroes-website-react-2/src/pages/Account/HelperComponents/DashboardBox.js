import { Link } from "react-router-dom"

export function DashboardBox({ className, style, name, subtext, tag, children, cornerText="See All Products" }) {
    return <div className={`dashboard-panel flex column width-100 gap-quarter padding-top-1 ${className}`} style={style}>
        { name && <div className="flex-left-right">
            <h3 className="home-font">{name}</h3>
            { cornerText && <Link className="theme-color source-sans" to="/WorkInProgress">{cornerText}</Link> }
        </div> }
        { subtext && <div className="flex column gap-1">
            <p className="source-sans gray">{subtext}</p>
            { tag && (
                <div>
                    <span className="tag green home-font margin-0">{tag}</span>
                </div>  
            ) }
        </div> }
        { children }
    </div>
}