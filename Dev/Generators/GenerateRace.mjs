

import * as Components from './../Insertables/Components.mjs'
import * as Symbols from './../Insertables/Symbols.mjs'

const sidebar = () =>
`
<div id="Sidebar-Nav-Wrapper">
    <nav id="Sidebar-Nav" class="shadow-dropper">
        <div class="sidebar-header">
            <a href="#">Bootstrap Sidebar</a>
        </div>

        <ul class="list-unstyled components">
            <li class="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                    <li><a href="#">Home 1</a></li>
                    <li><a href="#">Home 2</a></li>
                    <li><a href="#">Home 3</a></li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li><a href="#">Page 1</a></li>
                    <li><a href="#">Page 2</a></li>
                    <li><a href="#">Page 3</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>
</div>
`

const generateRace = file =>
`
${Components.head(file.Race)}
<body>

    ${Components.navigation()}

    <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
        <div id="Page-Body">
            ${sidebar(file)}
            <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/Races/${file.Race}.png" alt="/">${file.Race}</h1>
                <hr>

                ${Components.paragraphs(file.Description)}

                <br>
                <h2><img class="page-icon" src="Images/Icons/UI/CharacterSetup.png" alt="/">Character Setup</h2>
                <hr>
                <br>

                <h3><img class="page-icon" src="Images/Icons/UI/CharacterSetupSub.png" alt="/">Stats and Saves</h3>
                <hr class="hr-half">

                <p>Choose 2 of the following stats and increase them by 1...</p>
                ${Components.ul(file.Options['When creating your character']['Either']['Choose 2'])}
                ${
                    file.Options['When creating your character']['Either']['Choose 1'] == null? '' : `
                        <p>Or choose 1 of these and increase it by 1:</p>
                        ${Components.ul(file.Options['When creating your character']['Either']['Choose 1'])}
                    `
                }

                ${
                    file.Options['When creating your character']['Saves'] == null? '' : `
                        <br>
                        <p>As a ${file.Race}, you have the following:</p>
                        ${Components.ul(file.Options['When creating your character'].Saves.map(save => save + ' Save'))}
                    `
                }

                ${
                    file.Skills == null? '' : `
                        <br>
                        <p>You also have:</p>
                        ${Components.skills(file.Skills)}
                    `
                }

                <hr>

                <p><b>Your <img class="text-symbol" src="Images/Icons/UI/Speed.png" alt="/">Speed is ${file.Stats['Movement']} meters.</b></p>
                <p><b>Your starting ${Symbols.heart}Health is ${file.Stats['Base Health']}.</b></p>
                <span class="spell-extra">Your total Health will be Class Health + ${file.Stats['Base Health']} + 2 * Fortitude + (5 for each level after Level 0).</span>
                
                <br>
                <br>
                <br>

                <h3><img class="page-icon" src="Images/Icons/UI/CharacterSetupSub.png" alt="/">Other Things</h3>
                <hr class="hr-half">
                ${file.Stats.Languages == null? '': `<p>By default, you speak ${file.Stats.Languages}</p>`}
                ${file.Language == null? '' : `<p>${file.Language}</p>`}
                <p>People of your kind live for ${file.Stats.Lifespan} and their size is ${file.Stats.Size == null? 'medium' : file.Stats.Size}</p>
                <p>${file.Other == null? '' : '<br>' + file.Other}</p>
                <br>

                <h2><img class="page-icon" src="Images/Icons/UI/Charge.png" alt="/">Starting Abilities</h2>
                <hr>
    
                <div class="spell-container">
                    ${Components.abilities(file['Starting Abilities'])}
                </div>

                <br>
                <br>
        
                <p>When creating your character, choose one of the following abilities and gain it permanently:</p>
                <br>
                ${Components.abilities(file.Talents['Level 0'])}

                <h2><img class="page-icon" src="Images/Icons/UI/Specializations.png" alt="/">Talents</h2>
                <hr>
                To be added!

            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>
</body>
`

export default generateRace