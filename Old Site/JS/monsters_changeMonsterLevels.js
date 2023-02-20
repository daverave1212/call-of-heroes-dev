





const extraHealthPerLevel = 5
const extraDefensePerLevel = 0.2
const extraInitiativePerLevel = 0.334
const extraDamagePerLevel = 1

function getOriginalFloatProp(div, cls) {
    try {
        return parseFloat(div.querySelector(cls).getAttribute('data-original'))
    } catch {
        return 1
    }
}

function changeMonsterLevels() {
    let levelSelect = document.querySelector('#Monster-Level-Select')
    let selectedLevel = parseInt(levelSelect.options[levelSelect.selectedIndex].value)
    let monsters = document.querySelectorAll('.monster')
    for (let monsterDiv of monsters) {
        let level = getOriginalFloatProp(monsterDiv, '.monster-level')
        let ratio = getOriginalFloatProp(monsterDiv, '.monster-ratio')
        let initiative = getOriginalFloatProp(monsterDiv, '.monster-initiative')
        let health = getOriginalFloatProp(monsterDiv, '.monster-health')

        monsterDiv.querySelector('.monster-level').innerHTML = selectedLevel
        monsterDiv.querySelector('.monster-health').innerHTML = health + parseInt(selectedLevel * ratio * extraHealthPerLevel)

        let attackDivs = monsterDiv.querySelectorAll('.monster-attack')
        for (let div of attackDivs) {
            let attackOriginal = div.getAttribute('data-original')
            let commaPos = attackOriginal.indexOf(',')
            let newAttack
            let extraDamage = parseInt(extraDamagePerLevel * selectedLevel * Math.min(ratio, 1))
            if (commaPos == -1) {
                newAttack = attackOriginal + ' + ' + extraDamage
            } else {
                let attackBase = attackOriginal.substring(0, commaPos) + ' + ' + extraDamage
                newAttack = attackBase + attackOriginal.substring(commaPos)
            }
            console.log(commaPos)
            div.innerHTML = newAttack
        }

    }
}