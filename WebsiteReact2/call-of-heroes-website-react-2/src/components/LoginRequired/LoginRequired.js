import { QGTitle1 } from "../../pages/Tools/TitleGenerator";


export default function LoginRequired() {
    return <div className="center-content">
        <QGTitle1 text="Login Required" height={50}/>
        <p>You need to be logged in to view this page.</p>
    </div>
}