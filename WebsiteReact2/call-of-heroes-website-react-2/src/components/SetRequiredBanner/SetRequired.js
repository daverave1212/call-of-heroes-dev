import { useDoIOwnSet } from "../../services/auth/Auth";
import SetRequiredBanner from "./SetRequiredBanner";


export default function SetRequired({ setName, children }) {
    const doIOwnSet = useDoIOwnSet(setName)

    if (!doIOwnSet) {
        return <SetRequiredBanner setName={setName}/>
    }

    return children
}