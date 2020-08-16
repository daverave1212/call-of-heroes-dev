

import * as Components from './../Insertables/Components.mjs'
import * as Symbols from './../Insertables/Symbols.mjs'
import { dashCase, removeSpellTildes } from './../utils.mjs'
import Abilities from './../Databases/Abilities.mjs'

const spellList = (header, list) => {
    return `
<ul class="class-spell-list">
    <li class="class-spell-list-head">
        <a href="#${dashCase(header)}-Collapse" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="${dashCase(header)}-Collapse">${header}<span> (expand)</span></a>
    </li>
    <li>
        <ul class="collapse" id="${dashCase(header)}-Collapse">
            ${list.map(elem => `<li onmouseover="window.setDisplayedSpell(this.innerText)">${elem}</li>`).join('\n')}
        </ul>
    </li>
</ul>
`
}


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

export const generateSpellSheetMaker = file => `
${Components.head('Spell Sheet Maker')}
<body>
    ${Components.navigation()}

    <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
        <div id="Page-Body">
            <div id="Page-Content">

                <h1 style="text-align: center">Spell Sheet Maker</h1>
                <hr>

                <div id = "InputWrapper">
                    <div class="autocomplete" style="width:300px;">
                        <input id="Input" type="text"  placeholder="Search your spell here...">
                        <button class = "Button" id = "AddSpell" onclick = "queueSpell()">Add</button>
                    </div>
                </div>
                <div id = "AddedSpellsWrapper">
                    <select multiple id = "AddedSpells">
                        
                    </select>
                </div>
                <div id = "ButtonsWrapper">
                    <button class = "Button" id = "Reset" onclick = "resetSpells()" title = "Click here to reset everything.">Reset</button>
                    <button class = "Button" id = "RemoveSpell" onclick = "removeSpell()" title = "Click here to remove the selected spell">Remove Spell</button>
                </div>
                <div id = "GenerateDownloadWrapper">
                    <button class = "Button" id = "Generate" onclick = "generate()" title = "When you are done adding spells, click Generate! to get your awesome spell sheets!">Generate!</button>
                    <button class = "Button" id = "Download" onclick = "download()" title = "You need to generate the spell sheets first!">Download</button>
                </div>
                <div id = "CanvasWrapper"></div>

                <link href="CSS/auto-complete.css" rel="stylesheet">
                <link href="CSS/spell-sheet-maker.css" rel="stylesheet">

                <script type="module" src="JS/SpellSheetMaker/AutoComplete.mjs"></script>

                <script src="JS/Dependencies/FileSaver.js"></script>
                <script src="JS/Dependencies/jszip.min.js"></script>
                <script src="JS/Dependencies/reimg.js"></script>
                <script src="JS/Dependencies/utils.js"></script>

                <script type="module">
                
                    import Abilities from "./JS/Databases/Abilities.mjs"
                    import { AutoCompleter } from "./JS/SpellSheetMaker/AutoComplete.mjs"

                    window.autoCompleter = new AutoCompleter(
                        document.querySelector('.autocomplete'),
                        document.querySelector('#Input'),
                        Object.keys(Abilities)
                    )
                    console.log({Abilities})
                    window.Spells = Abilities
                    console.log(window.Spells)
                    console.log(1)
                </script>
                <script src="JS/SpellSheetMaker/scripts.js"></script>
                <script src="JS/SpellSheetMaker/canvas.js"></script>

            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>
</body>
`


export const generateMonsters = file => `
    ${Components.head('Monsters')}
    <body>
        ${Components.navigation()}

        <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
            <div id="Page-Body">
                <div id="Sidebar-Nav-Wrapper">
                    <nav id="Sidebar-Nav" class="shadow-dropper">
                        <div class="sidebar-header">
                            <a href="#">Choose monster level</a>
                        </div>
                        <select id="Monster-Level-Select" onchange="changeMonsterLevels()">
                            <option value="0">Level 0</option>
                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
                            <option value="3">Level 3</option>
                            <option value="4">Level 4</option>
                            <option value="5">Level 5</option>
                            <option value="6">Level 6</option>
                        </select>
                    </nav>
                </div>


                <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/Eldritch.png" alt="/">Monsters</h1>
                <hr class="hr-half">
                
                ${
                    Object.keys(file)
                        .filter(name => name != 'Ideas')
                        .map(name => ({name, ...file[name]}))
                        .map(monster => Components.monster(monster))
                        .join('\n<br><br>\n')
                }
                
                </div> <!-- Page-Content -->
            </div> <!-- Page-Body -->
        </div>
        <script src="JS/monsters_changeMonsterLevels.js"></script>
    </body>
    `


