

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

const generateBackgrounds = file =>
`
${Components.head('Backgrounds')}
<body>

    ${Components.navigation()}

    <div id="Page-Body-Wrapper" style="background-image: url('Images/Backgrounds.png');">
        <div id="Page-Body">
            ${sidebar(file)}
            <div id="Page-Content">

                <h1><img class="page-icon" src="Images/Icons/UI/Backpack.png" alt="/">Backgrounds</h1>
                <hr>

                ${
                    Object.keys(file)
                        .map(backgroundName => ({name: backgroundName, ...file[backgroundName]}))
                        .map(bg => `
                            <h2><img class="page-icon" src="Images/Icons/Backgrounds/${bg.name.split(' ').join('_')}.png" alt="/">${bg.name} - ${bg.Title}</h2>
                            <hr>
                            ${Components.paragraphs(bg.Description)}
                            
                            <br>
                            <h3>Benefits</h3>
                            <hr class="hr-half">
                            ${Components.paragraphs(bg.Effect)}
                            <br>
                            <p>You start with ${bg.Money}<img class="text-symbol" src="Images/Icons/UI/Gold.png"></p>

                            <br>
                            <h3>Skills, Training and Language</h3>
                            <hr class="hr-half">
                            <ul>
                                ${bg['Skill Points'] ? '<li>You have ' + bg['Skill Points'] + ' extra Skill Points to spend.</li>': ''}
                                ${bg.Skills ? '<li>' + bg.Skills + '</li>' : ''}
                                ${bg.Training ? '<li>' + bg.Training + '</li>' : ''}
                                ${bg.Language ? '<li>' + bg.Language + '</li>' : ''}   
                            </ul>
                                          
                        `)
                        .join('\n<br>\n')
                }

            </div> <!-- Page-Content -->
        </div> <!-- Page-Body -->
    </div>

</body>
`

export default generateBackgrounds