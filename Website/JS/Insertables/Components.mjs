
// This script also exists in website/JS
// Make sure you update it there as well
import * as Symbols from './Symbols.mjs'

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
                    <a class="nav-link custom-font" href="#">Home <span class="sr-only">(current)</span></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
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
