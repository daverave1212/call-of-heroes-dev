

import * as Components from './../Insertables/Components.mjs'
import { spellNameToUnderscore } from './../utils.mjs'

export const dashCase = str => str.split(' ').join('-')

const generateWeapons = file =>
`
${Components.head('Abilities')}
<body>

    ${Components.navigation()}

    <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
        <div id="Page-Body">
            <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/Charge.png" alt="/">Abilities</h1>
                <hr>

                
                ${
                    Object.keys(file).map(category => `
                        <h2><img class="page-icon" src="Images/Icons/UI/${spellNameToUnderscore(category)}.png" alt="/">${category}</h3>
                        <hr>
                        <div class="abilities-container">
                            ${Components.abilities(file[category])}
                        </div>
                        <br>
                    `).join('\n')
                }
                

            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>
</body>
`

export default generateWeapons