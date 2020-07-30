

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

const generateArmors = file =>
`
${Components.head('Armors')}
<body>

    ${Components.navigation()}

    <div id="Page-Body-Wrapper" style="background-image: url('Images/DefaultBackground.png');">
        <div id="Page-Body">
            ${sidebar(file)}
            <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/Defense.png" alt="/">Armors</h1>
                <hr>

                ${
                    Object.keys(file)
                        .map(armorName => ({name: armorName, ...file[armorName]}))
                        .map(armor => Components.armor(armor))
                        .join('\n<br>\n')
                }

            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>

</body>
`

export default generateArmors