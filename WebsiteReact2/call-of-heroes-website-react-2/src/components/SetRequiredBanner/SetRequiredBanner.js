import { QGTitle1 } from "../../pages/Tools/TitleGenerator";
import { capitalizeFirstLetter } from "../../utils";
import Banner from "../Banner/Banner";




export default function SetRequiredBanner({ setName }) {
    setName = capitalizeFirstLetter(setName)

    return <Banner title={`${setName} Set`}>
        <p>The {setName} Set is required to unlock this content.</p>
        <button style={{minWidth: 'auto'}}>Unlock Now!</button>
    </Banner>
}