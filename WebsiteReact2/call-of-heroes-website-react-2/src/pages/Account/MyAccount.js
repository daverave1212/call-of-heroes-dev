import { useState } from "react";
import Accordion from "../../components/Accordion/Accordion";
import LoginRequired from "../../components/LoginRequired/LoginRequired";
import PageH3 from "../../components/PageH3/PageH3";
import Selector from "../../components/Selector/Selector";
import Tabs from "../../components/Tabs/Tabs";
import Page from "../../containers/Page/Page";
import { logout, useAuth } from "../../services/auth/Auth";
import { QGTitle1 } from "../Tools/TitleGenerator";
import TabsContentOnly from "../../components/Tabs/TabsContentOnly";
import ActivateProduct from "./ActivateProduct";


const TAB_SELECTORS_CONFIG = [
    {
        name: 'Account Overview',
        src: '/Icons/Items/Lesser_Scroll.png',
    },
    {
        name: 'Activate a Product',
        src: '/Icons/Items/Rune_of_Greater_Spell.png',
    },
    {
        displayName: <span style={{color: 'red'}}>Log Out</span>,
        src: '/Icons/Spells/Banner_of_Honor.png',
        onClick() {
            logout()
        }
    }
]

export default function MyAccount() {
    
    const { user } = useAuth('MyAccount')

    const [activeTabI, setActiveTabI] = useState(0)

    return <LoginRequired location={"MyAccount"}>
        <Page hasNoLimits={true} hasNoMargins={true}>
            <div className="flex-responsive padding-2" style={{gap: "2rem"}}>
                <div className="flex-column gap-1">
                    <h4 style={{ padding: 0, margin: 0, color: 'gray'}}>My Account | {user?.name}</h4>
                    { TAB_SELECTORS_CONFIG.map((selectorData, i) => (
                        <Selector onClick={() => setActiveTabI(i)} {...selectorData} isSelected={activeTabI == i}/>
                    )) }
                </div>
                <div>
                    <TabsContentOnly activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabComponents={[
                        <div id="My Account">
                            Here I am
                        </div>,
                        <ActivateProduct/>
                    ]}/>
                </div>
            </div>
        </Page>
    </LoginRequired>

}