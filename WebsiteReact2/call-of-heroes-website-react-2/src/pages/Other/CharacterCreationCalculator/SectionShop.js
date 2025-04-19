import React, { useState } from "react";
import { getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "../../../utils";
import { SelectorsByColumns } from "../Abilities";
import Weapons from "../Weapons";
import Armors from "../Armors";
import Prices from "../Prices";
import { QGTitle1 } from "../../Tools/TitleGenerator";
import TableNormal from "../../../components/TableNormal/TableNormal";
import Icon from "../../../components/Icon";
import HeroButton from "../../../components/HeroButton/HeroButton";
import { StatValue } from "./SectionStats";
import { useCharacterShoppingCart, useGetSetCart, useGold, useInventory } from "./CharacterData";



function PricePage({ selectedShopName }) {  // Exists to prevent rerender

    const [getCart, setCart] = useGetSetCart()  // To prevent rerender

    function onWeaponOrArmorClick(item) {
        if (item.Price == null) return
        setCart([...getCart(), { name: item.Name, price: item.Price }])
    }
    function onGoodsItemClick({ name, price, effect }) {
        if (price == null) return
        setCart([...getCart(), { name, price }])
    }

    return (
        <div key="shop-items">
            { selectedShopName == 'Weapons'? (
                <Weapons hasNoMargins={true} onClick={onWeaponOrArmorClick} buttonText="Add"/>
            ) : selectedShopName == 'Armors'? (
                <Armors hasNoMargins={true} onClick={onWeaponOrArmorClick} buttonText="Add"/>
            ) : (
                <Prices key="Goods" hasNoMargins={true} shouldPlayAnimationOnClick={true} onClick={item => onGoodsItemClick(item)}/>
            )}
        </div>
    )
}
const PricePageMemoed = React.memo(PricePage)

export default function SectionShop() {

    let [gold, setGold] = useGold()
    let [inventory, setInventory] = useInventory()
    let [cart, setCart] = useCharacterShoppingCart()
    const totalPrice = cart.map(item => item.price).reduce((sum, price) => sum + price, 0)

    let [selectedShopName, setSelectedShopName] = useState('Weapons')

    const shopSelectorData = [
        { name: 'Weapons', src: '/Icons/Items/Hand_Axe.png' },
        { name: 'Armors', src: '/Icons/Items/Plate_Armor.png' },
        { name: 'Goods', src: '/Icons/Items/Bag_of_Useful_Items.png' },
    ]

    
    function onGoodsItemClick({ name, price, effect }) {
        if (price == null) return
        setCart([...cart, { name, price }])
    }
    function removeItem(itemName) {
        const index = cart.findIndex(item => item.name == itemName)
        let newCart = [...cart]
        newCart.splice(index, 1)
        setCart(newCart)
    }
    function clearCart() {
        setCart([])
    }
    function checkout() {
        const cartItemNames = cart.map(item => item.name)
        const cartItems = cartItemNames.reduce((soFar, itemName) => (
            soFar[itemName] == null?
                { ...soFar, [itemName]: 1 }:
            {...soFar, [itemName]: soFar[itemName] + 1}
        ), {})
        const cartItemsText = Object.keys(cartItems).map(itemName => `${itemName}${cartItems[itemName] > 1? ` (${cartItems[itemName]})`: ``}`).join(', ')
        const newInventory = inventory.endsWith('\n')? inventory + cartItemsText: (inventory + '\n' + cartItemsText)
        setInventory(newInventory.trim())
        setGold(gold - totalPrice)
        clearCart()
    }


    return (
        <div>
            <div className="center-content">
                <QGTitle1 text={"Cart"}/>
            </div>
            
            <div className="center-content">
                <StatValue name="Your Gold" value={gold} style={{borderColor: 'var(--orange-color)'}}/>
            </div>

            { cart.length == 0? (
                <h4 className="margin-top-1 center-text" style={{fontFamily: 'HomeFont', fontWeight: 'normal', fontSize: '1.25rem'}}>You have no items in your cart. Scroll down and add some!</h4>
            ): (
                <div>
                    <TableNormal columns={['Item', 'Price']}>
                        { cart.map(({name, price}) => (
                            <tr onClick={() => removeItem(name)}>
                                <td>{ name }</td>
                                <td> {price}<Icon name="Gold"/></td>
                            </tr>
                        )) }
                    </TableNormal>

                    <div className="flex-row center-content gap-1">
                        <button onClick={checkout}>Checkout for {totalPrice}<Icon name="Gold" style={{marginTop: '4px', marginLeft: '2px', height: '17px'}}/></button>
                        <button style={{maxWidth: '175px'}} onClick={clearCart}>Clear Cart</button>
                    </div>

                    <h4 className="center-text" style={{fontFamily: 'HomeFont', fontWeight: 'normal', fontSize: '1.25rem'}}>
                        You would be left with: {gold - totalPrice} <Icon name="Gold" style={{marginTop: '0.25rem'}}/>
                    </h4>
                </div>
            ) }

            <div className="center-content">
                <QGTitle1 text={"Shop"}/>
            </div>
            <SelectorsByColumns selectorData={shopSelectorData} nColumns={1} selectedSelectorName={selectedShopName} setSelectedSelectorName={setSelectedShopName}/>

            <PricePageMemoed selectedShopName={selectedShopName}/>
        </div>
    )

}