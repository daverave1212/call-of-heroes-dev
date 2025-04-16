import { useState } from "react";
import { useLocalStorageState } from "../../../utils";
import { SelectorsByColumns } from "../Abilities";
import Weapons from "../Weapons";
import Armors from "../Armors";
import Prices from "../Prices";

export function useGold() {
    return useLocalStorageState('SectionShopGold', 1000)
}

export function useInventory() {
    return useLocalStorageState('SectionShopInventory', '')
}

export default function SectionShop() {

    let [gold, setGold] = useGold()
    let [inventory, setInventory] = useInventory()

    let [selectedShopName, setSelectedShopName] = useState('Weapons')

    const shopSelectorData = [
        { name: 'Weapons', src: '/Icons/Items/Hand_Axe.png' },
        { name: 'Armors', src: '/Icons/Items/Plate_Armor.png' },
        { name: 'Goods', src: '/Icons/Items/Bag_of_Useful_Items.png' },
    ]

    return (
        <div>
            <SelectorsByColumns selectorData={shopSelectorData} nColumns={1} selectedSelectorName={selectedShopName} setSelectedSelectorName={setSelectedShopName}/>
            { selectedShopName == 'Weapons'? (
                <Weapons hasNoMargins={true}/>
            ) : selectedShopName == 'Armors'? (
                <Armors hasNoMargins={true}/>
            ) : (
                <Prices hasNoMargins={true}/>
            )}
        </div>
    )

}