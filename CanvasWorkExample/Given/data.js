// There is another variable at the end, called data; use that
const dataRaw = {
    "~Acid Burst~": {
        "A": "Half-Action",
        "Range": "3 meters",
        "Effect": "A Unit makes a Dexterity Check.\nIt takes 1d4 + Main Stat Acid damage (directly, ignoring Defense) on a failed Check, or half of that if it succeeds.\n",
        "Name": "Acid Burst"
    },
    "~Burning Breath~": {
        "A": "Half-Action",
        "Effect": "All Units in a 90 degree, 3 meter cone take 3 Fire damage (directly, ignoring Defense).\nUnits can't benefit from Cover from this Ability.\n",
        "Upgrade": "At Level 4, the damage increases to 4 damage.\n",
        "Name": "Burning Breath"
    },
    "~Bonfire~": {
        "A": "1 Action",
        "Range": "5 meters",
        "Duration": "10 minutes",
        "Cooldown": "Your Level uses / Long Rest",
        "Effect": "Choose a 1x1x1 meter zone.\nA bonfire Fire errupts in that place.\nThe first time in the encounter a Unit touches a bonfire Fire, it takes 1d8 Fire Damage directly (ignores Defense) (instead of the normal Fire damage).\n",
        "Upgrade": "Stepping inside a space with Fire or starting your turn inside Fire deals 2 Fire damage.",
        "Notes": "Bonfire Fire is stronger that normal fire and can be spread with Control Flames or similar Abilities.\nIf the bonfire can spread fire to nearby flammable objects that aren't being worn or carried, it spreads at the start of your next turn (same for further bonfires).\nIf the bonfire touches the same unit multiple times on the same turn, it only deals the damage once.\n",
        "Name": "Bonfire"
    }
}

const data = [
    ...Object.keys(dataRaw).map(key => dataRaw[key]),
    ...Object.keys(dataRaw).map(key => dataRaw[key]),
    ...Object.keys(dataRaw).map(key => dataRaw[key]),
    ...Object.keys(dataRaw).map(key => dataRaw[key]),
    ...Object.keys(dataRaw).map(key => dataRaw[key]),
    ...Object.keys(dataRaw).map(key => dataRaw[key]),
    ...Object.keys(dataRaw).map(key => dataRaw[key]),
    ...Object.keys(dataRaw).map(key => dataRaw[key])
]
