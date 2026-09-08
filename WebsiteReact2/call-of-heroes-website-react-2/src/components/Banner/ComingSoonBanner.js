import { QGTitle1 } from "../../pages/Tools/TitleGenerator";
import { capitalizeFirstLetter } from "../../utils";
import Banner from "./Banner";


export default function ComingSoonBanner({ when="Kickstarter launch" }) {
    return <Banner title="Coming Soon">
        <p>The rest of this content will be available at {when}. Stay tuned!</p>
    </Banner>
}