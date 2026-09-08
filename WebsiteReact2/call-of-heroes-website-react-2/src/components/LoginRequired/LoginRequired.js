import { useIsLoggedIn } from "../../services/auth/Auth";
import { QGTitle1 } from "../../pages/Tools/TitleGenerator";
import Page from "../../containers/Page/Page";


export default function LoginRequired({location, children}) {

    if (location == null) {
        alert('ERROR: No location parameter given to LoginRequired!')
    }

    const isLoggedIn = useIsLoggedIn(location)

    if (!isLoggedIn) {
        return <div className="width-100 flex column center-content" style={{ backgroundColor: 'white', minHeight: '80vh'}}>
            <div className="center-content gap-3">
                <QGTitle1 text="Login Required" height={50}/>
                <p>You need to be logged in to view this page.</p>
            </div>
        </div>
    }

    return children
}