import Page from "../../containers/Page/Page";
import { QGTitle1 } from "../../pages/Tools/TitleGenerator";

export default function ErrorPage({ children, style, className }) {
    return <Page className={className} style={style}>
        <div className="center-content">
            <QGTitle1 text="Oops"/>
            <p>Oops! It seems an error has occured. Make sure you submit this to the developers and sorry for the inconvenience!</p>
            {children}
        </div>
    </Page>
}