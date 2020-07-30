
// This script also exists in website/JS
// Make sure you update it there as well
import * as Symbols from './Symbols.mjs'
import { dashCase, removeSpellTildes } from './../utils.mjs'

export let head = title =>
`
<head>
    <title>${title == null? 'Call of Heroes' : title}</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

    <link rel="stylesheet" type="text/css" href="CSS/variables.css">
    <link rel="stylesheet" type="text/css" href="CSS/style.css">
    <link rel="stylesheet" type="text/css" href="CSS/spells.css">
</head>
`


export let navigation = () =>
`
<div id="Top-Nav-Wrapper">
    <nav id="Top-Nav" class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">
            <img src="Images/Icons/UI/Logo.png">
            <span>Call of Heroes</span>
        </a>

        <button class="navbar-toggler custom-font" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">

                <li class="nav-item active">
                    <div class="dropdown">
                        <a class="nav-link custom-font dropbtn" href="#">Classes</a>
                        <div class="dropdown-content">
                            <a href="Cleric.html">Cleric</a>
                            <a href="Druid.html">Druid</a>
                            <a href="Hunter.html">Hunter</a>
                            <a href="Mage.html">Mage</a>
                            <a href="Paladin.html">Paladin</a>
                            <a href="Rogue.html">Rogue</a>
                            <a href="Shaman.html">Shaman</a>
                            <a href="Warlock.html">Warlock</a>
                            <a href="Warrior.html">Warrior</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item active">
                    <div class="dropdown">
                        <a class="nav-link custom-font dropbtn" href="#">Races</a>
                        <div class="dropdown-content">
                            <a href="Bertle.html">Bertle</a>
                            <a href="Dragonborn.html">Dragonborn</a>
                            <a href="Dwarf.html">Dwarf</a>
                            <a href="Elf.html">Elf</a>
                            <a href="Gnome.html">Gnome</a>
                            <a href="Hollow.html">Hollow</a>
                            <a href="Human.html">Human</a>
                            <a href="Orc.html">Orc</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item active">
                    <div class="dropdown">
                        <a class="nav-link custom-font dropbtn" href="#">Items</a>
                        <div class="dropdown-content">
                            <a href="Shop.html">Shop</a>
                            <a href="Armors.html">Armors</a>
                            <a href="Weapons.html">Weapons</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>

            </ul>
        </div>
    </nav>
</div>
`

export let spell = ({name, isTalent=false, A, Cost, Range, Cooldown, Duration, Effect, Notes, Other, Variant}) => {

    return `
        <div class="spell${isTalent? ' spell-talent' : ''}">
            <div class="spell-left">
                <img src="Images/Icons/Spells/${name.split(' ').join('_')}.png">
            </div>
            <div class="spell-right">
                <h3 class="spell-name">${name} <span class="spell-actions-parenthesis">(</span><span class="spell-actions">${A}</span><span class="spell-actions-parenthesis">)</span></h3>
                ${Cost == null? '' : '<p><span class="spell-text-property spell-cost">' + Symbols.charge + ' </span>' + Cost + '</p>'}
                ${Range == null? '' : '<p><span class="spell-text-property spell-property">' + Symbols.range + '</span> ' + Range + '</p>'}
                ${Cooldown == null? '' : '<p><span class="spell-text-property spell-property">' + Symbols.cooldown + '</span> ' + Cooldown + '</p>'}
                <p class="spell-description">
                    ${Effect.split('\n').join('<br>')}
                    ${Duration == null? '': 'Lasts ' + Duration}
                </p>
                ${Notes != null || Other != null || Variant != null? '<br>': ''}
                ${Notes == null? '' : '<p class="spell-extra">' + Notes + '</p>'}
                ${Other == null? '' : '<p class="spell-extra">' + Notes + '</p>'}
                ${Variant == null? '' : '<p class="spell-extra">' + Notes + '</p>'}
            </div>
        </div>
    `
}

export let weapon = ({name, Stat, Hands, Special, Damage, Effect, Alternatives, Downsides, Notes}) => {
    return `
        <div class="spell">
            <div class="spell-left">
                <img src="Images/Icons/Weapons/${name.split(' ').join('_')}.png">
            </div>
            <div class="spell-right">
                <h3 class="spell-name">${name}</h3>
                <br>
                <p>
                    ${Damage} ${Symbols.damage}damage
                </p>
                <br>
                ${
                    Effect == null? '': `<p class="spell-green">${Effect}</p><br>`
                }
                ${
                    Downsides == null? '': `<p class="spell-red">${Downsides}</p><br>`
                }
                <p class="spell-small">
                    <span>${Symbols.special}</span>
                    <span>${Hands}${Special == null? '': ', ' + Special}</span>
                </p>
                <p class="spell-small">
                    <span>${Symbols.hand}</span>
                    <span>${Stat}</span>
                </p>
                ${
                    Alternatives == null? '': `<p class="spell-extra">Alternatives: ${Alternatives}</p>`
                }
                ${
                    Notes == null? '': `<p class="spell-extra">${Notes}</p>`
                }
            </div>
        </div>
    `
}

export const armor = data => {
    let ArmorBonus = data['Armor Bonus']
    let { name, Effect, Downside, Description } = data
    return `
    <div class="spell">
        <div class="spell-left">
            <img src="Images/Icons/Armors/${name.split(' ').join('_')}.png">
        </div>
        <div class="spell-right">
            <h3 class="spell-name">${name}</h3>
            <br>
            <p>
                +${ArmorBonus} ${Symbols.defense}Defense
            </p>
            <br>
            ${
                Effect == null? '': `<p class="spell-green">${Effect}</p><br>`
            }
            ${
                Downside == null? '': `<p class="spell-red">${Downside}</p><br>`
            }
            ${
                Description == null? '': `<p class="spell-extra">${Description}</p>`
            }
        </div>
    </div>
`
}


export const paragraphs = text => text.split('\n').map(t => `<p>${t}</p>`).join('\n')
export const ul = (strings, cls) => `<ul ${cls == null? '' : 'class="' + cls + '"'}>\n` + strings.map(str => `<li>${str}</li>`).join('\n') + '\n</ul>'
export const skills = Skills =>  '<ul>\n' + Object.keys(Skills).map(skill => `<li>${Skills[skill]} ${skill}</li>`).join('\n') + '\n</ul>'

export const abilities = abilitiesObject => {
    if (abilitiesObject == null || abilitiesObject.length == 0) return ''
    let names = Object.keys(abilitiesObject)
    let abilities = names.map(name => ({name, ...abilitiesObject[name]}))
    for (let ab of abilities) ab.name = removeSpellTildes(ab.name)
    return abilities.map(ability => spell(ability)).join('\n')
}
export const talents = talentsObject => {
    for (let key of Object.keys(talentsObject)) {
        talentsObject[key].isTalent = true
    }
    return abilities(talentsObject)
}