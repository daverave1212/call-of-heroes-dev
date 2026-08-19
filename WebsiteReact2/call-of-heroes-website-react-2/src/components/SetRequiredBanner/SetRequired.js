import { useDoIOwnSet } from "../../services/auth/Auth";
import Loading from "../Loading/Loading";
import SetRequiredBanner from "./SetRequiredBanner";


export default function SetRequired({ setName, children }) {
    const [doIOwnSet, isLoading] = useDoIOwnSet(setName)

    if (isLoading) {
        return <div className="box">
            <Loading/>
        </div>
    }

    if (!doIOwnSet) {
        return <SetRequiredBanner setName={setName}/>
    }

    return children
}