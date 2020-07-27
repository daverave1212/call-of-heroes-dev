

import * as Components from './../Insertables/Components.mjs'
import * as Symbols from './../Insertables/Symbols.mjs'

function using(value, func) { return func(value) }

const dashCase = str => str.split(' ').join('-')
const removeSpellTildes = spellName => spellName.substring(1, spellName.length - 1)

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

const paragraphs = text => text.split('\n').map(t => `<p>${t}</p>`).join('\n')
const ul = (strings, cls) => `<ul ${cls == null? '' : 'class="' + cls + '"'}>\n` + strings.map(str => `<li>${str}</li>`).join('\n') + '\n</ul>'
const skills = Skills =>  '<ul>\n' + Object.keys(Skills).map(skill => `<li>${Skills[skill]} ${skill}</li>`).join('\n') + '\n</ul>'
const spellList = (header, list) => {
    return `
<ul class="class-spell-list">
    <li class="class-spell-list-head">
        <a href="#${dashCase(header)}-Collapse" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="${dashCase(header)}-Collapse">${header}<span> (expand)</span></a>
    </li>
    <li>
        <ul class="collapse" id="${dashCase(header)}-Collapse">
            ${list.map(elem => `<li>${elem}</li>`).join('\n')}
        </ul>
    </li>
</ul>
`
}



const abilities = abilitiesObject => {
    if (abilitiesObject == null || abilitiesObject.length == 0) return ''
    let names = Object.keys(abilitiesObject)
    let abilities = names.map(name => ({name, ...abilitiesObject[name]}))
    for (let ab of abilities) ab.name = removeSpellTildes(ab.name)
    return abilities.map(ability => Components.spell(ability)).join('\n')
}
const talents = talentsObject => {
    for (let key of Object.keys(talentsObject)) {
        talentsObject[key].isTalent = true
    }
    return abilities(talentsObject)
}

const generateClass = file =>
`
${Components.head(file.Class)}
<body>
    <img class="background-image top-left" src="Images/Left.png">
    <img class="background-image top-right" src="Images/Left.png">

    ${Components.navigation()}

    <div id="Page-Body">
        ${sidebar(file)}
        <div id="Page-Content">

            <h1><img class="class-icon" src="Images/Icons/Classes/${file.Class}.png" alt="/">${file.Class}</h1>
            <hr>

            ${paragraphs(file.Description)}

            <br>
            <h2><img class="class-icon" src="Images/Icons/UI/CharacterSetup.png" alt="/">Character Setup</h2>
            <hr>
            <br>

            <h3><img class="class-icon" src="Images/Icons/UI/CharacterSetupSub.png" alt="/">Stats and Saves</h3>
            <hr class="hr-half">

            <p>Choose 2 of the following stats and increase them by 1:</p>
            ${ul(file.Options['When creating your character']['Choose 2'])}
            <br>

            <p>As a ${file.Class}, you have the following:</p>
            ${ul(file.Options['When creating your character'].Saves)}
            <br>

            <p>You also have:</p>
            ${skills(file.Skills)}

            <p><b>Your starting ${Symbols.heart}Health is ${file.Stats['Base Health']}.</b></p>
            <span class="spell-extra">Your total Health will be ${file.Stats['Base Health']} + Race Health + 2 * Fortitude + (5 for each level after Level 1).</span>
            
            <br>
            <br>
            <br>

            <h3><img class="class-icon" src="Images/Icons/UI/CharacterSetupSub.png" alt="/">When Leveling Up...</h3>
            <hr class="hr-half">

            <p>Whenever you gain a Level after Level 1, you gain:</p>
            ${ul(file['Level Up']['Every Level'])}
            <br>

            <h3><img class="class-icon" src="Images/Icons/UI/CharacterSetupSub.png" alt="/">Other Things</h3>
            <hr class="hr-half">
            <p>${file.Language}</p>
            ${file.Other == null? '' : '<br>' + file.Other}

            <br>
            <h2><img class="class-icon" src="Images/Icons/UI/Charge.png" alt="/">Spells and Abilities</h2>
            <hr>
            <p>${file.Spellcasting['Main Stat']}</p>
            <p><span>Spell DC is </span>10 + <b>Main Stat</b>.</p>
            <p>You start with ${file.Spellcasting.Charges.Amount} <img class="text-symbol" src="Images/Icons/UI/Charge.png">Charges.</p>
            <hr>
            <p>${file.Spellcasting.Charges.Regain}</p>
            <p>${file.Spellcasting.Change}</p>
            <hr>
            ${file.Spellcasting['Number of known maneuvers and spells'] == null? '': '<p>Number of known maneuvers and spells: ' + file.Spellcasting['Number of known maneuvers and spells'] + '</p>'}
            ${file.Spellcasting['Number of known maneuvers'] == null? '': '<p>Number of known maneuvers: ' + file.Spellcasting['Number of known maneuvers'] + '</p>'}
            ${file.Spellcasting['Number of known spells'] == null? '': '<p>Number of known spells: ' + file.Spellcasting['Number of known spells'] + '</p>'}
            ${file.Spellcasting.Other == null? '' : '<br><p class="spell-extra">' + file.Spellcasting.Other + '</p>'}
            <br>

            <h3><img class="class-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Spell List</h3>
            <hr class="hr-half">
            <div class="class-spell-lists">
                ${Object.keys(file.Spellcasting['Spell List']).map(key =>
                    spellList(key, file.Spellcasting['Spell List'][key])    // TODO: AICI NU MERGE VEZI DE CE
                ).join('\n')}
            </div> <!-- class-spell-lists -->
            
            <br>
            <h3><img class="class-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Starting Abilities</h3>
            <hr class="hr-half">

            <div class="spell-container">
                ${abilities(file['Starting Abilities'])}
            </div>

            ${file['Other Ability Mentions'] == null? '' : `
                <br>
                <h3><img class="class-icon" src="Images/Icons/UI/BlueCircle.png" alt="/">Other Ability Things...</h3>
                <hr class="hr-half">
                <p>
                    ${file['Other Ability Mentions']}
                </p>
            `}

            <br>
            <br>
    
            <h2><img class="class-icon" src="Images/Icons/UI/Specializations.png" alt="/">Specializations</h2>
            <hr>

            ${ul(file.Specializations.Choices, 'specializations-list')}
            <br>

            ${Object.keys(file.Specs).map(specName =>
                using(file.Specs[specName], spec => `
                    <div class="specialization">
                        <h3><img class="class-icon" src="Images/Icons/Classes/${file.Class}.png" alt="/">${specName}</h3>
                        <hr class="hr-half">

                        <p>${spec.Description}</p>
                        <br>

                        <p>You start with the following ${specName} abilities:</p>
                        <br>

                        ${abilities(spec['Starting Abilities'])}

                        ${spec['Choose your side'] == null? '' : `
                            <br><p>Choose your side, ${spec['Choose your side']}</p><br>
                        `}

                        <div class="spell-container">
                            ${abilities(spec.Abilities)}
                        </div>

                        <br>

                        <h4><img class="class-icon" src="Images/Icons/UI/Specializations.png" alt="/">Talents</h4>
                        <hr class="hr-half">
                        <p>At Level 2, choose one of the following abilities and gain it permanently:</p>
                        <br>

                        ${talents(spec.Talents['Level 2'])}

                    </div>
                `)
            ).join('\n<br>\n')}


        </div> <!-- Page-Content -->
    </div> <!-- Page-Body -->

</body>
`

export default generateClass