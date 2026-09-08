import { QGTitle1 } from "../../pages/Tools/TitleGenerator";


export default function Banner({ title, children }) {
    return <div className="width-100" style={{marginTop: '-35vh'}}>
        <div style={{height: '45vh', background: 'linear-gradient(to bottom, transparent, #ffffff)'}}/>
        <div style={{backgroundColor: 'white'}} className="flex column center-content center-text gap-3 padding-bottom-4">
            <QGTitle1 text={title}/>
            { children }
        </div>
    </div>
}