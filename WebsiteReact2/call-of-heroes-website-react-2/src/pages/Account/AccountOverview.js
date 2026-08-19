import { Link } from "react-router-dom";
import { useAuth, useOwnedSets } from "../../services/auth/Auth";
import { BlogPageHeader } from "../Meta/Blog";
import { capitalizeFirstLetter, useConstSetsConfig } from "../../utils";
import { DashboardBox } from "./HelperComponents/DashboardBox";
import Loading from "../../components/Loading/Loading";


export function AccountOverview() {

    const { user } = useAuth("AccountOverview")
    const [owendSets, isOwnedSetsLoading] = useOwnedSets()
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
            { isOwnedSetsLoading? (
                <div className="center-content">
                    <Loading/>
                </div>
            ): <>
                { nOwnedSets == 0 && (
                    <DashboardBox
                        name="😴 You do not own any products."
                        subtext="QuestGuard has a ton of unlockable content though! Check out all the products you can unlock!"
                    />
                ) }
                { Object.keys(owendSets).map(set => (
                    <DashboardBox name={capitalizeFirstLetter(set)} subtext="Digital Access" tag="Owned"/>
                )) }
            </> }
        </div>
    </div>
}


