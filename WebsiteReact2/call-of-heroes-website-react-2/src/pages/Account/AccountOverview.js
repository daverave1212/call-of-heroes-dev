import { Link } from "react-router-dom";
import { useAuth, useOwnedSets } from "../../services/auth/Auth";
import { BlogPageHeader } from "../Meta/Blog";
import { capitalizeFirstLetter, useConstSetsConfig } from "../../utils";


export function AccountOverview() {

    const { user } = useAuth("AccountOverview")
    const owendSets = useOwnedSets()
    const nOwnedSets = Object.keys(owendSets).length
    
    const setsConfig = useConstSetsConfig()
    const nSetsTotal = Object.keys(setsConfig).length - 1

    return <div className="flex column gap-2 padding-2">
        <div>
            <h2 className="home-font margin-bottom-1">My Account</h2>
            <div className="dashboard-panel flex column gap-quarter">
                <h3 className="home-font">{user.name}</h3>
                <p className="gray">{user.email}</p>
            </div>
        </div>

        <div>
            <h2 className="home-font margin-bottom-1">Owned Products ({nOwnedSets}/{nSetsTotal})</h2>
            { nOwnedSets == 0 && (
                <OwnedProductBox
                    name="😴 You do not own any products."
                    subtext="QuestGuard has a ton of unlockable content though! Check out all the products you can unlock!"
                />
            ) }
            { Object.keys(owendSets).map(set => (
                <OwnedProductBox name={capitalizeFirstLetter(set)} subtext="Digital Access" tag="Owned"/>
            )) }
        </div>
    </div>
}


function OwnedProductBox({ name, subtext, tag }) {
    return <div className="dashboard-panel flex column width-100 gap-quarter padding-top-1">
        <div className="flex-left-right">
            <h3 className="home-font">{name}</h3>
            <Link className="theme-color source-sans" to="/WorkInProgress">See All Products</Link>
        </div>
        <div className="flex column gap-1">
            <p className="source-sans gray">{subtext}</p>
            { tag && (
                <div>
                    <span className="tag green home-font margin-0">{tag}</span>
                </div>  
            ) }
        </div>
    </div>
}