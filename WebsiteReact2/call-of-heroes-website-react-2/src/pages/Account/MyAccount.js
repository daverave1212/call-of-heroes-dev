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
import WorkInProgress from "../Meta/WorkInProgress";

import './MyAccount.css'
import { AccountOverview } from "./AccountOverview";
import { BlogPageHeader } from "../Meta/Blog";

const TAB_SELECTORS_CONFIG = [
    {
        name: 'Account Overview',
        src: '/Icons/Items/Lesser_Scroll.png',
        title: user => `Welcome back, ${user.name}`,
        subtitle: () => `Here's what's happening on your QuestGuard account.`
    },
    {
        name: 'Activate a Product',
        src: '/Icons/Items/Rune_of_Greater_Spell.png',
        title: () => "Activate a product",
        subtitle: () => "Got a code? Type it in to activate it!"
    },
    {
        displayName: 'Sign Out',
        src: '/Icons/Spells/Banner_of_Honor.png',
        onClick() {
            logout()
        }
    }
]

function DashboardMenu({ activeTabI, setActiveTabI }) {


    function DashboardMenuItem({ name, displayName, src, onClick, i }) {

        function onMenuItemClick() {
            setActiveTabI(i)
            onClick?.()
        }

        return <div className={`dashboard-menu-item flex-row gap-1 padding-1 white align-center pointer ${i == activeTabI? 'active': ''}`} onClick={onMenuItemClick}>
            <div className="dashboard-icon-box flex center-content flex-shrink">
                <img src={src}/>
            </div>

            <div className="flex-grow source-sans white">
                { displayName ?? name }
            </div>
        </div>
    }

    return <div className="padding-1 dashboard-menu">
        <p className="theme-color source-sans padding-left-1">MY ACCOUNT</p>
        <div className="flex column gap-half">
            { TAB_SELECTORS_CONFIG.map((tabCfg, i) => (
                <DashboardMenuItem {...tabCfg} i={i}/>
            )) }
        </div>
    </div>
}


export default function MyAccount() {
    
    const { user } = useAuth('MyAccount')

    const [activeTabI, setActiveTabI] = useState(0)
    const activeTabData = TAB_SELECTORS_CONFIG[activeTabI]

    return <LoginRequired location="MyAccount">

        <div className="my-account width-100 flex row">
            <div className="flex-1">
                <DashboardMenu activeTabI={activeTabI} setActiveTabI={setActiveTabI}/>
            </div>
            <div className="flex-4" style={{backgroundColor: 'white'}}>
                <div className="width-100">
                    <BlogPageHeader title={activeTabData.title?.(user)} subtitle={activeTabData.subtitle?.()}/>
                </div>
                <TabsContentOnly activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabComponents={[
                    <AccountOverview/>,
                    <ActivateProduct/>,
                    <div></div>
                ]}/>
            </div>
        </div>

    </LoginRequired>

    return <LoginRequired location={"MyAccount"}>
        <Page hasNoLimits={true} hasNoMargins={true}>
            <div className="flex-responsive padding-2" style={{gap: "2rem"}}>
                
                <div className="flex-column gap-1">
                    <h4 style={{ padding: 0, margin: 0, color: 'gray'}}>My Account | {user?.name}</h4>
                    { TAB_SELECTORS_CONFIG.map((selectorData, i) => (
                        <Selector onClick={() => setActiveTabI(i)} {...selectorData} isSelected={activeTabI == i}/>
                    )) }
                </div>

                <div className="flex-1">
                    <TabsContentOnly activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabComponents={[
                        <div id="My Account">
                            <WorkInProgress/>
                        </div>,
                        <ActivateProduct/>
                    ]}/>
                </div>
            </div>
        </Page>
    </LoginRequired>

}