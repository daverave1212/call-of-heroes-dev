import { QGTitle1 } from "../../pages/Tools/TitleGenerator";
import { capitalizeFirstLetter } from "../../utils";


export default function SetRequiredBanner({ setName }) {
    setName = capitalizeFirstLetter(setName)
    return <div className="width-100" style={{marginTop: '-35vh'}}>
        <div style={{height: '35vh', background: 'linear-gradient(to bottom, transparent, #ffffff)'}}/>
        <div style={{backgroundColor: 'white'}} className="flex column center-content center-text gap-1 padding-bottom-4">
            <QGTitle1 text={`${setName} Set`}/>
            <p>The {setName} Set is required to unlock this content.</p>
            <button style={{minWidth: 'auto'}}>Unlock Now!</button>
        </div>
    </div>
}