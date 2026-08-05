import { Link } from "react-router-dom";
import { useAuth, useOwnedSets } from "../../services/auth/Auth";
import { BlogPageHeader } from "../Meta/Blog";
import { capitalizeFirstLetter } from "../../utils";


export function AccountOverview() {

    const { user } = useAuth("AccountOverview")
    const owendSets = useOwnedSets()

    return <div className="flex column gap-2 padding-2">
        <div>
            <h2 className="home-font margin-bottom-1">Owned Products</h2>

            { Object.keys(owendSets).map(set => (
                <div className="dashboard-panel flex column width-100 gap-quarter padding-top-1">
                    <div className="flex-left-right">
                        <h3 className="home-font">{capitalizeFirstLetter(set)}</h3>
                        <Link className="theme-color source-sans" to="/WorkInProgress">See All Products</Link>
                    </div>
                    <div className="flex column gap-1">
                        <p className="source-sans gray">Digital Access</p>
                        <div>
                            <span className="tag green home-font margin-0">Owned</span>
                        </div>
                    </div>
                </div>
            )) }
        </div>
    </div>
}