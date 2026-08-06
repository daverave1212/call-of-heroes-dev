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
import Policies from "../Meta/Policies";

const TAB_SELECTORS_CONFIG = [
    {
        name: 'Account Overview',
        src: '/Icons/UI/Dashboard/Account Overview.png',
        title: user => `Welcome back, ${user.name}`,
        subtitle: () => `Here's what's happening on your QuestGuard account.`
    },
    {
        name: 'Activate a Product',
        src: '/Icons/UI/Dashboard/Activate Product.png',
        title: () => "Activate a product",
        subtitle: () => "Got a code? Type it in to activate it!"
    },
    {
        name: 'Terms & Policies',
        src: '/Icons/UI/Dashboard/Terms.png',
        title: () => "Terms, Conditions, Cookies & Policies",
        subtitle: () => "This section contains everything regarding copyright, privcy, legal, etc."
    },
    {
        displayName: 'Sign Out',
        src: '/Icons/UI/Dashboard/Sign Out.png',
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

            <div className="flex-grow source-sans white landscape-only">
                { displayName ?? name }
            </div>
        </div>
    }

    return <div className="padding-1 dashboard-menu">
        <p className="theme-color source-sans landscape-only">MY ACCOUNT</p>
        <div className="flex column gap-half padding-top-1">
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

    const dbMenu = <DashboardMenu activeTabI={activeTabI} setActiveTabI={setActiveTabI}/>

    return <LoginRequired location="MyAccount">

        <div className="my-account width-100 flex row">
            <div className="flex-2 landscape-only">
                {dbMenu}
            </div>
            <div className="flex-1 portrait-only">
                {dbMenu}
            </div>
            <div className="flex-8" style={{backgroundColor: 'white'}}>
                <div className="width-100">
                    <BlogPageHeader isInPage={false} title={activeTabData.title?.(user)} subtitle={activeTabData.subtitle?.()}/>
                </div>
                <TabsContentOnly activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabComponents={[
                    <AccountOverview/>,
                    <ActivateProduct/>,
                    <div>
                        <Policies/>
                    </div>,
                    <div></div>
                ]}/>
            </div>
        </div>

    </LoginRequired>

}