

import * as Components from './../Insertables/Components.mjs'
import * as Symbols from './../Insertables/Symbols.mjs'

const log = what => {
    console.log(what)
    return ''
}

const tableFromTitle = (file, title) => `
<table>
    <tr>
        <th>Item</th>
        <th>Price</th>
    </tr>
    ${
        Object.keys(file[title])
            .map(name => ({name, value: file[title][name]}))
            .map(item => `
                <tr>
                    <td>
                        <span>
                            ${item.name}${typeof(item.value) != 'object'? '': `<br><span class="spell-extra">${item.value.Effect}</span>`}
                        </span>
                    </td>
                    <td><span>${typeof(item.value) != 'object'? item.value: item.value.Price}</span> <img src="Images/Icons/UI/Gold.png" class="spell-symbol" alt="/"></td>
                </tr>
            `).join('\n')
    }
</table>
`

const generateShop = file =>
`
${Components.head('Shop')}
<body>
    
    ${Components.navigation()}
    <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.png');">
        <div id="Page-Body">
            <div id="Page-Content">
                <h1><img class="page-icon" src="Images/Icons/UI/Gold.png" alt="/">Shop</h1>
                <hr>
                <div class="price-tables">
                    ${tableFromTitle(file, 'Weapons and Equipment')}
                    ${tableFromTitle(file, 'Adventuring Gear')}
                    ${tableFromTitle(file, 'General Goods')}
                </div>
                <div class="price-tables">
                    ${tableFromTitle(file, 'Magic and Religion')}
                    ${tableFromTitle(file, 'Metals (Per 100grams)')}
                    ${tableFromTitle(file, 'Tools')}
                </div>
                <div class="price-tables">
                    ${tableFromTitle(file, 'Instruments')}
                    ${tableFromTitle(file, 'Other Items')}
                </div>
                <div class="price-tables">
                    ${tableFromTitle(file, 'Mounts')}
                    ${tableFromTitle(file, 'Exotic Mounts')}
                    ${tableFromTitle(file, 'Vehicles')}
                </div>
                <div class="price-tables">
                    ${tableFromTitle(file, 'Boats')}
                    ${tableFromTitle(file, 'Houses')}
                </div>

            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>

    <script src="JS/shop_sortTable.js"></script>
</body>
`

export default generateShop