export const generateAnimalList = file => `
    ${Components.head('Animals and Pets')}
    <body>
        ${Components.navigation()}

        <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
            <div id="Page-Body">
                <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Animals and Pets</h1>
                <hr>
                <br>
                ${
                    Object.keys(file).filter(key => key != 'Exotic Pets').map(name => `
                        <h3>${name}</h3>
                        <hr class="hr-half">
                        <table>
                            <tr>
                                <td>Health</td>
                                <td>${file[name].Health}</td>
                            </tr>
                            <tr>
                                <td>Stats</td>
                                <td>${file[name].Stats}</td>
                            </tr>
                            ${
                                file[name].Armor == null ? '' : `
                                    <tr>
                                        <td>Defense</td>
                                        <td>${file[name].Armor}</td>
                                    </tr>
                                `
                            }
                            ${
                                file[name]['Movement Speed'] == null ? '' : `
                                    <tr>
                                        <td>Movement Speed</td>
                                        <td>${file[name]['Movement Speed']}</td>
                                    </tr>
                                `
                            }
                        </table>
                        <br>
                        <div class="spell-container">
                            ${
                                Object.keys(file[name].Abilities)
                                    .map(abName => ({name: abName, ...file[name].Abilities[abName]}))
                                    .map(spell => `
                                        ${Components.spell(spell)}
                                    `).join('\n')
                            }
                        </div>
                        <br>
                    `).join('\n')
                }

                </div> <!-- Page-Content -->
            </div> <!-- Page-Body -->
        </div>
    </body>
    `

export const generateIndex = file => `
${Components.head('Home')}
<body>
    ${Components.navigation()}

    <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
        <div id="Page-Body">
            <div id="Page-Content">

            <h1 style="text-align: center; font-size: 400%;">Call of Heroes</h1>
            
            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>
</body>
`
export const generateAmateurSpellList = file => `
    ${Components.head('Amateur Spell List')}
    <body>
        ${Components.navigation()}

        <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
            <div id="Page-Body">
                <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Amateur Spell List</h1>
                <hr class="hr-half">
                
                <div class="abilities-container">
                ${
                    file['Amateur Spell List']
                        .map(spellName => Components.spell({name: spellName, ...Abilities[spellName]}))
                        .join('<br>')
            
                }
                </div>

                </div> <!-- Page-Content -->
            </div> <!-- Page-Body -->
        </div>
    </body>
    `
export const generateCrowdControl = file => `
    ${Components.head('Crowd Control')}
    <body>
        ${Components.navigation()}

        <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
            <div id="Page-Body">
                <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Crowd Control</h3>
                <hr>

                <p>
                    Crowd Control means any type of effect that limits a creature's movement.
                    Such as making it unable to attack, move, or even unable to do anything at all on their turn.
                    Each Crowd Control effect lasts <b>one turn</b>
                </p>
                <br>
                
                ${
                    Object.keys(file).map(name => `
                        <h3>${name}</h3>
                        <hr class="hr-half">
                        <p>${file[name]}</p>
                        <br>
                    `).join('\n')
                }

                </div> <!-- Page-Content -->
            </div> <!-- Page-Body -->
        </div>
    </body>
    `
export const generateInventory = file => `
    ${Components.head('Inventory Rules')}
    <body>
        ${Components.navigation()}

        <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
            <div id="Page-Body">
                <div id="Page-Content">

                    <h1><img class="page-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Inventory Rules</h3>
                    <hr>

                    ${Components.paragraphs(file.Inventory)}
                    <br>
                    <hr class="hr-half">
                    <br>
                    ${Components.paragraphs(file.Description)}
                    <br>

                    <h3>Item Categories</h3>
                    <hr class="hr-half">
                    ${Components.paragraphs(file.Categories)}
                    <br>

                    <h3>Encumbered</h3>
                    <hr class="hr-half">
                    <p>${file.Encumbered.Description}</p>
                    <ul>
                        ${file.Encumbered.Effect.map(effect => `<li>${effect}</li>`).join('\n')}
                    </ul>

                </div> <!-- Page-Content -->
            </div> <!-- Page-Body -->
        </div>
    </body>
    `
export const generateLanguages = file => `
    ${Components.head('Languages')}
    <body>
        ${Components.navigation()}

        <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
            <div id="Page-Body">
                <div id="Page-Content">

                    <h1><img class="page-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Languages</h3>
                    <hr>

                    ${
                        Object.keys(file).map(category => `
                            <h4>${category}</h4>
                            <hr class="hr-half">
                            <ul>
                                ${
                                    file[category].map(language => `<li>${language}</li>`).join('\n')
                                }
                            </ul>
                            <br>
                        `).join('\n')
                    }

                    AICI AM RAMAS HELLO TODO!!

                </div> <!-- Page-Content -->
            </div> <!-- Page-Body -->
        </div>
    </body>
    `
export const generateSkillPoints = file => `
    ${Components.head('Skill Points Shop')}
    <body>
        ${Components.navigation()}

        <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.jpg');">
            <div id="Page-Body">
                <div id="Page-Content">

                    <h1><img class="page-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Skill Points Shop</h3>
                    <hr>

                    <table style="width: 500px;">
                        <tr>
                            <th>Boosts</th>
                            <th>Price</th>
                        </tr>
                        ${
                            Object.keys(file).map(boost => `
                                <tr>
                                    <td>
                                        <span>${boost}</span>
                                    </td>
                                    <td>
                                        <span>${file[boost]}</span>
                                    </td>
                                </tr>
                            `).join('\n')
                        }
                    </table>

                </div> <!-- Page-Content -->

            </div> <!-- Page-Body -->
        </div>
    </body>
    `