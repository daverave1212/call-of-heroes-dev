

export default function TabsContentOnly({ tabComponents, activeTabI, setActiveTabI, activeTabName, setActiveTabName, className, style }) {
    
    const selectedTabComponent = tabComponents[activeTabI]

    return <div className={className} style={style}>
        { selectedTabComponent }
    </div>

}