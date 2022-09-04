

import * as Components from './../Insertables/Components.mjs'


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

const generateWeapons = file =>
`
${Components.head('Weapons')}
<body>

    ${Components.navigation()}

    <div id="Page-Body-Wrapper" style="background-image: url('Images/Weapons.jpg');">
        <div id="Page-Body">
            ${sidebar(file)}
            <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/Special.png" alt="/">Weapons</h1>
                <hr>
                <p>
                    In order to wield a weapon, you need Training in that weapon type (e.g. Training in 2-Handed Melee Weapons, or 1-Handed Ranged Weapons).
                    For weapons listed as Finesse, you also need Training in Finesse.
                    If a weapon is Thrown, then, optionally, you can throw that weapon if you have Training in 1-Handed Ranged Weapons.
                    If a weapon is Special, then you also need Training in that specific weapon. Be careful!
                    Lastly, if you want to wield a weapon in each hand, you need training in Dual Wielding.
                    All of the Training types are listed in the Skill Points Shop page.
                </p>
                <p>
                    Each weapon has a stat you attack with (usually Dexterity or Fortitude).
                    When you attack with that weapon, add that Stat over the attack's damage (e.g. if the weapon uses Fortitude and you have 2 Fortitude, then add +2 to the attack roll).
                    Simple as that!
                </p>
                <p>All weapons in Call of Heroes are viable and no weapon is purely stronger than another. Choose the one that suits you the best!</p>
                <hr>
                <br>

                ${
                    Object.keys(file)
                        .map(weaponName => ({name: weaponName, ...file[weaponName]}))
                        .map(weapon => Components.weapon(weapon))
                        .join('\n<br>\n')
                }

            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>
</body>
`

export default generateWeapons