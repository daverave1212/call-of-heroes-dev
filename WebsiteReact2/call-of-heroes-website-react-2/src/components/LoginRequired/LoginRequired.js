import { useIsLoggedIn } from "../../Auth";
import { QGTitle1 } from "../../pages/Tools/TitleGenerator";


export default function LoginRequired({location, children}) {

    if (location == null) {
        alert('ERROR: No location parameter given to LoginRequired!')
    }

    const isLoggedIn = useIsLoggedIn(location)

    if (!isLoggedIn) {
        return <div className="center-content">
            <QGTitle1 text="Login Required" height={50}/>
            <p>You need to be logged in to view this page.</p>
        </div>
    }

    return children
}