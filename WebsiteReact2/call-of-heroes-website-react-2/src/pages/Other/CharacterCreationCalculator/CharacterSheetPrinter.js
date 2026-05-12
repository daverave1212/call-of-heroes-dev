import html2canvas from "html2canvas"
import { CHARISMA, DEFAULT_STAT_ARRAY, DEXTERITY, HEALTH_REGEN, INITIATIVE, INTELLIGENCE, MAX_HEALTH, MIGHT, MOVEMENT_SPEED } from "../../../services/game-lib/stats-constants"
import { drawImageOnCanvasAsync, drawImageWithAlphaMask, drawText, drawTextLines, getImageRelativeHeightAtWidth, loadImageAsync, mapObject, mapObjectToArray } from "../../../utils"

const CHARACTER_SHEET_SRC = '/Download/Sheet-2026-05-16.png'
const WIDTH = 2480

const STATS_LEFT = 258
const STATS_TOP = 748
const STATS_GAP = 368
const ATTR_LEFT = 720
const ATTR_GAP = 1224 - 712

const IMAGE_LEFT = 1548
const IMAGE_TOP = 533
// const IMAGE_LEFT = 1596
// const IMAGE_TOP = 550
const IMAGE_WIDTH = 712
// const IMAGE_HEIGHT = 712

const DESCRIPTION_LEFT = IMAGE_LEFT + 24
const DESCRIPTION_WIDTH = IMAGE_WIDTH - 12

const COMBAT_NOTES_LEFT = 574
const COMBAT_NOTES_TOP = 1477
const COMBAT_NOTES_WIDTH = 820

const OTHER_LEFT = 310
const OTHER_TOP = 2548
const OTHER_GAP = 448
const OTHER_WIDTH = 380

const INVENTORY_WIDTH = 1208
const MANA_LEFT = IMAGE_LEFT + IMAGE_WIDTH / 2
const MANA_TOP = 2624

const GAP_BETWEEN_LINES = 34

const COORDINATES = {
    name: { x: WIDTH / 2, y: 188 },
    subname: { x: WIDTH / 2, y: 326 },

    stats: {
        [MIGHT]: { x: STATS_LEFT, y: STATS_TOP },
        [DEXTERITY]: { x: STATS_LEFT, y: STATS_TOP + STATS_GAP },
        [INTELLIGENCE]: { x: STATS_LEFT, y: STATS_TOP + 2 * STATS_GAP },
        [CHARISMA]: { x: STATS_LEFT, y: STATS_TOP + 3 * STATS_GAP },
    },

    attributes: {
        [MAX_HEALTH]: { x: ATTR_LEFT, y: STATS_TOP },
        [MOVEMENT_SPEED]: { x: ATTR_LEFT, y: STATS_TOP + STATS_GAP },
        [HEALTH_REGEN]: { x: ATTR_LEFT + ATTR_GAP, y: STATS_TOP },
        [INITIATIVE]: { x: ATTR_LEFT + ATTR_GAP, y: STATS_TOP + STATS_GAP },
    },

    image: { x: IMAGE_LEFT, y: IMAGE_TOP },

    combatNotes: { x: COMBAT_NOTES_LEFT, y: COMBAT_NOTES_TOP },

    description: { x: DESCRIPTION_LEFT, y: COMBAT_NOTES_TOP },

    other: { x: OTHER_LEFT, y: OTHER_TOP },

    skills: { x: OTHER_LEFT + OTHER_GAP, y: OTHER_TOP },

    languages: { x: OTHER_LEFT + 2 * OTHER_GAP, y: OTHER_TOP },

    inventory: { x: 150, y: 2916 },

    mana: { x: MANA_LEFT, y: MANA_TOP },

    spellNotes: { x: DESCRIPTION_LEFT, y: 2712 },
}

