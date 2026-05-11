import { CHARISMA, DEFAULT_STAT_ARRAY, DEXTERITY, HEALTH_REGEN, INITIATIVE, INTELLIGENCE, MAX_HEALTH, MIGHT, MOVEMENT_SPEED } from "../../../services/game-lib/stats-constants"
import { drawImageOnCanvasAsync, drawText, drawTextLines, mapObject, mapObjectToArray } from "../../../utils"

const CHARACTER_SHEET_SRC = '/Download/Sheet-2026-05-16.png'
const WIDTH = 2480

const STATS_LEFT = 258
const STATS_TOP = 748
const STATS_GAP = 368
const ATTR_LEFT = 720
const ATTR_GAP = 1224 - 712

const IMAGE_LEFT = 1596
const IMAGE_TOP = 550
const IMAGE_WIDTH = 712
const IMAGE_HEIGHT = 712

const COMBAT_NOTES_LEFT = 574
const COMBAT_NOTES_TOP = 1477
const COMBAT_NOTES_WIDTH = 820

const OTHER_LEFT = 318
const OTHER_TOP = 2548
const OTHER_GAP = 446

const INVENTORY_WIDTH = 1208
const MANA_LEFT = IMAGE_LEFT + IMAGE_WIDTH / 2
const MANA_TOP = 2624

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

    description: { x: IMAGE_LEFT, y: COMBAT_NOTES_TOP },

    other: { x: OTHER_LEFT, y: OTHER_TOP },

    skills: { x: OTHER_LEFT + OTHER_GAP, y: OTHER_TOP },

    languages: { x: OTHER_LEFT + 2 * OTHER_GAP, y: OTHER_TOP },

    inventory: { x: 150, y: 2916 },

    mana: { x: MANA_LEFT, y: MANA_TOP },

    spellNotes: { x: IMAGE_LEFT, y: 2694 },
}

export async function printCharacterOnCanvas({ character: hero, canvas }) {

    if (hero == null || canvas == null) {
        throw `Null canvas (${canvas == null}) or character ${hero == null}`
    }

    canvas.width = 2480
    canvas.height = 3508
    await drawImageOnCanvasAsync(canvas, CHARACTER_SHEET_SRC, 0, 0, canvas.width, canvas.height)
    await drawImageOnCanvasAsync(canvas, hero.names.src, COORDINATES.image.x, COORDINATES.image.y, IMAGE_WIDTH, IMAGE_HEIGHT)

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
            width: IMAGE_WIDTH,
            ...COORDINATES.description,
            ...options
        })
        drawTextLines({
            text: hero.inventory,
            width: INVENTORY_WIDTH,
            ...COORDINATES.inventory,
            ...options
        })

        const combatBonusesText = hero.allCombatBonuses?.join('\n')
        drawTextLines({
            text: combatBonusesText,
            width: COMBAT_NOTES_WIDTH,
            ...COORDINATES.combatNotes,
            ...options
        })

        if (hero.skillBonuses != null) {
            const skillBonuses = mapObjectToArray(hero.skillBonuses, (key, value) => `${value} ${key}`).join('\n')
            console.log({skillBonuses, hero})
            drawTextLines({
                text: skillBonuses,
                width: 900,
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