export async function printCharacterOnCanvas({ character: hero, canvas }) {

    if (hero == null || canvas == null) {
        throw `Null canvas (${canvas == null}) or character ${hero == null}`
    }

    canvas.width = 2480
    canvas.height = 3508
    await drawImageOnCanvasAsync(canvas, CHARACTER_SHEET_SRC, 0, 0, canvas.width, canvas.height)

    console.log('Loading images')
    const imageMask = await loadImageAsync('/Other/MyCharacterImageMask.png')
    const imageMaskWidth = imageMask.naturalWidth - 8
    const imageMaskHeight = imageMask.naturalHeight - 8
    const heroImage = await loadImageAsync(hero.names.src)
    const heroImageWidth = imageMask.naturalWidth
    const heroImageHeight = getImageRelativeHeightAtWidth(heroImage, imageMask.naturalWidth)
    drawImageWithAlphaMask(canvas, heroImage, imageMask, COORDINATES.image.x, COORDINATES.image.y, imageMaskWidth, imageMaskHeight, heroImageWidth, heroImageHeight)
    // await drawImageOnCanvasAsync(canvas, heroImage, COORDINATES.image.x, COORDINATES.image.y, imageMask.naturalWidth, imageMask.naturalHeight, imageMask)
    // await drawImageOnCanvasAsync(canvas, heroImage, COORDINATES.image.x, COORDINATES.image.y, IMAGE_WIDTH, IMAGE_HEIGHT, imageMask)

    // Big Numbers and names
    {
        const options = {
            canvas,
            font: 'HomeFont',
            isCenteredY: true,
            textAlign: 'center',
            fontSize: 86,
        }
        drawText({ text: hero.names?.characterName, ...COORDINATES.name, ...options })
        drawText({
            text: `Level ${hero.level} ${hero.raceName} ${hero.className}`,
            ...COORDINATES.subname, ...options,
            fontSize: 58
        })
        
        const maxMana = hero.maxMana == null || hero.maxMana == 0? `Doesn't use Mana`: `${hero.maxMana} Mana`
        drawText({
            text: maxMana,
            ...COORDINATES.mana, ...options,
            fontSize: 68,
        })

        for (let i = 0; i < DEFAULT_STAT_ARRAY.length; i++) {
            const statValue = hero.totalStats[i]
            drawText({
                text: `${statValue}`,
                x: STATS_LEFT,
                y: STATS_TOP + i * STATS_GAP,
                ...options
            })
        }

        for (const [key, value] of Object.entries(hero.attributes)) {
            drawText({
                text: `${value}`,
                ...COORDINATES.attributes[key],
                ...options
            })
        }
    }

    // Weapons
    let weaponDrawY = COORDINATES.combatNotes.y
    {
        const weaponDivs = Array.from(document.querySelectorAll(`#My-Weapons .spell.is-item`))
        const { x, y } = COORDINATES.combatNotes
        for (const div of weaponDivs) {
            try {
                const weaponCanvas = await html2canvas(div)
                const drawHeight = getImageRelativeHeightAtWidth(weaponCanvas, COMBAT_NOTES_WIDTH)
                await drawImageOnCanvasAsync(
                    canvas,
                    weaponCanvas,
                    x, weaponDrawY,
                    COMBAT_NOTES_WIDTH,
                    drawHeight
                )
                weaponDrawY += drawHeight
            } catch (e) {
                throw e
            }
        }

        console.log({weaponDivs, nWeapons: weaponDivs.length, weaponDrawY})
    }

    



    // Small Text
    {
        const options = {
            canvas,
            font: 'TextFont',
            isCenteredY: false,
            textAlign: 'left',
            fontSize: 40,
            lineHeight: 34
        }
        drawTextLines({
            text: hero.description,
            width: DESCRIPTION_WIDTH,
            ...COORDINATES.description,
            ...options
        })
        drawTextLines({
            text: hero.inventory,
            width: INVENTORY_WIDTH,
            ...COORDINATES.inventory,
            ...options
        })

        if (hero.allCombatBonuses != null) {
            const combatBonusesText = hero.allCombatBonuses?.join('\n')
            const weaponsYDiff = weaponDrawY - COMBAT_NOTES_TOP
            const extraPixelsNeeded = weaponsYDiff % GAP_BETWEEN_LINES
            drawTextLines({
                text: combatBonusesText,
                width: COMBAT_NOTES_WIDTH,
                x: COORDINATES.combatNotes.x,
                y: weaponDrawY + extraPixelsNeeded + GAP_BETWEEN_LINES - 3,
                ...options
            })
        }

        if (hero.extras != null) {
            const extrasText = hero.extras?.join('\n')
            drawTextLines({
                text: extrasText,
                width: OTHER_WIDTH,
                ...COORDINATES.other,
                ...options,
                textAlign: 'center',
            })
        }

        if (hero.skillBonuses != null) {
            const skillBonuses = mapObjectToArray(hero.skillBonuses, (key, value) => `${value} ${key}`).join('\n')
            console.log({skillBonuses, hero})
            drawTextLines({
                text: skillBonuses,
                width: OTHER_WIDTH,
                ...COORDINATES.skills,
                ...options,
                textAlign: 'center',
            })
        }

        const languagesText = hero.languages.join('\n')
        drawTextLines({
            text: languagesText,
            width: 900,
            ...COORDINATES.languages,
            ...options,
            textAlign: 'center',
        })

        const spellNotes = hero
            .spellsIgnored
            ?.map(spell => spell.Name + (spell.ShortNotes == null? '': `: ${spell.ShortNotes}`))
            ?.join('\n')
        drawTextLines({
            text: spellNotes,
            width: IMAGE_WIDTH,
            ...COORDINATES.spellNotes,
            ...options,
            textAlign: 'left',
        })

    }



}