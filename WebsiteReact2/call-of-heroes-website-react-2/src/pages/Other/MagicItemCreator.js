import { $SKILLS, addBonusToDamageText, capitalizeFirstLetter, filterObject, generateUniqueId, getAlternativesAsArray, getAnExistingKeyOf, getItemIconPathByName, includesAll, includesAny, includesAnyWithExceptions, isNumber, isStringNumeric, joinObjectValues, last, mapKeysToObject, mapObject, mapObjectToArray, matchRange, mergeObjectsContainingArrays, objectToArray, onlyUniqueFilter, parseTextWithSymbols, percentChance, randomInt, randomOf, randomOfArrayWeighted, range, removeDuplicates, roundToNearest, SeededRNG, shuffle, SKILL_GROUP_BY_ELEMENT, SKILLS_BY_GROUP, sortByHash, spellsFromObject, stringReplaceAllMany } from "../../utils";
import MagicItemProperties from '../../databases/Other/MagicItemProperties.json'
import Weapons from '../../databases/Weapons.json'
import Armors from '../../databases/Armors.json'
import Item from "../../components/Spell/Item";
import Page from "../../containers/Page/Page";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import { useState } from "react";
import HeroButton from "../../components/HeroButton/HeroButton";
import Spell from '../../components/Spell/Spell'
import { isString } from "markdown-it/lib/common/utils";
import { checkStatRequirements, STAT_NAMES } from "../../services/game-lib/stat-calculations";

const standardRNG = { randomInt, percentChance, randomOf, randomOfArrayWeighted, shuffle }

const ALL_WEAPONS_ARRAY = [
    ...spellsFromObject(Weapons['One-Handed Melee']).map(item => ({...item, type: 'One-Handed Melee'})),
    ...spellsFromObject(Weapons['Two-Handed Melee']).map(item => ({...item, type: 'Two-Handed Melee'})),
    ...spellsFromObject(Weapons['One-Handed Ranged']).map(item => ({...item, type: 'One-Handed Ranged'})),
    ...spellsFromObject(Weapons['Two-Handed Ranged']).map(item => ({...item, type: 'Two-Handed Ranged'}))
]

function parseItemText({ text, thisText='{This}', rng=standardRNG, item={} }) {
    if (isNumber(text)) {
        return text
    }
    const randomElement = () => {
        if (item.ElementBias != null && rng.percentChance(85) && !item.ItemType?.includes('Shield')) {
            return item.ElementBias
        }
        const element = rng.randomOf('Slash', 'Pierce', 'Smash', 'Pulse', 'Fire', 'Cold', 'Shock', 'Poison', 'Acid', 'Divine', 'Scourge')
        item.ElementBias = element
        return element
    }
    const preferredElement = randomElement()
    const whenSynonym = () => rng.randomOf('the moment when', 'when', 'when', 'the moment', 'the instant')
    const sound = () => rng.randomOf('murmur', 'hum', 'sound', 'rumble', 'strum', 'trill', 'song', 'rustle', 'thrum', 'whir', 'pulse', 'echo')
    const an = str => (str.startsWith('o') || str.startsWith('a') || str.startsWith('e') || str.startsWith('u') || str.startsWith('i'))? `an ${str}`: `a ${str}`

    let customSymbols
    let getSymbolText = symbol => customSymbols[symbol].text()
    // This is not raw! It needs another processing, which is done below
    customSymbols = {
        'When': { text: () => rng.randomOf(
            'when struck', 'when hit', 'upon impact', 'when touched',
            'when not looked at' + rng.randomOf('', ' closely'),
            'the more it is used',
            'when left unattended',
            'when picked up', 'the moment it is picked up',
            'when moved', 'when in motion',
            `${whenSynonym()} ${rng.randomOf('one tries to pick it up', 'one picks it up', 'one grasps it')}`,
            'when not paid attention to' + rng.randomOf('', ' closely'),
            'when paid attention to' + rng.randomOf('', ' closely'),
            `${whenSynonym()} ${rng.randomOf('one', 'someone')} ${rng.randomOf('pays attention', 'tries to pay attention')}${rng.randomOf('', ' closely')}`,
            `${whenSynonym()} one turns their attention to it`,
            `only when unobserved`,
            
            `${rng.randomOf('at certain hours', 'at random times', 'randomly', 'at random')} ${rng.randomOf('at', 'during the', 'in the')} ${rng.randomOf('day', 'night', 'twilight', 'morning', 'evening', 'sundown', 'dusk')}`,
            `when${rng.randomOf('placed', '')} in ${rng.randomOf('strong', 'direct ', '')}${rng.randomOf('sunlight', 'daylight', 'moonlight', 'dim light', 'shadow')}`,
            `under the open ${rng.randomOf('night ', 'day ', '', '')}sky`,
            `in the presence of ${rng.randomOf('fire', 'flames', 'heat', 'the scorching sun', 'the cold moon', 'freezing cold', 'frost', 'ice', 'water', 'acid', 'poisoned air', 'poisonous creatures', 'lightning', 'electricity')}`,
            `in the presence of ${rng.randomOf('wild beasts', 'dragons', 'humanoids', 'people with ill intent', 'people deemed trustworthy', 'aberrations', 'fiends', 'monsters', 'people\'s voices' + rng.randomOf('', '', ' breaking the silence', 'breaking the stillness'))}`,
            'in the silence',
        )},
        'As': { text: () => 
            `${rng.randomOf(`when`, 'when', 'as', 'as', 'in the time when')} the ${rng.randomOf('night sky', 'day sky', 'weather', 'time of the year')} ${rng.randomOf('changes', 'changes', 'varies', 'evolves', 'fluctuates', 'adjusts', 'settles')}`
        },
        'Sometimes': { text: () => rng.randomOf(
            'sometimes', 'ocassionally', 'randomly',
            'in alternating breaths',
            'in a rhythmic pattern',
            'at odd intervals'
        )},
        'InCondition': { text: () => rng.randomOf(
            'when looked at', 'when not looked at', 'when looked at with the peripheral vision',
            `${rng.randomOf('at certain hours', 'at random times', 'randomly', 'at random')} ${rng.randomOf('at', 'during the', 'in the')} ${rng.randomOf('day', 'night', 'twilight', 'morning', 'evening', 'sundown', 'dusk')}`,
            `${rng.randomOf(`when ${rng.randomOf(' placed in', '')}`, 'under', 'in')} ${rng.randomOf('strong ', 'direct ', '')}${rng.randomOf('sunlight', 'daylight', 'moonlight', 'dim light', 'shadow')}`,
            `under the open ${rng.randomOf('night ', 'day ', '', '')}sky`,
            `in the presence of ${rng.randomOf('fire', 'flames', 'heat', 'the scorching sun', 'the cold moon', 'freezing cold', 'frost', 'ice', 'water', 'acid', 'poisoned air', 'poisonous creatures', 'lightning', 'electricity')}`,
            `in the presence of ${rng.randomOf('wild beasts', 'dragons', 'humanoids', 'people with ill intent', 'people deemed trustworthy', 'aberrations', 'fiends', 'monsters')}`,            
        )},
        
        'Size': { text: () => rng.randomOf(
            'small', 'tiny', 'little',
            'large', 'great', 'vast'
        )},
        'But': { text: () => rng.randomOf(
            'but', 'yet', 'though'
        )},
        'AdjectiveForMovement': { text: () => rng.randomOf(
            'rapid', 'quick', 'sudden',
            'slow', 'calm', 'gentle',
            'soft', 'smooth', 'delicate',
            'heavy', 'easy', 'weightless', 'strong', 'poweful',
            'sharp', 'intense',
            'endless', 'faint', 'delicate', 'hazy', 'mild',
            'clear', 'distinct', 'noticeable',
        ) },
        'AdverbForMovementNoSpace': { text: () => rng.randomOf(
            ' raplidly', ' quickly', ' suddenly',
            ' slowly', ' calmly', ' gently', ' softly', 'smoothly',
            ' heavily', ' easily', ' weightlessly',
            ' even more so', ' more and more',
            ' endlessly', ' faintly', ' delicately',
            '', '', '', '', '', ''
        ) },
        'AdverbForAnythingNoSpace': { text: () => rng.randomOf(
            ' even more so', ' more and more',
            ' subtly', ' very much',
            '', '', '', '', '', ''
        ) },
        'InDirection': { text: () => rng.randomOf(
            'skyward', 'downward', 'upward', 'in midair',
            'into mist', 'into nothingness',
            'into the air',
            'into the ether',
            'toward the sky', 'toward the ceiling', 'up high',
            'on a breeze',
            'into a whisper',
            'in random directions'
        )},
        'APeriod': { text: () => rng.randomOf(
            'a while', 'a period', 'a brief period', 'short bursts', 'a time',
            'only a heartbeat',
        )},
        'SeemsTo': { text: () => rng.randomOf(
            'appears to', 'seems to', 'looks to',
        )},
        'SeemsToBe': { text: () => rng.randomOf(
            'is', 'appears', 'seems', 'looks', 'seems to be', 'appears to be', 
        )},
        'Seeming': { text: () => rng.randomOf(
            'being', 'appearing', 'seeming', 'looking', 'seeming to be', 'appearing to be', 
        )},
        'MadeOf': { text: () => rng.randomOf(
            'made of', 'woven from', 'created of', 'of', 'fashioned from', 'formed of', 'hewn from', 'forged of',
            'shaped from', 'wrought in', 'carven of', 'crafted of', 'crafted from', 'born of', 'drawn from',
            'spun of', 'raised from'
        )},
        'Glows': { text: () => rng.randomOf(
            'glows', 'scintilates', 'sparkles', 'lightens up', 'tints', 'glimmers'
        )},
        'Glow': { text: () => rng.randomOf(
            'glow', 'sparkle', 'light', 'tint', 'glimmer',
            'mote of light'
        )},
        'Sound': { text: () => rng.randomOf('murmur', 'hum', 'sound', 'rumble', 'strum', 'trill', 'song', 'rustle', 'thrum', 'whir', 'pulse', 'echo')},
        'Fading': { text: () => rng.randomOf(
            'fading', 'rising', 'soaring', 'ascending', 'drifting',
            'evaporating', 'scattering', 'expanding', 'drifting away',
            'dispersing', 'disappearing'
        )},
        'Changes': { text: () => rng.randomOf(
            'shifts', 'transforms', 'changes patterns',
            'drifts', 'swells and fades'
        )},
        'Moving': { text: () => rng.randomOf(
            'shifting', 'transforming', 'changing patterns',
            'drifting', 'flowing',
            'shifting and flowing',
            'changing patterns and drifting',
            'flowing and changing patterns',
            'shifting pattenrs',
            'flowing and shifting',
            'swelling and fading',
            'twitching and darting',
            'coiling around like a serpent',
            'sways'
        )},
        'ChangedPosition': { text: () => rng.randomOf(
            'shifted', 'moved from place', 'displaced',
            'placed at a different angle', 'moved',
            'turned', 'lying at a new angle',
            rng.randomOf('put', 'laid') + ' in a different place',
        )},
        'IncreasesOrDecreases': { text: () => rng.randomOf(
            'increases', 'amplifies', 'intensifies', 'strenghtens', 'raises',
            'reduces', 'decreases', 'stops', 'wanes', 'falls off', 'weakens', 'fades',
        )},
        'Increases': { text: () => rng.randomOf(
            'increases', 'amplifies', 'intensifies', 'strenghtens', 'raises', 'blooms',
        )},
        'Decreases': { text: () => rng.randomOf(
            'reduces', 'decreases', 'stops', 'wanes', 'falls off', 'weakens', 'fades',
        )},
        'Flow': { text: () => rng.randomOf(
            'curls', 'rises', 'flows', 'cascades', 'ebbs', 'ebbs and flows', 'streams', 'swirls', 'trickles', 'ripples', 'coils', 'oscillates',
        )},
        'Flows': { text: () => rng.randomOf(
            'curls', 'rises', 'flows', 'cascades', 'ebbs', 'ebbs and flows', 'streams', 'swirls', 'trickles', 'ripples', 'coils', 'oscillates',
        )},
        'Hums': { text: () => rng.randomOf(
            'hums', 'resonates', 'rumbles', 'strums', 'trills', 'song-whispers',
            'rustles', 'thrums', 'whirrs'
        )},
        'AdjectiveForSound': { text: () => (() => {
            const farAway = rng.randomOf('distant', 'far', 'just out of reach', 'far away', 'nearby', 'distant', 'faint', 'unseen', 'phantom')
            const an = str => str.startsWith('o') || str.startsWith('a') || str.startsWith('e') || str.startsWith('u') || str.startsWith('i')? `an ${str}`: `a ${str}`
            const butMetaphor = () => rng.randomOf(
                `like a note struck on ${an(farAway)} string.`,
                `like the ${farAway} toll of a bell rolling across unseen hills`,
                `a pressure like ${an(farAway)} thunder, ${getSymbolText('Moving')} as if carried on a phantom storm`,
                `"like a whisper curling just beneath thought`,
                `as though the earth itself mutters`,
                `like a low rumble that vibrates through stone and flesh alike`,
                `${an(sound())} that ${getSymbolText('Increases')} in the chest`,
                `like the echo of a choir singing in a cathedral long forgotten`,
                `${an(farAway)} keening at the edge of silence`,
                `like the sea pressing against a shell`,
                `like the soundless chime of stars wheeling overhead`,
                'making the air remains charged, trembling with a silence that feels alive',
                `${getSymbolText('Moving')} as though ${getSymbolText('Glow')} itself has grown liquid`,
            )
            const adjectiveMetaphor = () => rng.randomOf(
                'not heard with the ears but felt in the chest',
                `more sensation than sound`,
                `too soft to understand but impossible to ignore`,
                `sharp as glass`,
                `striking like a ripple in time itself`,
                `that seems to come from behind the listener, even when they are alone`,
                `felt more as awe than heard with the ears`,
            )
            return rng.randomOf(
                `${an(sound())} ${adjectiveMetaphor()}, ${butMetaphor()}.`
            )
        })() },
        'DescriptionForArmorVisualsHoly': { text: () => rng.randomOf(
            "The surface gleams pale and smooth, like stone worn by centuries of prayerful touch. Its brightness is not dazzling, but steady, as though it has remembered light for ages.",
            "Its color is the soft hue of ivory, streaked faintly with lines like scripture etched by unseen hands. The markings seem too ancient to be human.",
            "The armor carries a faint warmth, not of fire but of breath, like the lingering presence of someone who has just whispered a blessing.",
            "Across its surface spread delicate patterns like frost on glass, symmetrical yet impossible to map. Each time they are observed, their shapes appear subtly changed.",
            "It is pale as moonlight, but flecked with faint gold veins, like threads of divinity running through mortal stone.",
            "The surface has a pearly quality, shifting softly between hues of silver and white. It feels alive, as though it listens in silence.",
            "Every edge is softened, not dulled, but rounded with a patience that speaks of eternity. It feels shaped by devotion rather than tools.",
            "The armor bears faint circular indentations, perfectly spaced, as though pressed by unseen fingers in ritual. Their purpose is unknown, but the symmetry is absolute.",
            "Its texture is smooth but never cold, the touch evoking the comfort of resting in sunlight behind closed eyes.",
            "A faint haze seems to cling to it, not mist but the impression of incense smoke, as though the armor remembers centuries of worship.",
            "The color is the palest blue, nearly white, like skies glimpsed on the morning of a sacred day. Looking upon it stirs a strange calm.",
            "It appears plain at first, but beneath its surface lies a sheen that only reveals itself when gazed upon with reverence. The unworthy see only dull metal.",
            "The armor’s texture is fine and polished, yet marked with faint grooves that resemble the rays of a rising sun spreading outward.",
            "Across its surface, faint impressions of wings can be seen, not carved but gently embedded in the material like memories pressed into clay.",
            "It carries the stillness of stone in a monastery, unchanging, unmoving, but filled with the weight of endless contemplation.",
            "The colors shimmer faintly between silver and pale gold, but never at random — always in patterns that seem deliberate, as if tracing sacred geometry.",
            "When touched, the armor feels firm, but leaves a sensation like cool water passing over the skin, refreshing but uncanny in its gentleness.",
            "The surface is pale and almost translucent, like marble lit from within. It gives the impression that it could break — though it never does.",
            "Its texture is impossibly fine, like glass polished for centuries. Gazing into it gives the faint sense of looking too far inward.",
            "The armor appears weathered, not by battle but by ritual, as if centuries of kneeling pilgrims brushed their hands along its edges.",
            "It carries faint lines that seem random until seen from a distance, where they converge into the likeness of a distant horizon.",
            "The color is pale gold, but tarnished in a way that feels deliberate — as though it rejects vanity while retaining holiness.",
            "Its surface glimmers faintly with a sheen like dew in morning light, fragile yet eternal in its persistence.",
            "The armor is pale, yet its shadows seem deeper than they should be, as though holding secrets within the holy.",
            "It is etched with symbols too fine to read, yet their arrangement stirs the heart with reverence, even if their meaning is lost.",
            "The surface is smooth, but faintly porous, like carved alabaster. It has the uncanny quality of stone made soft by prayer.",
            "Its color is the white of bleached bone, but layered with a quiet radiance that transforms mortality into something more enduring.",
            "The armor feels impossibly light, its surface covered in fine striations like flowing water frozen in motion.",
            "Tiny dots speckle its surface, like a field of distant stars. Some swear they rearrange into constellations meaningful only to the faithful.",
            "Its edges glow faintly with a pale aureole, not enough to illuminate, but enough to distinguish its outline in even the darkest shadow.",
            "The armor looks worn and weathered, but every mark upon it resembles deliberate calligraphy, strokes left by time in perfect design.",
            "Its hue is not gold or silver but a muted brilliance, like sunlight reflected in holy water. It is brightness made humble.",
            "The surface bears faint whorls, spiraling patterns that evoke seashells, galaxies, or the turning of prayer wheels.",
            "The armor seems plain, yet it resists dust and dirt as though unwilling to accept defilement. Even in ruin, it would remain pristine.",
            "Its texture is silken, though rigid, evoking the contradiction of the divine — strength hidden in gentleness.",
            "Across its surface run thin lines that resemble veins of light, too faint to be seen in detail, but unmistakable when viewed from afar.",
            "The color recalls pale parchment, faded with age, as if the armor itself were scripture that can never be read aloud.",
            "It bears faint impressions like fingerprints, but each is too perfect, too symmetrical, as though left by something not human.",
            "The armor seems carved from serenity itself, each curve and line deliberate, free of excess, carrying only what is necessary to endure."
        )},
        'DescriptionForArmorVisualsDark': { text: () => rng.randomOf(
            "Its surface is blackened and rough, as though it had been burned in a fire that never ended. Small cracks glow faintly with a dull crimson, like the embers of something still smoldering beneath the charred shell.",
            "The armor appears slick, its texture akin to wet stone, yet when touched it is dry and unpleasantly sticky, as though it rejects the warmth of living hands.",
            "Faint etchings cover its body — jagged, twisting marks that seem carved by no human tool. At times, the grooves appear to writhe, shifting like serpents across its surface.",
            "Its color is that of congealed blood, a deep maroon veined with darker streaks. The stains do not look painted or forged, but soaked into the material like something long steeped in death.",
            "The piece is covered in countless scratches and gouges, yet none look like the marks of battle. Instead, they resemble claw-marks, layered over one another in a frenzy of violence.",
            "A faint oily sheen covers the armor, refracting light into sickly hues of green and purple. The colors seem wrong, never holding still, as if the surface were alive with corruption.",
            "The material is pocked with holes and pits, not from rust but as though eaten by acid. Despite the decay, it remains strong, an unsettling defiance of nature’s rules.",
            "Its surface carries faint handprints, pressed deep into the material, warped and elongated. Each looks as though it had been burned into place by desperate fingers clawing for escape.",
            "The armor is ashen gray, dry and brittle-looking, with hairline cracks running across it like old bones. Yet it does not crumble, holding firm as if preserved by something unnatural.",
            "Across the piece are embedded dark nodules, round and glassy, resembling eyes. They do not move, yet the wearer is never free of the feeling that they are being watched.",
            "The surface ripples faintly, as though a thin membrane stretches over something shifting beneath. Touching it gives the unsettling impression of pressing against skin stretched too tight.",
            "The texture resembles scar tissue, uneven and twisted, giving the impression that the armor itself has healed from some terrible wound.",
            "It reeks faintly of sulfur, and the colors across it resemble dried volcanic rock — black, red, and burnt orange — layered as though drawn from the earth’s veins.",
            "The armor is covered in thin, jagged spines that curl backward, their edges not sharp enough to cut but enough to snag and tear when brushed.",
            "Its surface is unnaturally smooth, too perfect, like polished obsidian. But across it spread faint cracks that look almost like veins, branching out from a single hidden heart.",
            "The armor has the appearance of dried leather, but its texture is strange, with faintly ridged patterns like the underside of a reptile’s skin.",
            "Embedded throughout its surface are tiny, faintly glowing motes, red like dying coals. They flicker weakly, never bright enough to illuminate, but always visible in the corner of the eye.",
            "The material looks as though it has been soaked in ink, its surface a slick black that seems to swallow details and blur outlines.",
            "Its texture is granular, like rough sand fused together, but it grinds faintly under touch, as though eager to erode what touches it.",
            "The armor has streaks that resemble dried tears, running down from unseen eyes above. The stains are glossy and dark, never flaking or fading.",
            "It is streaked with uneven discoloration, some patches pale as bone, others dark as tar, giving it a patchwork look that feels disturbingly organic.",
            "The armor is marred with indentations that resemble the imprints of teeth, some human, some not. None seem fresh, yet none appear to have healed.",
            "Its surface is covered in faint ridges that spiral inwards like whirlpools, drawing the eye toward unseen centers. Looking too long induces a dull sense of vertigo.",
            "It bears a faint mottled sheen, like the surface of diseased flesh mottled in green, purple, and black. The patterns seem random, yet eerily natural.",
            "The armor’s texture is waxy, unnervingly soft to the touch, though it is as unyielding as iron. It leaves the faint impression of fingerprints where grasped.",
            "It is studded with jagged protrusions resembling broken bones forced outward. The pale ridges contrast starkly against the darker base material.",
            "The surface is coarse and brittle, flaking in thin shards that never fully break away. Each fragment clings stubbornly, whispering as it cracks beneath touch.",
            "Its color is an unsettling mix of matte black and sickly gray-green, like mold growing across stone. The blotches spread unevenly, as though alive.",
            "The armor looks almost stitched together, seams crossing irregularly, though no thread or cord is visible. Instead, the seams seem fused by some unseen hand.",
            "Its texture is jagged and uneven, resembling cooled lava frozen mid-eruption. Sharp ridges rise and fall unpredictably, catching both light and shadow.",
            "The armor looks drenched, its surface slick and gleaming, yet it leaves no moisture on touch. It carries the eternal sheen of something freshly bled.",
            "The surface is fractured into dozens of facets, like a crude gemstone, but the reflections that come back are warped, as though they belong to another world.",
            "It bears faint markings, not carved but grown, branching like the roots of a tree. The shapes spread and intertwine, resembling veins crawling through its body.",
            "Its surface is unnervingly pale, almost luminous in dim light, like bone that has been polished smooth by centuries of handling.",
            "The armor has pits and channels across it that resemble veins carved into stone, branching unnaturally, as though something circulates within its body.",
            "Its texture is taut and ridged, reminiscent of tendons pulled too tight. The grooves pull in unnatural directions, making it difficult to focus on.",
            "The color is inconsistent, bleeding between deep black and muddy red. The hues never settle, shifting in strange patterns across its form.",
            "It appears scarred, its surface slashed again and again by deep gashes. Yet the gashes remain raw, as if still fresh, never sealing or scabbing over.",
            "The armor is covered in a powdery residue, dark gray like ash, which clings faintly to the skin of any who touch it. No matter how often it is brushed away, it always returns."
        )},
        'DescriptionForArmorVisualsGeneric': { text: () => rng.randomOf(
            "Its surface is covered in overlapping layers, not quite scales and not quite plates, each ridge flowing into the next as though the armor had grown that way rather than being forged. In certain lights, faint striations ripple across the surface, like muscle beneath skin.",
            "The armor bears the color of scorched earth — deep browns and muted blacks blended unevenly. Its texture is gritty and rough, with patches smoother than others, as though it had weathered storms of sand and ash for a hundred years.",
            "The piece seems carved from a single block of stone, veins of lighter gray threading through the darker mass. Despite its mineral look, it flexes slightly when pressed, creaking like distant rock under pressure.",
            "At first glance it resembles tarnished bronze, but up close the surface reveals minute whorls and spirals, as though fingerprints the size of mountains had been pressed into it before it hardened. The patterns never quite line up when viewed again.",
            "The armor’s finish is uneven, mottled with dark stains like dried blood that has soaked deep into the material. Some areas glint faintly as though polished smooth, while others remain dull and matte, like forgotten corners untouched for centuries.",
            "Its texture recalls bark peeled from an ancient oak — coarse ridges alternating with smoother lines, irregular yet sturdy. In places, the armor seems to flake at the edges, though no fragment ever breaks loose.",
            "The entire surface is pocked with shallow depressions, as though eaten by corrosion, yet it remains unweakened. The hollows catch shadow strangely, giving the impression of hundreds of eyes pressed into the surface.",
            "A pale, chalky hue dominates its color, marred by faint streaks of ochre and gray. It looks brittle, almost fragile, but when touched it is cold and unyielding, harder than tempered steel.",
            "The armor appears fibrous, like bundles of cord or sinew compressed until they became solid. Its surface is striated with faint lines, each one following the grain of something organic long since petrified.",
            "It bears a finish like old leather, cracked and worn in irregular patterns. Some parts gleam with the softness of oil, while others are dulled into a flat dryness, as though forgotten beneath desert sun.",
            "The material gleams faintly, not with shine but with depth, like obsidian that swallows light instead of reflecting it. Its surface is smooth but oddly warm to the touch, as though it had been resting near fire.",
            "Its form is unevenly polished, one side glimmering faintly like brushed silver, the other dulled with scratches that look deliberate, like tally marks etched into its hide. Each scratch runs deep but leaves no weakness.",
            "The armor has a distinctly layered appearance, each stratum a slightly different shade — charcoal, slate, ash, and soot — as though it had been formed in the aftermath of countless burned-out fires.",
            "Its surface is porous, filled with tiny pits like volcanic rock, yet its edges are smooth as though hand-carved. The contrast gives it a strange duality, both crude and crafted in the same breath.",
            "The piece carries faint streaks of green patina creeping across its darker body, like veins of moss overtaking old bronze. In some places, the colors form natural patterns reminiscent of rivers branching through soil.",
            "It feels unnervingly organic, its texture recalling dried hide stretched taut over bone. The faint impressions of ridges and seams beneath the surface give the impression of something still living, frozen in armor’s shape.",
            "The armor glimmers dully with a waxen sheen, a texture neither metal nor leather. Its coloring shifts between gray and ivory in blotches, like old candle wax hardened in uneven layers.",
            "Its body carries the faint grain of wood, knotted and irregular, though its strength is far beyond timber. The knots twist into strange shapes, some resembling faces or eyes if stared at too long.",
            "The surface looks brittle and fractured, covered in fine cracks like dried clay. Yet the cracks seem frozen in place, not spreading, as though whatever broke it had long ago been halted in time.",
            "The armor bears a smoothness like riverstone, each curve worn down to subtle edges. Its color is a muted slate, with darker streaks threading through it like veins of water frozen into stone."
        )},
        'DescriptionForVisualsGeneric': { text: () => rng.randomOf(
            "The {This}'s surface is marbled with veins of pale gray and deep crimson, as if quarried from some ancient stone rather than forged.",
            "The texture is uneven and rough to the touch, like bark torn from a withered tree, yet it holds together seamlessly.",
            "It bears a mottled pattern of dull greens and browns, resembling aged bronze that has weathered centuries of corrosion.",
            "The {This} is streaked with jagged black striations that cut through its length like frozen lightning.",
            "The {This}'s body carries a grain like old wood polished smooth by countless hands, though no splinter or crack ever forms.",
            "Patches of its surface are pitted and scarred, as though it had been gnawed by time itself.",
            "The hue is an unsettling mix between bone-white and gray, like something unearthed from a grave long forgotten.",
            "The {This} seems carved rather than forged, every line and ridge etched with meticulous, almost obsessive detail.",
            "The {This}'s texture resembles tightly packed scales, overlapping so finely they appear seamless until examined closely.",
            "The surface bears faint whorls and swirls, like knots in driftwood or fingerprints pressed into stone.",
            "It has a flat, matte finish, dull and unreflective, drinking in any light that falls upon it.",
            "The coloring is inconsistent, mottled like ash and soot mingled together, giving it the look of something burnt.",
            "Across its length run ridges like dried, cracked earth in the heart of a drought.",
            "The {This}'s shape is oddly organic, as though grown rather than crafted, with curves that resist symmetry.",
            "The texture feels almost porous, like pumice, though it is far heavier than it appears.",
            "The {This} is stained with faint discolorations, faint rings and blotches like water left long on iron.",
            "The {This}'s surface has a fine crosshatch pattern, like the scales of an insect wing magnified a hundredfold.",
            "It bears a sheen like oiled leather — not reflective, but soft and strangely supple in appearance.",
            "The material is streaked in layered bands of darker and lighter shades, as if compressed over eons.",
            "It looks weathered yet unbroken, as if dredged from ruins, its form intact but scarred with age.",
            "The {This}'s surface is marbled with veins of pale gray and deep crimson, as if quarried from ancient stone rather than forged.",
            "The texture is uneven and rough to the touch, like bark torn from a withered tree, yet it holds together seamlessly.",
            "It bears a mottled pattern of dull greens and browns, resembling aged bronze that has weathered centuries of corrosion.",
            "The {This} is streaked with jagged black striations that cut through its length like frozen lightning.",
            "The {This}'s body carries a grain like old wood polished smooth by countless hands, though no splinter or crack ever forms.",
            "Patches of its surface are pitted and scarred, as though The {This} had been gnawed by time itself.",
            "The hue is an unsettling mix between bone-white and gray, like something unearthed from a grave long forgotten.",
            "The {This} seems carved rather than forged, every line and ridge etched with meticulous, almost obsessive detail.",
            "The {This}'s texture resembles tightly packed scales, overlapping so finely they appear seamless until examined closely.",
            "The surface bears faint whorls and swirls, like knots in driftwood or fingerprints pressed into stone.",
            "It has a flat, matte finish, dull and unreflective, drinking in any light that falls upon it.",
            "The coloring is inconsistent, mottled like ash and soot mingled together, giving it the look of something burnt.",
            "Across its length run ridges like dried, cracked earth in the heart of a drought.",
            "The {This}'s shape is oddly organic, as though grown rather than crafted, with curves that resist symmetry.",
            "The texture feels almost porous, like pumice, though it is far heavier than it appears.",
            "The {This} is stained with faint discolorations, faint rings and blotches like water left long on iron.",
            "The {This}'s surface has a fine crosshatch pattern, like the scales of an insect wing magnified a hundredfold.",
            "It bears a sheen like oiled leather — not reflective, but soft and strangely supple in appearance.",
            "The material is streaked in layered bands of darker and lighter shades, as if compressed over eons.",
            "It looks weathered yet unbroken, as if dredged from ruins, its form intact but scarred with age.",
            "The {This}'s edges seem smoothed by erosion, rounded just enough to suggest endless years of use.",
            "The color shifts subtly between dull copper and green, the hues of metal half-consumed by patina.",
            "The {This}'s length bears hairline cracks that run like spiderwebs, yet none seem to weaken its structure.",
            "The {This} appears fibrous, strands wound tightly together like rope hardened into iron.",
            "The surface ripples with faint ridges, like muscles tensed just beneath a stretched hide.",
            "It carries an unnatural polish, reflecting not light but depth, as if peering into dark water.",
            "The {This}'s grain is coarse and jagged, more akin to volcanic glass than any tempered steel.",
            "The texture is rough but uniform, like sandstone worn smooth by desert winds.",
            "The {This}'s entire form is subtly asymmetrical, warped just enough to unsettle the eye.",
            "The surface is mottled in pale and dark speckles, like the hide of some great beast.",
            "It carries a muted gleam, not bright but steady, like stone wet from fresh rain.",
            "The {This}'s shape seems too precise, every line razor-straight as if cut by unnatural hands.",
            "The material appears to have been layered in sheets, each faintly visible in its edges.",
            "The {This}'s body is faintly translucent, like cloudy quartz where shadows stir within.",
            "The surface bears dim scratches, marks that suggest ages of struggle and survival.",
            "The {This}'s form is twisted ever so slightly, like wood that has grown around a knot.",
            "The color is uneven, streaked with faintly metallic glimmers that refuse to settle.",
            "It feels cold not like metal but like stone freshly unearthed from the deep earth.",
            "The {This}'s edges are jagged and irregular, as if broken off rather than carefully shaped.",
            "The surface bears fine, shallow etchings, no pattern but countless small lines crossing.",
            "It looks grainy, composed of compacted fragments that somehow hold unbroken.",
            "The item’s weight feels denser than expected, like something compacted far beyond reason.",
            "The {This}'s surface is slick and polished, yet oddly resistant to holding fingerprints.",
            "The form is blocky and angular, with harsh corners that refuse refinement.",
            "It bears muted colors in layered bands, like sediment left by countless floods.",
            "The texture is pebbled, tiny rises and dips like tanned hide stretched taut.",
            "The {This}'s sheen is waxy, more like preserved bone than forged steel.",
            "The body carries irregular indentations, like something hammered into shape by accident.",
            "The {This}'s structure seems crystalline, countless facets catching faint light in muted glimmers.",
            "The surface is uneven, one side warped outward as though it grew lopsided.",
            "The {This}'s look resembles charcoal hardened into stone, black and fractured but sturdy.",
            "The item bears faint discoloration, splotches of pale and dark tones mixed without order.",
            "The {This}'s texture is fibrous and stringy, like sinew bound together into hardened form.",
            "The material resembles compressed ash, fragile to the eye but unyielding to touch.",
            "The {This}'s body feels heavier at the core, the density seeming to pull inward.",
            "The surface is ridged in overlapping lines, almost like layers of bark frozen in place.",
            "It seems both rough and smooth at once, alternating patches of grain and polish.",
            "The {This}'s colors are earthy and subdued, browns and grays blending without vibrancy.",
            "The {This} is striated with faint, wave-like lines, like sediment pressed into stone.",
            "It carries the dull hue of tarnished silver, a luster once bright now buried beneath time.",
            "The shape is slightly warped, edges bending inward as though compressed by pressure.",
            "The {This}'s structure seems layered like shale, sheets pressed together tightly and unbroken.",
            "The surface is marbled with faint streaks of gold and black, like veins in mineral ore.",
            "It feels unnaturally smooth, more like riverstone than anything forged by tools.",
            "The {This}'s texture is leathery and taut, as if stretched hide had hardened to iron.",
            "The {This} seems granular, its form made of countless tiny particles bound together.",
            "The {This}'s surface is faintly ridged, like the rings of a tree pressed into hardened form.",
            "The material appears dappled, blotched with darker and lighter tones across its surface.",
            "The {This}'s look is brittle and sharp, yet it refuses to chip or crack under strain.",
            "The texture feels waxy and cold, oddly resistant to heat or warmth.",
            "The {This}'s edges ripple faintly, jagged lines like fractured glass that never cut unevenly.",
            "The surface is unevenly polished, patches dulled and others gleaming faintly.",
            "The {This}'s structure resembles woven strands, like cords tightly braided into permanence.",
            "The color is muted, no shine or gloss, only the matte finish of something ancient.",
            "It bears tiny raised bumps, like scales grown so small they blur into roughness.",
            "The form seems eroded, not crafted, as though shaped by tide and storm.",
            "The {This}'s hue is deep, dark, and earthy, like clay hardened into unyielding form.",
            "The surface feels subtly waxen, resisting touch as though sealed.",
            "The {This}'s body carries fine grooves, faint striations that run its length without order.",
            "It bears an irregular sheen, light catching awkwardly across its misshapen body.",
            "The material is dusky and pale, a muted color like faded parchment.",
            "The {This}'s surface is peppered with minute imperfections, as though pitted by acid.",
            "It feels strangely soft at first, but resists pressure like tempered iron.",
            "The body is mottled with hues of deep brown and black, like dried blood in stone.",
            "The {This}'s edges hold an uncanny smoothness, as if polished by countless hands.",
            "The shape is irregular, jutting angles that seem neither natural nor deliberate.",
            "The {This} bears layered cracks, thin and shallow but innumerable.",
            "The {This}'s texture resembles hardened clay, cracked but never crumbling.",
            "It has a cold, metallic dullness, without any gleam or warmth.",
            "The surface is streaked with pale discolorations, like frost trapped in iron.",
            "The {This}'s form seems more carved than forged, sharp lines cut into stubborn substance.",
            "The coloring is inconsistent, pale spots scattered against darker patches.",
            "The {This}'s structure feels compact and impenetrable, like stone compressed into steel.",
            "The texture is ridged, almost serrated, across its surface without disrupting form.",
            "The {This}'s hue is flat and lifeless, as though drained of all vibrancy.",
            "The surface is scarred with deep, uneven marks, each looking like a wound healed in metal.",
            "The {This}'s appearance recalls petrified wood, grain and all, solidified into permanence.",
            "The {This} feels brittle in sight but solid in hand, like glass refusing to shatter.",
            "The {This}'s body is blotched with irregular shades, as if stained by unseen hands.",
            "The surface appears porous, tiny holes across its body like fossilized coral.",
            "The {This}'s look is plain and subdued, no embellishment, only raw substance shaped crudely."
        )},
        'DescriptionForHolyItem': { text: () => rng.randomOf(
            `It ${getSymbolText('Glows')} softly with ${an(getSymbolText('Glow'))} that seems to pulse in time with the heart of the world. Those who hold it feel warmth deep in the chest, a quiet insistence that they are seen, watched over by something older and wiser than memory itself. Yet the light is not comforting in a simple way; it whispers of choices and paths yet untaken, leaving the mind both calmed and uneasy.`,
            `The {This} ${getSymbolText('Hums')}${getSymbolText('AdverbForMovementNoSpace')}, a resonance that cannot be heard but felt, like the vibration of faith itself. Eyes are drawn to it involuntarily, and when looked away, one swears they can still see its glow at the edge of vision. It carries a sense of judgment, not harsh, but impartial, as if measuring the worth of intentions unseen.`,
            `Its surface ${getSymbolText('Glows')}, ${getSymbolText('Moving')}, seeming almost alive, like sunlight rippling over water, yet each reflection reveals a different shape to every observer. The closer one studies it, the more it seems to reveal hidden truths about the self, offering both insight and a gentle, unnerving challenge to the mind.`,
            `${an(getSymbolText('AdjectiveForMovement'))} halo surrounds it, pale and steady, yet it seems to bend the air, space, and even thought around it. When held, it evokes visions of distant skies and unseen realms, places of both serenity and gravity, where the weight of purpose is felt as tangibly as the weight of the world.`,
            `It feels impossibly old and yet unaged, carrying an aura that suggests the presence of countless unseen witnesses. Those who carry it feel their intentions amplified, as if The {This} knows not what is done but why, reflecting inner truth and inspiring awe and fear in equal measure.`,
            `Its glow is faint, steady, and strangely warm, not in temperature but in sensation, as if the light itself carries understanding. The air around it seems quieter, attention drawn to the unseen, and the mind feels tuned to possibilities beyond immediate comprehension.`,
            `The {This} ${getSymbolText('Hums')}${getSymbolText('AdverbForMovementNoSpace')} with a resonance like distant bells heard in a dream. Thoughts settle and clarity blooms, yet an unease remains, the sense that the world has more layers than can ever be known, and that The {This} grants a glimpse of their weight and depth.`,
            `It ${getSymbolText('Glows')} without revealing its source, illuminating not the world but perception itself. Those who hold it find their senses sharpened, their hearts stirred by emotions they cannot name, and a quiet certainty that some force guides not through coercion but through subtle insistence.`,
            `A warm radiance flows from it in waves that reach beyond the eyes, touching memory, conscience, and spirit alike. Those nearby feel compelled toward kindness, reflection, or contemplation, yet The {This} resists simple understanding, hinting that its purpose lies somewhere between guidance and mystery.`,
            `It carries the echo of countless prayers, ${an(getSymbolText('Moving'))} and lingering like wind through an empty cathedral. When grasped, the mind feels simultaneously at peace and alert, aware of unseen presences, and drawn into an understanding too vast to name, yet intimately personal.`,
            `It radiates ${an(getSymbolText('AdjectiveForMovement'))} golden light, steady and unwavering, yet the source seems to shift when looked at directly. Those who hold it feel as if unseen eyes are observing, weighing thoughts and deeds, and a subtle pressure compels honesty in ways that cannot be explained.`,
            `A soft resonance ${getSymbolText('Hums')} through it, felt more than heard, as if The {This} itself listens and responds to intention. The mind feels both illuminated and scrutinized, aware of hidden truths it has long evaded, and drawn toward understanding without fear.`,
            `The glow around it bends gently, like sunlight through morning mist, revealing fleeting visions of paths not taken. Those who peer too closely feel the sensation of being guided, yet cannot discern whether the direction is for them or for something greater.`,
            `It ${getSymbolText('Hums')}${getSymbolText('AdverbForMovementNoSpace')}, like a choir just beyond hearing, and the air carries a subtle warmth, comforting yet solemn. Holding it evokes reverence and quiet introspection, as if The {This} holds the weight of countless prayers and unanswered questions.`,
            `Its surface reflects light in patterns that seem impossible, shifting subtly with perspective. Observers feel pulled toward contemplation of their own choices, and a quiet understanding that some truths exist beyond sight, waiting to be glimpsed only by the worthy.`,
            `A gentle luminescence pulses from it, soft and persistent, like the rhythm of a heartbeat that is not one’s own. Those who touch it sense patience and judgment intertwined, as if The {This} measures not just action, but intent and devotion.`,
            `It ${getSymbolText('Glows')} with a pale, almost liquid light, flowing over surfaces as if aware of the spaces it occupies. The air seems charged with possibility, and those near it feel compelled to reflect, act, or speak with care, as though The {This} observes the very weight of their words.`,
            `A quiet warmth emanates from it, soft and penetrating, touching the chest and mind alike. The longer it is held, the more the mind feels stretched toward clarity, yet also haunted by the sense that not all answers are meant to be grasped.`,
            `The {This} glimmers${getSymbolText('AdverbForMovementNoSpace')}, like candlelight refracted through water, and shapes flicker across its surface that cannot be named. Observers feel a tug toward both wonder and caution, a simultaneous attraction and wariness that is difficult to articulate.`,
            `Its radiance is subtle, almost imperceptible, yet when noticed it seems to highlight the edges of perception, revealing connections and truths that are not immediately visible. Those who study it feel both insight and humility, aware of the vastness of what remains unknown.`,
            `It ${getSymbolText('Hums')}${getSymbolText('AdverbForMovementNoSpace')} with a tone that resonates in memory as much as in ears, like echoes of prayers long forgotten. The mind feels expanded, yet grounded, as if glimpsing a truth larger than oneself while remaining intimately tied to it.`,
            `A pale halo seems to drift around it, bending light and air in delicate patterns. Holding it evokes reverence and unease, a quiet awareness that some power watches, guiding subtly rather than enforcing, and that faith may be tested in ways unseen.`,
            `Its glow flows like liquid silver, steady and measured, yet shifting imperceptibly when unobserved. Those near it feel the world slow slightly, each breath weighted with meaning, and the sense that choices carry far-reaching consequences beyond comprehension.`,
            `A faint, almost imperceptible warmth radiates from it, brushing the skin and touching thought. The {This} seems aware of doubt and certainty alike, nudging the mind toward reflection, yet never revealing the full extent of its purpose.`,
            `It ${getSymbolText('Glows')} like sunlight through clouds after a storm, soft and yet undeniable. Observers feel the tug of unseen guidance, as if the light itself encourages contemplation of duty, morality, and the unseen threads connecting all actions.`,
            `The {This} ${getSymbolText('Hums')} with a quiet, steady but constant ${getSymbolText('Sound')}, like the echo of a sacred ritual carried on wind. Holding it evokes calm and focus, yet also a strange alertness, a sense that some unseen judgment lingers just beyond perception.`,
            `Its radiance bends subtly, casting soft shadows that flicker without reason. Those who watch feel the mind open slightly, glimpsing connections and patterns normally invisible, as if The {This} imparts understanding beyond sight or hearing.`,
            `A gentle light flows across its surface, warming without heat, touching the spirit more than the body. The longer it is held, the more the heart feels attuned to intent and consequence, as if The {This} translates inner truth into subtle guidance.`,
            `It glimmers${getSymbolText('AdverbForMovementNoSpace')}, not enough to illuminate, yet enough to reveal the presence of hidden corners and overlooked paths. Those nearby feel a quiet insistence to notice, reflect, and act with care, aware that unseen forces may be observing.`,
            `Its glow is soft and persistent, like the echo of a hymn in an empty hall, stirring thought and conscience alike. Handling it evokes both humility and purpose, a sense that small acts resonate far beyond their immediate effect`,
        )},
        'DescriptionForDarkItem': { text: () => rng.randomOf(
            `It ${getSymbolText('Hums')}${getSymbolText('AdverbForMovementNoSpace')} ${getSymbolText('When')}, a low, insistent vibration that presses against the bones and whispers truths too terrible to speak aloud.`,
            `The {This} seems to breathe in sync with its bearer, a slow, patient inhalation that leaves a chill lingering long after it is lifted.`,
            `Shadows gather unnaturally around it, writhing in corners as if recoiling from the light of sanity itself.`,
            `A ${an(getSymbolText('AdjectiveForMovement'))} scent of decay clings to it, subtle yet persistent, as if The {This} remembers every life it has taken or consumed.`,
            `The air around it trembles slightly, charged with a presence that cannot be seen but is always aware of who approaches.`,
            `Its weight is inconsistent, pressing down impossibly heavy one moment, and then nearly weightless, as if it measures the resolve of its wielder.`,
            `Faint whispers follow it, half-formed phrases that unsettle memory and draw the mind toward things better left forgotten.`,
            `It pulses with a rhythm not its own, echoing in the chest like the heartbeat of something ancient and hungry.`,
            `Those who glance too long at it feel the edges of reality bend, as if the world itself hesitates at its presence.`,
            `A subtle aura clings to The {This}, a haze of dread and longing that sinks into skin and thought alike.`,
            `Even in the absence of movement, it feels alive, watching, patient, waiting for some unseen signal to act.`,
            `The silence around it is thick, pressing down, as though the air itself fears to speak in its presence.`,
            `Its presence seems to bend the perception of time, stretching seconds into minutes and leaving a lingering anxiety in its wake.`,
            `The shadows it casts are never static; they twitch and coil as though alive, sometimes moving contrary to the object itself.`,
            `A subtle pressure lingers ${getSymbolText('When')}, a weight on the mind that grows stronger the longer one remains in its presence.`,
            `It seems to draw attention ${getSymbolText('When')}, pulling gazes toward it like a predator testing the edges of its prey’s courage.`,
            `Those who handle it feel an almost imperceptible tug at thought and memory, threads pulled toward a dark and distant place.`,
            `The {This} exudes a quiet hunger, a latent menace that seems to measure the intentions of all who touch it.`,
            `It ${getSymbolText('Hums')}${getSymbolText('AdverbForMovementNoSpace')}, a sound not heard with the ears but felt in the bones, vibrating with a rhythm that is not your own. Those who linger too long report dreams of impossible geometry, of vast cities bending and twisting beneath alien skies. The air around it grows colder with each passing moment, pressing against the chest and whispering in a language the mind cannot comprehend.`,
            `The {This} seems to watch. Its presence gnaws at the edges of thought, tugging at memories best forgotten and weaving them into visions of terror. Shadows twist unnaturally around it, reaching for the unwary, and a ${an(getSymbolText('AdjectiveForMovement'))} metallic taste lingers on the tongue, like iron stolen from blood long spilled.`,
            `A faint, sickly light pulses from its surface, ebbing and flowing like the heartbeat of a corpse. When touched, it leaves impressions not on the skin, but deep in the mind, images of clawed hands, endless corridors, and eyes that watch from places that should not exist. Those who carry it feel the slow, insidious weight of unseen attention pressing upon them.`,
            `It breathes ${getSymbolText('When')}, a subtle expansion and contraction that no mortal lungs could produce. In the silence, ${an(getSymbolText('AdjectiveForMovement'))} whispers coil around the mind, half-heard secrets of distant stars and ancient beings that feed on fear. The darkness it leaves behind is thick and waiting, as if ready to claim whatever fragment of reality it can reach.`,
            `The glow it emits is unnatural, sickly, and almost sentient, crawling along surfaces like oil. Time bends near it; moments stretch and compress unpredictably, and eyes see shapes shifting just beyond comprehension. Even those who do not touch it feel a weight upon their soul, a pressing insistence that something is watching, waiting, and calculating.`,
            `Its shadow moves contrary to its form, stretching and twisting as if alive. Those who carry it hear faint, rhythmic drumming in the chest, like the slow march of a distant army across unseen plains. The air smells${getSymbolText('AdverbForMovementNoSpace')} of ash and iron, and dreams are haunted by impossible landscapes, mountains folded into themselves and skies crowded with eyes that do not blink.`,
            `It ${getSymbolText('Hums')} and shivers, though it is motionless, sending ripples of unease through the mind. The closer one draws, the more the world seems to tremble; walls bend subtly, sounds stretch and distort, and the gaze feels pulled toward a point just out of reach, a place where understanding dies and madness waits.`,
            `A cold, black haze clings to its surface, moving as if alive. The {This} whispers in silence, and each whisper lingers in the mind long after it stops. Thoughts of violence, decay, and impossible things press into the consciousness, and the holder feels their own fears mirrored and magnified in the object’s gaze.`,
            `Its surface is never still; ${an(getSymbolText('AdjectiveForMovement'))} ripples crawl across it like water over a corpse, and a dim, greenish glow seeps outward at irregular intervals. The air around it carries a ${an(getSymbolText('AdjectiveForMovement'))} taste of rot, and sometimes in the corner of vision one glimpses figures crouching, watching, waiting. Those who study it too closely are left with memories that are not their own, recollections of horrors that cannot exist in this world.`,
            `The {This} exudes hunger. It does not merely exist, but reaches, pulling at thoughts, tugging at shadows, bending reality subtly toward itself. Silence falls when it is near, oppressive and thick, broken only by the faint, rhythmic pulsing of something that is neither alive nor dead, yet watches and waits for the moment its patience is rewarded`,
        )},
        'LikeMetaphorForLight': { text: () => rng.randomOf(
            'a glow like embers buried in ash, never bright but seeming very much alive',
            'as if lit from within by a dying star’s last breath',
            getSymbolText('Moving') + ' instead of casting shadows',
            'a pale gleam',
            'like dawn caught in crystal, forever on the edge of breaking day',
            `too ${an(getSymbolText('AdjectiveForMovement'))} to see head-on, revealed only in the corner of the eye`,
            `${an(getSymbolText('Glow'))} that ${getSymbolText('Changes')} like the rhythm of slow breathing`,
            `${an(getSymbolText('Glow'))} that bends around it, haloing the shape without touching it`,
            `${an(getSymbolText('Glow'))} that is strangely heavy, as though weighed down by ${rng.randomOf('time', 'time itself', 'generations passed', 'centuries past')}`,
            `burning with no flame, like sunlight recalled in dream rather than reality`,
            `${an(getSymbolText('Glow'))} that does not reach the air around it, confined within its own ${getSymbolText('Texture')} ${getSymbolText('Gemstone')}-like surface.`,
            `${an(getSymbolText('Glow'))} that does not reach the air around it, confined within its own texture.`,
            `its ${getSymbolText('Glow')} fractured, broken into shards of color that like dust motes`,
            `${an(getSymbolText('Glow'))} so soft it feels more like warmth on the skin than light to the eyes`,
            `${an(getSymbolText('Glow'))} that ${getSymbolText('SeemsTo')} pull the gaze inward, as though it opened onto some endless horizon`,
            `${an(getSymbolText('Glow'))} that seems to pull the gaze inward, as though it opened onto some endless horizon`,
            `${an(getSymbolText('Glow'))} that flickers like candlelight seen through water, never steady, always wavering as though afraid to be seen`,
            `${an(getSymbolText('Glow'))} that seeps ${getSymbolText('InDirection')} like smoke, curling into the air before thinning into nothing`,
            `${an(getSymbolText('Glow'))} fractured, scattered into thin strands like a spider’s web spun of starlight`,
            `${an(getSymbolText('Glow'))} a dim fire, more suggestion than illumination, yet somehow strong enough to banish shadows nearby`,
            `${an(getSymbolText('Glow'))} restless, ${getSymbolText('Moving')} like sparks of a fire too wild to be contained`,
            `${an(getSymbolText('Glow'))} sways gently, as if stirred by a wind no one can feel`,
            `and the ${getSymbolText('Glow')} feels borrowed, as though it remembers the sun but cannot quite recreate its warmth`,
            `the ${getSymbolText('Glow')} bending strangely, as if reluctant to leave its form`,
            `like frost catching the moon, sharp and cold but gone at the slightest touch`,
            `glimmering as though from some depth beneath its surface, like sunlight trapped under ice`,
            `a halo that trembles in silence, like the air just before a storm breaks`,
            'like the echo of a dying star',
            'not spreading outward but pulling inward, as though gathering the world into itself',
            'conveying a feeling impossible to name, like the first glimmer before waking from a dream',
            'and the illumination feels alive, adjusting in strength as though aware of who is watching it',
            'its glow trembles like starlight seen through tears, fragile and fleeting',
            'a radiance that feels older than fire, older than the sun',
            `its shine flowing like liquid crystal, sliding across the surface in patterns that never repeat`,
            'erratic and striking, as though the object has just been pulled from the heart of a thunderstorm',
            'the glow is soft yet piercing, scattering into crystalized fading pixels',
            'the illumination seeping into shadows instead of banishing them, staining the dark with its own pale hue',
            'gleaming like a mirror catching a sky that does not belong to this world',
            'the glow coming not from its surface but from a depth beyond sight, as though it opens onto another horizon',
            `crackling${getSymbolText('AdverbForMovementNoSpace')}, like a storm bottled and set to smolder forever`,
            'the radiance crawling around in shimmering veins, twisting and writhing like roots seeking soil',
            'a glow as heavy as stone, pressing down on the eyes until one is forced to look away',
            `shining with ${an(getSymbolText('Glow'))} that seems to belong to no sun nor moon, the sort of glow one might see only in dreams`,
            `but the illumination feels inverted, casting shadows that cling brighter than the flame`,
            `runing along it like blood beneath skin, pulsing${getSymbolText('AdverbForMovementNoSpace')}, steady and alive`,
        )},
        'ButMetaphorForLight': { text: () => rng.randomOf(
            `evidently, yet somehow refusing to fade completely`,
            `yet the memory of the light lingers as if imprinted on the eyes`,
            `but, the light feels more like a spot in the eyesight rather than illumination`,
            'though the sense of that radiance remains heavy in the air',
            'but the radiance lingers after The {This} is gone, burned into the eyes ',
            'but the radiance lingers after The {This} is gone, burned into the eyes ' + getSymbolText('LikeMetaphorForLight'),
            'but the light immediately snaps back to its place afterward',
            'yet the air remains charged, trembling with a silence that feels alive',
            'but shadows retreat a slightly slower, as though reluctant to return',
            `however, a ${an(getSymbolText('AdjectiveForMovement'))} warmth clings to the surface, long after the light is gone`,
            `however, a ${an(getSymbolText('AdjectiveForMovement'))} warmth clings to the ${getSymbolText('Texture')}, long after the light is gone`,
            'but in the corner of the eye, it still shines, refusing to die...',
            `however, the surface around it ${getSymbolText('Glows')}${getSymbolText('AdverbForMovementNoSpace')}, as if marked by its passing`,
            `but its echo remains, a shimmer that flickers across steel and stone alike`,
            `though the darkness returns, it carries with it a ${an(getSymbolText('AdjectiveForMovement'))} shimmer, as though forever painted with a magical essence`,
            'but the impression of it clings to the place, half memory and half real',
            `but ${an(getSymbolText('AdjectiveForMovement'))} traces linger on the edges of metal and stone, outlines that glimmer briefly before settling into darkness.`,
            'yet the eyes strain as though still dazzled, forcing the bearer to blink before the world feels steady again',
            'yet the afterimage hovers in the mind’s eye, as if the glow continues somewhere just beyond reach',
            'however, the eyes of onlookers often linger in its absence, searching for the shimmer even when they know it is gone',
            'yet the glow seems to withdraw into The {This} itself, sinking beneath the surface like a breath drawn inward',
            'but the fading leaves a quiet stillness, a pause that feels deeper than ordinary night',
            'however, the space it leaves behind feels unsettled, as if waiting for the light to return at any moment',
            'yet a coldness lingers, sinking into the bones of those who touched it, as if the warmth was never theirs to hold',
            `but the air smells${getSymbolText('AdverbForMovementNoSpace')} of decay, a subtle reminder that life and light are fleeting`,
        )},
        'Element': { text: () => {
            const elementsByBias = {
                'Fire': [
                    'molten lava',
                    'lava',
                    'fire',
                    'flames',
                    'scorching fire'
                ],
                'Cold': [
                    'frost',
                    'pure frost',
                    'ice',
                    'true ice',
                ],
                'Shock': [
                    'lightning',
                    'a current',
                    'electricity',
                ],
                'Pulse': [
                    'arcane',
                    'arcane magic',
                ],
                'Divine': [
                    'divine energy',
                    'holy energy',
                ],
                'Scourge': [
                    'evil energy',
                    'deathly magic'
                ],
                'Poison': [
                    'toxins',
                    'toxic gas',
                    'noxious air'
                ],
                'Acid': [
                    'dripping acid',
                    'ooze',
                    'molten slime'
                ]
            }
            if (item.ElementBias != null && item.ElementBias in elementsByBias) {
                return randomOf(...elementsByBias[item.ElementBias])
            }
            const randomDamageType = randomOf(...Object.keys(elementsByBias))
            if (item.ElementBias == null) {
                item.ElementBias = randomDamageType
            }
            return rng.randomOf(...elementsByBias[randomDamageType])
        }},
        'ArmorMaterial': { text: () => rng.randomOf(
            'Iron', 'Steel', 'Bronze', 'Copper', 'Brass', 'Silver', 'Gold', 'Platinum',
            'Mithril', 'Obsidian',
            'Hide', 'Leather', 'Pelt',
            'Quartz', 'Crystal', 'Glass', 'Marble', 'Moonstone', 'Sunstone',
            'Ironwood', 'Thornwood', 'Hardwood', 'Ironbark',
            'Bone', 'Shell', 'Giant Bone',
            'Serpenthide', 'Serpentleather', 'Chitin',
            'Dragonscale', 'Shadowsteel', 'Starforge Metal'
        )},
        'ClothMaterial': { text: () => rng.randomOf(
            'Silk', 'Velvet', 'Cotton', 'Satin', 'Chainmail',
            'Moonthread', 'Enchanted Cloth', 'Vineweave',
            'Hide', 'Leather', 'Pelt', 'Starweave', 'Ghostsilk',
            'Trollskin', 'Serpenthide', 'Serpentleather',
            'Aetherweave', 'Dreamthread',
        )},
        'WeaponMaterial': { text: () => rng.randomOf(
            'Iron', 'Steel', 'Bronze', 'Copper', 'Brass',
            'Quartz', 'Crystal', 'Glass', 'Marble', 'Moonstone', 'Sunstone',
            'Ironwood', 'Thornwood', 'Hardwood', 'Ironbark',
            'Bone', 'Ivory', 'Giant Fang', 'Giant Claw',
            'Shadowsteel', 'Starforge Metal'
        )},
        'WeaponPart': { text: () => rng.randomOf(
            'tip', 'handle', 'side', 'crossguard', 'etchings', 'fissures', 'cracks',
            'underside'
        )},
        'Gemstone': { text: () => rng.randomOf(
            "Diamond", "Ruby", "Sapphire", "Emerald", "Topaz", "Amethyst", "Garnet",
            "Aquamarine", "Peridot", "Opal", "Turquoise", "Jade", "Onyx", "Pearl",
            "Moonstone", "Sunstone", "Spinel", "Chrysoberyl", "Citrine", "Labradorite",
            "Malachite", "Quartz", "Obsidian", "Bloodstone", "Carnelian", "Kyanite", "Zircon",
            "Alexandrite", "Amber", "Iolite", "Chrysoprase", "Aventurine", "Smoky Quartz",
            "Selenite", "Fluorite", "Celestite", "Angelite", "Star Ruby", "Star Sapphire",
            "Mystic Topaz", "Black Diamond", "Fire Opal", "Aether Crystal", "Starlight Gem",
            "Voidstone", "Moonfire Crystal",
            "Sunheart Ruby", "Dream Quartz", "Shadow Amethyst", "Dragon’s Eye Emerald"
        )},
        'Texture': { text: () => rng.randomOf(
            'rough', 'harsh', 'smooth', 'leveled', 'rounded',
            'embossed', 'unpolished', 'polished', 'crude',
            'rugged', 'jagged', 'lighter than normal', 'heavy',
            'glossy', 'shiny', 'soft', 'refined', 'unrefined',
            'raw', 'coarse', 'cheap', 'expensive'
        )},
        'This': { text: () => thisText },
        'PatternsOf': { text: () => rng.randomOf(
            'flowing patterns of',
            'layers of',
            'various shades of',
            'shades of',
            'moving patterns of',
            'hues of'
        ) },
        'Color': { text: () => {
            const colorsByBias = {
                "Fire": [
                    "red",
                    "crimson",
                    "amber",
                    "scarlet",
                    "vermilion",
                    "ruby",
                    "cherry red",
                    "blood red",
                    "firebrick",
                    "ember orange",
                    "blazing orange",
                    "molten gold",
                    "sunset orange",
                    "tangerine",
                    "burnt orange",
                    "copper",
                    "bronze",
                    "saffron",
                    "marigold",
                    "gold",
                    "inferno",
                    "smoke black",
                    "charcoal",
                    "ash gray"
                ],
                "Cold": [
                    "turquoise",
                    "sapphire-blue",
                    "blue",
                    "ethereal blue",
                    "ice blue",
                    "frost white",
                    "glacier blue",
                    "arctic blue",
                    "polar cyan",
                    "pale cyan",
                    "mint blue",
                    "crystal blue",
                    "mist blue",
                    "winter sky",
                    "deep sea blue",
                    "midnight blue",
                    "steel blue",
                    "light steel blue",
                    "silver",
                    "moonstone",
                    "snow white",
                    "periwinkle",
                    "lavender frost"
                ],
                "Shock": [
                    "lightning",
                    "a current",
                    "electricity",
                    "electric blue",
                    "neon blue",
                    "ion blue",
                    "plasma blue",
                    "arc cyan",
                    "volt yellow",
                    "static white",
                    "storm gray",
                    "thundercloud",
                    "ozone teal",
                    "bright cyan",
                    "ultraviolet",
                ],
                "Pulse": [
                    "deep purple",
                    "violet",
                    "indigo",
                    "royal purple",
                    "dark orchid",
                    "amethyst",
                    "arcane purple",
                    "void purple",
                    "astral violet",
                    "hex violet",
                    "twilight purple",
                    "midnight purple",
                    "ultraviolet",
                    "blackberry",
                    "plum",
                    "wine",
                    "magenta",
                    "fuchsia",
                    "cosmic lilac",
                    "neon purple"
                ],
                "Divine": [
                    "orange",
                    "yellow",
                    "gold",
                    "sun-gold",
                    "halo white",
                    "radiant white",
                    "ivory",
                    "pearl",
                    "champagne",
                    "celestial cream",
                    "holy khaki",
                    "dawn pink",
                    "rose-gold",
                    "saffron",
                    "starlight",
                    "opalescent",
                    "blessed silver"
                ],
                "Scourge": [
                    "black",
                    "obsidian",
                    "onyx",
                    "void black",
                    "shadow purple",
                    "blood violet",
                    "necrotic purple",
                    "plague green",
                    "ashen gray",
                    "grave gray",
                    "rotting brown",
                    "dark crimson",
                    "sickly violet",
                    "witchfire purple"
                ],
                "Poison": [
                    "emerald-green",
                    "green",
                    "venom green",
                    "toxic green",
                    "lime",
                    "chartreuse",
                    "acid green",
                    "noxious green",
                    "swamp green",
                    "pestilent green",
                    "olive",
                    "viridian",
                    "jade",
                    "malachite",
                    "serpent green",
                    "mold green",
                    "sickly yellow-green"
                ],
                "Acid": [
                    "acid green",
                    "slime green",
                    "radioactive green",
                    "corrosive lime",
                    "neon chartreuse",
                    "toxic yellow",
                    "sulfur yellow",
                    "bile yellow",
                    "caustic teal",
                    "vitriole green",
                    "stinging green",
                    "glow sludge",
                    "gutter slime"
                ]
            }

            if (item.ElementBias != null) {
                if (item.ElementBias in colorsByBias) {
                    return randomOf(...colorsByBias[item.ElementBias])
                } else {
                    return randomOf(...Object.values(colorsByBias).flat())
                }
            }
            item.ElementBias = randomOf(...Object.keys(colorsByBias))
            return randomOf(...colorsByBias[item.ElementBias])
        }},
        
        'DamageType': { text: () => (rng.percentChance(90)? preferredElement: randomElement())},
        'Soulbound': { text: () => rng.randomOf(
            `${rng.randomOf(
                `{This} is permanently bound to you, and can't be normally unequipped.`,
                `{This} is permanently bound to you until destroyed.`,
            )}${rng.randomOf(
                '',
                '',
                ` If destroyed, the bearer gets -${rng.randomInt(1, 5)} ${rng.randomOf('Max Health', 'Health Regen', 'Skill Points (in any Skills above 0)')} permanently.`,
                ' Any attempt to purposefully Damage the item Damages you instead.',
                ` Equipping a different item of the same type Damages you for ${rng.randomInt(2, 10)} ${getSymbolText('DamageType')} Damage, and again after every minute with it still equipped.`
            )}`,
            `When you unequip {This}, you take 1d10 ${getSymbolText('DamageType')} Damage.`,
            `When you unequip {This}, you get -1 ${getSymbolText('Stat')} permanently.`,
            `The first time one equips this, they get -1 ${getSymbolText('Stat')} permanently.`,
        )},

        'AreaSmallAttack': { text: () => rng.randomOf(
            `one Unit up to 1 meter behind the target`,
            `all other Units within 1 meters from ${rng.randomOf('yourself', 'the target')}`,
            `Units in a 3 meter line behind the target`,
            `one Unit within 1 meter of ${rng.randomOf('you', 'the target')}`,
            'the closest Enemy to the target (choose if tie)'
        )},
        'AreaLargeAttack': { text: () => rng.randomOf(
            `all Units up to 3 meter in a ${rng.randomOf('cone', 'line')} behind the target`,
            `all other Units within 2 meters from ${rng.randomOf('yourself', 'the target')}`,
        )},

        // These are generic, they work on any trigger
        'DoHalfManaEffect': { text: () => rng.randomOf(
            `deal 1d4 ${getSymbolText('DamageType')} Damage to a Unit within 5 meters of you`,
            `Heal ${rng.randomOf('a Unit within 5 meters of you', 'yourself')} for 1d4`,
            `give ${rng.randomOf('a Unit within 5 meters of you', 'yourself')} a Shielding that blocks 1d4 Damage`,
            `Single-Stuns a Unit within 5 meters`
        )},
        'Do1ManaEffect': { text: () => rng.randomOf(
            `restore 1 Mana${rng.randomOf('', 'to an Ally you can see')}`,
            `Heal ${rng.randomOf('yourself', 'an ally you can see')} for ${rng.randomOf('1d10', '50% of the Damage dealt', '10% of the Health')}`,
            `refresh the Cooldown of one Ability ${rng.randomOf('you have', 'for an ally you can see')}`,
        )},
        // These are NON-DAMAGE effects!
        'AttackHasNoManaEffect': { text: () => rng.randomOf(
            `Slam the target ${rng.randomInt(2, 4)} meters in any direction`,
            `Single-Stun the target`,
            `make the target unable to recover Health until your next Turn`,
            `teleport the target ${rng.randomInt(2, 4)} meters in a random direction (NESW)`,
            `pull the target toward its closest ally within 5 meters`,
            `Silence or Root the target (its choice)`,
            "make the target's Passives disabled until the start of your next Turn (if non-Epic)",
            "make the target's ^monster weapon effects^ disabled until the start of your next Turn (if non-Epic)",
            "gain Gold equal to 10% of the the target's XP worth",
            `destroy a random obstacle (up to 2x2x2 meters) within 5 meters`
        )},
        'AttackHasHalfManaEffect': { text: () => rng.randomOf(
            `has Dice Upgraded to the next die type`,
            `Single-Stuns the target`,
            `heal ${rng.randomOf('you', 'an ally you can see')} for 10% of the Damage dealt`
        )},
        'AttackHas1ManaEffect': { text: () => rng.randomOf(
            `the target becomes ${getSymbolText('CrowdControl')}`,
            `hits ${getSymbolText('AreaSmallAttack')}`,
            `hits ${getSymbolText('AreaLargeAttack')}`,
        )},
        'WhileFrequent': { text: () => rng.randomOf(
            'within 3 meters of a tree',
            `in ${rng.randomOf('a forest', 'wild nature', ``)}`,
            'standing in water',
            'raining',
            'snowing',
            `standing in dim light`,
            `standing in darkness`,
            `at or below 50% Health`,
            `at or above 50% Health`,
            `at full Health`,
            `at 0 Mana (if you have Mana)`,
            `at full Mana (if you have Mana)`,
        )},
        'WhileUncommon': { text: () => rng.randomOf(
            `you are under Crowd Control (except Hard Terrain)`,
            `you are at or below 20% Health`,
            'you are at 100% Health',
            `outnumbered`
        )},
        'WhileRare': { text: () => rng.randomOf(
            `when you are Fallen`,
            'at or below 10% Health',
            'while only 1 Enemy remains',
            'during eclipses'
        )},

        'IfUncommon': { text: () => rng.randomOf(
            `under Crowd Control (except Hard Terrain)`,
            `at or below 20% Health`,
            'at full Health'
        )},

        'WhenUncommon': { text: () => rng.randomOf(
            'in the 1st Round of Combat',
            `in the 2nd Round of Combat`,
            `in the 3rd Round of Combat`,
            `on your first Turn of the Adventure`
        )},

        'WhileOrWhenUncommon': { text: () => rng.randomOf(
            `you are under Crowd Control (except Hard Terrain)`,
            `you are at or below 20% Health`,
            'you are at 100% Health',
            `outnumbered`,
            'in the 1st Round of Combat',
            `in the 2nd Round of Combat`,
            `in the 3rd Round of Combat`,
            `on your first Turn of the Adventure`
        )},
        

        
        'Stat': { text: () => rng.randomOf(...STAT_NAMES)},
        'Attribute': { text: () => rng.randomOf('Max Health', 'Health Regen', 'Skill Point', 'Initiative')},
        'Skill': { text: () => rng.randomOf(...$SKILLS)},
        'WeaponType': { text: () => rng.randomOf('1-Handed Melee', '2-Handed Melee', '1-Handed Ranged', '2-Handed Ranged')},
        'CrowdControl': { text: () => rng.randomOf('Slowed', 'Dazed', 'Rooted', 'Blinded', 'Crippled', 'Silenced', 'Stunned', 'Deafened')},
        'SpellSchool': { text: () => rng.randomOf('Bloodshed', 'Warfare', 'Elemental', 'Arcane', 'Mysticism', 'Nature', 'Divine', 'Eldritch')},
        'MonsterType': { text: () => rng.randomOf('Person', 'Beast', 'Undead', 'Demon', 'Fiend', 'Celestian', 'Giant', 'Fey', 'Monster', 'Insect', 'Elemental', 'Dragon', 'Construct')},
        'Language': { text: () => rng.randomOf('Elvish', 'Dwarvish', 'Orcish', 'Dragonspeak', 'Whispertone', "Thieves' Cant", 'Ancian', 'Gian', 'Goblan')},
    }

    const symbols = Object.keys(customSymbols)
    let refinedCustomSymbols = {}
    for (const symbol of symbols) {
        refinedCustomSymbols[symbol] = { tag: 'span', text: customSymbols[symbol].text()}
    }


    return parseTextWithSymbols(text, refinedCustomSymbols, { shouldReturnStringsOnly: true }).join('')
}
window.parseItemText = parseItemText
function tryNameItem(item, rng=standardRNG) {
    if (item.Name == null) {
        console.log({item})
        throw `tryNameItem: item has no Name property. Printed above.`
    }

    const MAX_NAME_LENGTH = 30
    function maybeGetAnyKeyordByConditions(text, affixesConditions) {
        const allAffixesClumped = Object.keys(affixesConditions)
        const allMaybeAffixesClumped = allAffixesClumped
            .map(key => ({ key, result: affixesConditions[key](text.toLowerCase()) }))
        const possibleAffixesClumped = allMaybeAffixesClumped.filter(({result}) => result)
        
        if (possibleAffixesClumped.length == 0) {
            return null
        }

        const randomAffixObject = rng.randomOf(...possibleAffixesClumped)
        const affixParts = randomAffixObject.key.split('|')
        const randomAffixString = rng.randomOf(...affixParts)

        const finalAffix =
            randomAffixString.includes('$')?
                capitalizeFirstLetter(randomAffixString.replace('$', randomAffixObject.result))
            :
                randomAffixString
        
        return finalAffix
    }
    const prefixConditions = {
        "Colossus": text => text.includes('Might'),
        "Airwielder": s => s.includes('floats'),
        "Man Slayer": s => s.includes('Person'),
        "Man|Simpleton": s => s.includes('average'),
        "Vault Breaker": text => text.includes('obstacle'),

        "Dragon Slayer|Drakeslayer": s => s.includes('dragon'),
        "Dead Slayer|Deadstriker": s => s.includes('undead'),
        "Demon Slayer": s => s.includes('demon'),
        "Monster Hunter": s => s.includes('monster'),
        "Beast Hunter|Hunter": s => s.includes('beast'),
        "Magehunter|Faehunter|Fae Slayer": s => s.includes('fae'),
        "Cat": text => text.includes('no falling Damage'),
        
        "Shapeshifter|Mimic": s => s.includes('transformed into any other weapon'),
        
        "Waterway": text => text.includes('swim'),
        "Icestepper": text => text.includes('walk on water'),
        "Nature|Spring|Summer": text => includesAny(text, ['green leaves', 'verdant leaves', 'ivy', 'vine']) && !text.includes('divine'),
        "Autumn": text => includesAny(text, ['orange leaves', 'red leaves', 'burnished leaves', 'autumn']),
        
        "Alchemist|Mercurio": text => includesAny(text, ['potion', 'poison', 'toxic', 'mercury', 'sulfur', 'ammonia', 'oxygen']),
        
        "Aspects|Chameleon": text => text.includes('transformed into any other weapon'),
        "Dancer": text => text.includes('dodge'),
        "Woundkeeper": text => text.includes("can't be healed"),
        "Specter": text => text.includes('spectral'),
        "Necromancer|Wraithcaller|Tombstone": s => includesAny(s, ['zombie', 'raise', 'skeleton']),
        "Barbarian": s => s.includes('Damage on the second attack', 'heal for all the Damage'),
        "Marksman|Sniper": s => s.includes('+100% range'),
        "Lifestealer": s => s.includes('heal for all the Damage dealt'),
        
        "Highflier|Skybreaker|Skyflier|Skyrider|Windrider|Falconer|Cloudstriker|Stormrider|Sunwing|Moonglide": text => includesAny(text, ['flying', 'whelp', 'pegasus', 'hippogriff', 'thunderbird', 'stormcrow', 'giant eagle', 'giant falcon', 'giant owl']),
        "Rider": text => includesAny(text, ['ground mount']),
        "Horseman|Cavalier": text => includesAny(text, ['horse', 'unicorn', 'pony', 'stag', 'elk']),
        "Dragonrider": text => includesAll(text, ['dragon whelp', 'flying mount']),
        "$rider|$tamer|$wright|Wild Hunt": text => includesAny(text, ['horse', 'unicorn', 'zebra', 'stag', 'elk', 'wolf', 'bear', 'spider', 'insect']),
        "Howler|Nighthowler|Wildhowler": text => includesAny(text, ['wolf', 'hound']),
        "Specter|Ghostrider|Spiritrider|Soulstrider": text => includesAny(text, ['spectral', 'ghostly']),
        
        "River": text => includesAny(text, ['river', 'erosion']),
    }
    const midfixConditions = {

        "Withholding": s => s.includes('whenever you unequip it'),
        'Steelplated|Titanforged|Ironclad|Dreadnought|Warborn|Obsidian|Stormforged|Runefused|Ironblood': s => includesAny(s, ['+1 defense', '+2 defense', 'obsidian']),
        "Lumbering": s => s.includes('smash'),
        "Unleashing|Ravaging": s => s.includes('damage you deal by'),
        "Stoic|Unmoving": s => s.includes('stuck'),
        "Even-Strike|Rebalanced|Reforged|Man": s => s.includes('average'),
        "Returning|Homecoming|Lodestone|Galechaser|Echoing": s => s.includes('thrown'),
        "Longshot|Arced|Skystrike|Horizon's|Cloudborne|Veilbreaker's|Arc|Reach": s => s.includes('range'),
        
        "Slaying|Slashing|Sharp|Slay": s => s.includes('slash'),
        "Stinger|Spiked|Serrated|Jagged": s => s.includes('pierce'),
        
        "Fire|Flame|Burn|Blaze|Tar|Flaming|Scorching|Ember|Ashen|Burning|Searing|Smouldering": s => includesAny(s, ['fire', 'flame', 'burn', 'blaze']),
        "Warm|Heat": s => includesAny(s, ['warm', 'heat', 'hot']),
        "Frost|Frozen|Snow|Rime|Ice": s => includesAnyWithExceptions(s, ['frost', 'rime', 'frozen', 'ice', 'snow'], {
            'ice': ['twice', 'thrice', 'dice']
        }),
        "Wind|Cloud": s => includesAny(s, ['scent', 'smell', 'miasma', 'aroma', 'wind', 'air', 'cloud']),
        "Shock|Static|Lightning": s => s.includes('shock'),
        "Toxic|Nox|Noxious|Viper's|Viper": s => s.includes('poison'),
        "Septic|Ooze|Slime": s => includesAny(s, ['acid', 'ooze', 'slime']),
        "Divine|Holy|Celestian|Reckoning|Retribution|Dawn|Daybreak": s => s.includes('divine'),
        "Deathly|Unholy|Eldritch|Death": s => s.includes('scourge'),

        "Elusive": s => s.includes("can't be targeted"),
        "Realmcutting|Realm": s => s.includes('glitch'),

        "Fearing|Frightening|Dooming|Doom": s => s.includes('feared'),
        "Blinding|Flaring|Flare": s => s.includes('blinded'),
        "Weakening|Breathtaking": s => s.includes('crippled'),
        "Slowing|Slow": s => s.includes('slowed'),
        "Rooting|Snaring|Unmoving|Root|Grasp": s => s.includes('rooted'),

        "Skillful|Skill": s => s.includes('skill'),
        
        "Drake": s => s.includes('dragon'),
        "Demon|Demonic": s => s.includes('demon'),
        "Beastly": s => s.includes('beast'),
        "Fae": s => includesAny(s, ['fae']),
        "Fiendsbane|Fiend": s => s.includes('fiend'),
        
        "Echoing|Everlasting|Ceaseless|Resonating|Secular|Enduring|Cascading": s => s.includes('deals exactly as much damage'),
        "Veilpiercer|Ghoststepper|The Unseen|The Piercing|Obscurite|Ghost|Hide": s => s.includes('ignore Cover'),
        "Morphing|Shiftsteel|Formiron|Mercurial|Mimic": s => s.includes('transformed into any other weapon'),
        "Gust|Blasting|Cyclone|Hurricane|Thundering|Boom": s => s.includes('pushes the target'),
        "Empowered|High-Tide|Apex|Rend|Rending|Unrestrained|Maximal|Max": s => s.includes('units at full health'),
        "Spellblade|Hex": s => s.includes('your next spell this turn deals'),
        "Quantic|Savage": s => s.includes('second attack'),
        "Vampiric": s => s.includes('heal for all the damage dealt'),
        "Necrotic|Mortal|Necro": s => s.includes("can't be healed"),
        
        "Runic|Rune": s => includesAny(s, ['rune', 'runic', 'etch', 'carved', 'symbols']),

        "Black|Onyx|Obsidian": text => includesAny(text, ['black', 'scourge', 'fire']),
        "White|Silver": text => includesAny(text, ['white', 'moth', 'silver', 'true damage']),
        "Green|Verdant|Emerald|Jade": text => includesAny(text, ['green', 'verdant', 'poison', 'toxic', 'acid', 'jade']),
        "Red|Crimson|Scarlet|Rose": text => includesAnyWithExceptions(text, ['red', 'crimson', 'scarlet', 'fire', 'rose'], {
            'red': ['dredg']
        }),
        "Gold|Amber": text => includesAny(text, ['gold', 'yellow', 'orange', 'amber', 'fire', 'divine']),
        "Azure": text => includesAnyWithExceptions(text, ['blue', 'teal', 'turquoise', 'azure', 'cold damage'], {
            'teal': ['stealth']
        }),
        "Royal": text => includesAnyWithExceptions(text, ['purple', 'gold', 'king', 'royal'], {
            'king': ['aking', 'nking', 'rking', 'uking', 'iking', 'oking', 'sking', 'lking', 'cking', 'mking']
        }),
        "Charging": text => includesAny(text, ['horse', 'unicorn', 'pony', 'stag', 'elk']),
        
        "Lead": text => includesAny(text, ['lead']),
        "Stone|Stoneborn|Rock|Rockborn": text => includesAny(text, ['stone', 'rock']),
        'Bark': text => includesAny(text, ['wood', 'bark']),
        'Earth': text => includesAny(text, ['earth', 'soil', 'dirt']),
        'Petal|Flower|Rose': text => includesAny(text, ['flower', 'petal', 'rose']),
        'Vine|Ivy': text => includesAny(text, ['vine', 'ivy']),
        'Sand|Desert': text => includesAny(text, ['sand', 'desert']),
        "Magic|Arcane|Spell|Evocation|Wrath": text => text.includes('ability every turn'),
        "$": s => includesAny(s, [
            'dust', 'candy', 'bone',
            'Iron', 'Steel', 'Bronze', 'Copper', 'Brass', 'Silver', 'Gold', 'Platinum',
            'Mithril', 'Obsidian',
            'Hide', 'Leather', 'Pelt',
            'Quartz', 'Crystal', 'Glass', 'Marble', 'Moonstone', 'Sunstone',
            'Ironwood', 'Thornwood', 'Hardwood', 'Ironbark',
            'Bone', 'Shell', 'Giant Bone',
            'Serpenthide', 'Serpentleather', 'Chitin',
            'Dragonscale', 'Shadowsteel', 'Starforge',
            'Silk', 'Velvet', 'Cotton', 'Satin', 'Chainmail',
            'Moonthread', 'Enchanted Cloth', 'Vineweave',
            'Starweave', 'Ghostsilk',
            'Trollskin', 'Serpenthide', 'Serpentleather',
            'Aetherweave', 'Dreamthread',
            'Ivory', 'Fang', 'Claw',
            'Jaw', 'Maw',
            "Diamond", "Ruby", "Sapphire", "Emerald", "Topaz", "Amethyst", "Garnet",
            "Aquamarine", "Peridot", "Opal", "Turquoise", "Jade", "Onyx", "Pearl",
            "Moonstone", "Sunstone", "Spinel", "Chrysoberyl", "Citrine", "Labradorite",
            "Malachite", "Quartz", "Obsidian", "Bloodstone", "Carnelian", "Kyanite", "Zircon",
            "Alexandrite", "Amber", "Iolite", "Chrysoprase", "Aventurine",
            "Selenite", "Fluorite", "Celestite", "Angelite", "Star Ruby", "Star Sapphire",
            "Mystic Topaz", "Black Diamond", "Aether", "Starlight",
            "Voidstone", "Moonfire",
            "Sunheart",
        ]),

        "Dark|Night|Twilight|Dusk": s => includesAny(s, ['scourge', 'night', 'dark', 'shadow', 'twilight', 'dusk', 'sundown']),
        "Dawn": s => includesAnyWithExceptions(s, ['day', 'dawn', 'sunrise'], {}),

        "Arcanic|Night|Arcane": s => includesAny(s, ['pulse', 'arcane', 'moon']),
        "Fathom|Depth": s => s.includes('tentacle'),
        "Bloodbound|Fleshbound": s => s.includes('damages you'),
        "Hollow": s => s.includes('hollow'),
        "Slay|Ender|Sanguine|Reaper's|End|Reap": s => s.includes('units below'),
        "Corpsebursting|Necroburst|Cadaver|Corpse": s => s.includes('corpse explodes'),
    }
    const suffixConditions = {
        "Might|Fortitude": text => text.includes('might'),
        "Dexterity|Agility": text => text.includes('dexterity'),
        "Intelligence": text => text.includes('intelligence'),
        "Sense|Resolve|Will": text => text.includes('sense'),
        "Charisma": text => text.includes('charisma'),
        "Vitality|Vigor": text => text.includes('max health'),
        "Speed|the Wind|Swiftness|Haste": text => text.includes('movement speed'),
        "Initiative|Quickstep": text => text.includes('initiative'),
        "Mana": s => includesAny(s, ['1 mana', '2 mana']),

        "Immunity": text => text.includes('immune'),
        "Unmoving": text => text.includes('minimum movement'),
        "Resilience": text => text.includes('being pushed'),
        "Slowfall": text => text.includes('no falling damage'),
        "Accuracy": text => text.includes('minimum damage'),
        "Levitation": text => text.includes('levitate'),
        "Restoration": text => text.includes('health regen'),
        "Shielding": text => text.includes('shielding'),
        "Ambushing|Quickness": text => text.includes('ambushing'),
        "Bracing": text => text.includes('arrows'),
        "Retaliation": text => text.includes('whenever you are hit by a monster'),
        "Homesafe|Recalling|the Hearth": text => text.includes('you are instantly teleported'),
        "Phasing": text => text.includes('phase in and out'),
        "Mirage": text => text.includes('you can dodge'),
        "Invisibility|Vanishing": text => text.includes('invisible'),
        "Elusion|Evasion": text => text.includes('dodge'),
        "Critting|Lethality|Deathstriking|Murdering|Culling|Bloodletting|Bloodbathing": text => text.includes('on at least one die'),
        "Fluency|Tongues": text => text.includes('fluent'),
        
        "Constellations": text => text.includes('constellation'),
        "the Wind": s => includesAny(s, ['scent', 'smell', 'miasma', 'aroma']),
        "the $": text => includesAny(text, [
            'moth', 'dragon', 'eagle', 'manticore', 'griffin',
            'constellation'
        ]),

        "the Ink|Vanishing": text => text.includes('tattoo'),
        "Baning|Wounding|Pain": text => text.includes("can't be healed"),
        "Tombstones": text => text.includes('zombie'),
        
    }

    const itemNameShortened = last(item.Name.split(' '))
    const itemName = itemNameShortened
    const aPrefix = maybeGetAnyKeyordByConditions(item._AllText.toLowerCase(), prefixConditions)
    const aMidfix = maybeGetAnyKeyordByConditions(item._AllText.toLowerCase(), midfixConditions)
    const aSuffix = maybeGetAnyKeyordByConditions(item._AllGoodText.toLowerCase(), suffixConditions)
    const fullNameSoFar = `${aPrefix} ${aMidfix} ${itemName} of ${aSuffix}`

    const affixesWithTypes = [['prefix', aPrefix], ['midfix', aMidfix], ['suffix', aSuffix]]
        .filter(([type, affix]) => affix != null)

    let usedAffixes = []
    if (affixesWithTypes.length <= 2) {
        usedAffixes = affixesWithTypes
    } else if (fullNameSoFar.length < MAX_NAME_LENGTH) {
        usedAffixes = affixesWithTypes
    } else if (affixesWithTypes.length == 3) {              // If has 3 affixes, pick 2 at random
        const shuffledAffixes = rng.shuffle(affixesWithTypes)
        if (rng.percentChance(90)) {
            usedAffixes = shuffledAffixes.slice(0, 2)
        } else {
            usedAffixes = shuffledAffixes.slice(0, 1)
        }
    }

    const prefix = usedAffixes.find(([type, affix]) => type == 'prefix')?.[1]
    const midfix = usedAffixes.find(([type, affix]) => type == 'midfix')?.[1]
    const suffix = usedAffixes.find(([type, affix]) => type == 'suffix')?.[1]

    const prefixWithPossessive =  `${prefix}${prefix?.endsWith("s")? "": "'s"}`
    const getMidfixAndItemName = () => midfix?.length <= 6 && itemNameShortened?.length <= 6? `${midfix}${itemName.toLowerCase()}`: `${midfix} ${itemName}`
    const allCombinations = [
        {
            requires: [prefix],                     // Slayer's Axe
            name: () => `${prefixWithPossessive} ${itemName}`
        },
        {
            requires: [prefix],                     // Axe of the Slayer
            name: () => `${itemName} of the ${prefix}`
        },
        {
            requires: [midfix],                     // Runic Axe
            name: () => `${getMidfixAndItemName()}`
        },
        {
            requires: [suffix],                     // Axe of Mana
            name: () => `${itemName} of ${suffix}`
        },
        {
            requires: [prefix, midfix],             // Slayer's Runic Axe
            name: () => `${prefixWithPossessive} ${getMidfixAndItemName()}`
        },
        {
            requires: [prefix, midfix],             // Runic Axe of the Slayer
            name: () => `${getMidfixAndItemName()} of the ${prefix}`
        },
        {
            requires: [prefix, midfix],             // Axe of the Runic Slayer
            name: () => `${itemName} of the ${midfix} ${prefix}`
        },
        {
            requires: [prefix, suffix],             // Slayer's Axe of Mana
            name: () => `${prefixWithPossessive} ${itemName} of ${suffix}`
        },
        {
            requires: [prefix, suffix],             // Axe of Slayer's Mana
            name: () => `${itemName} of ${prefixWithPossessive} ${suffix.replace('the ', '')}`
        },
        {
            requires: [midfix, suffix],             // Runic Axe of Mana
            name: () => `${getMidfixAndItemName()} of ${suffix}`
        },
        {
            requires: [
                prefix, midfix, suffix, 
                `${prefix ?? ''} ${getMidfixAndItemName() ?? ''} of ${suffix ?? ''}`.length <= MAX_NAME_LENGTH
            ],             // Runic Axe of Mana
            name: () => `${prefix} ${getMidfixAndItemName()} of ${suffix}`
        },
        // {
        //     requires: [midfix, suffix],             // Axe of Runic Mana
        //     name: () => `${itemName} of ${midfix} ${suffix.replace('the')}`
        // }
    ]

    const possibilities = allCombinations.filter(c => !c.requires.includes(null) && !c.requires.includes(undefined))
    if (possibilities.length == 0) {
        return itemName
    }
    const randomPossibility = rng.randomOfArrayWeighted(possibilities, possibilities.map(({ requires }) =>
        requires.length == 1?
            1
        :requires.length == 2?
            3
        :requires.length == 2?
            2
        :
            1
    ))
    const randomName = randomPossibility.name()
    
    return randomName
}
function getItemTintColor(text, rng=standardRNG) {
    text = text.toLowerCase()

    const colorsByKeywords = {
        "#E0FFFF": [
            "air",
            "fly",
            "flier",
            "sky",
            "falcon",
            "cloud",
            "wind",
            "gust",
            "cyclon",
            "hurricane",
            "storm",
            "quartz",
            "crystal",
            "glass",
            "marble",
            "cotton",
            "dream",
            "weave",
            "selenite",
            "celestite",
            "angelite",
            "floats",
            "flying",
            "pegasus",
            "hippogriff",
            "thunderbird",
            "stormcrow",
            "giant eagle",
            "giant falcon",
            "giant owl",
            "dodge"
        ],
        "#40E0D0": ["fae", "shock", "electric", "static", "lightning", "turquoise"],
        "#48D1CC": [
            "necromancer",
            "wraith",
            "echo",
            "diemond",
            "undead",
            "zombie",
            "raise",
            "skeleton"
        ],
        "#66CDAA": ["spect", "spirit", "soul", "mithril", "spectral", "ghostly"],
        "#6495ED": ["ice", "frost", "froz", "rime", "aquamarine", "walk on water"],
        "#1E90FF": ["moon", "rune", "moonstone", "moonfire"],
        "#4169E1": ["water", "river", "tide", "swim", "erosion"],
        "#0000FF": ["azure", "sapphire", "star sapphire"],
        "#2ec4ff": [
            "magic",
            "arcane",
            "spell",
            "evoca",
            "wrath",
            "transformed into any other weapon"
        ],

        "#2E8B57": ["thorn"],
        "#7CFC00": [
            "acid",
            "mercurio",
            "toxic",
            "septic",
            "ooze",
            "slime",
            "viper",
            "nox",
            "poison",
            "peridot",
            "potion",
            "mercury",
            "sulfur",
            "ammonia",
            "oxygen"
        ],
        "#00FF7F": [
            "spring",
            "nature",
            "green",
            "verdant",
            "ivy",
            "vine",
            "malachite",
            "aventurine",
            "chrysoprase",
            "chrysoberyl",
            "green leaves",
            "verdant leaves",
            "monster",
            "beast",
            "spider",
            "insect"
        ],
        "#00e700ff": ["emerald"],
        "#2eff8c": ["jade"],

        "#ffea73": ["star", "starlight"],

        "#F0E68C": ["divine", "holy", "celest", "opal", "pearl"],
        "#FFD700": [
            "sun",
            "retribu",
            "dawn",
            "daybreak",
            "gold",
            "sunstone",
            "sunheart"
        ],
        "#FF8C00": [
            "autumn",
            "fall",
            "fiend",
            "topaz",
            "mystic topaz",
            "orange leaves",
            "red leaves",
            "burnished leaves"
        ],
        "#FFA500": [
            "fire",
            "flame",
            "burn",
            "blaze",
            "scorch",
            "ember",
            "sear",
            "smoulder",
            "warm",
            "heat",
            "amber",
            "carnelian",
            "citrine",
            "dragon",
            "whelp",
            "dragon whelp"
        ],
        "#A0522D": ["bark", "earth", "might", "bear"],
        "#D2B48C": [
            "wood",
            "sand",
            "desert",
            "dust",
            "bone",
            "skin",
            "ground mount",
            "horse",
            "unicorn",
            "pony",
            "zebra",
            "stag",
            "elk"
        ],
        "#914d29": ["hide", "leather", "pelt"],
        "#CE8946": ["bronze"],
        "#B87333": ["copper"],
        "#B5A642": ["brass"],

        "#750851": ["velvet", "silk"],
        "#ff2e9d": ["rose", "petal", "flower", "candy"],
        "#DA70D6": ["elusive", "amethyst", "iolite"],
        "#9932CC": ["royal", "alexandrite"],
        "#800080": ["necro", "death", "unhol", "eldritch", "mortal", "can't be healed"],

        "#eb634b": ["fang", "claw", "jaw", "maw", "second attack"],
        "#DC143C": ["vampir", "crimson", "garnet", "bloodstone", "star ruby", "heal for all the damage dealt"],
        "#FF0000": ["demon", "devil", "red", "ruby", "spinel"],
        "#B22222": ["crimson"],

        "#808080": ["tomb", "stone", "rock", "labradorite", "kyanite", "zircon", "obstacle", "wolf", "hound"],
        "#B0C4DE": ["steel", "plate", "platinum"],
        "#BC8F8F": ["iron", "ash", "lead"],
        "#290200": ["onyx", "black", "obsidian", "black diamond", "voidstone"],

        "#FFFFFF": ["stoic", "snow", "white", "silver", "ivory", "diamond"],

        "#7bff00": ["fluorite"],
        "#8a2be2": ["aether"],
        "#1a0b2e": ["void", "moonfire"]
    }



    const possibleColorsObj = filterObject(colorsByKeywords, ({key, value}) => value.some(element => text.includes(element)))
    const possibleColors = Object.keys(possibleColorsObj)
    if (possibleColors.length == 0) {
        return null
    }
    const chosenColor = rng.randomOf(...possibleColors)
    return chosenColor
}
function getItemIconName(item, rng=standardRNG) {
    if (item.Type.includes('Shield')) {
        return `Shield/${randomInt(1, 50)}`
    }
    if (item.Type.includes('Armor')) {
        return rng.randomOf(...ARMOR_TO_NAME[item.ArmorType])
    }
    if (item.WeaponType in BASE_WEAPON_TO_NAME) {
        return rng.randomOf(...(BASE_WEAPON_TO_NAME[item.WeaponType]))
    }
    return item.WeaponType
}
window.getItemIconName = getItemIconName
function getItemPrice(item, addedEffectsByGroup, rng=standardRNG) {

    /*
        50      ...     x5
        75      ...     x6
        100     ...     x7
        150     ...     x8
        200     ...     x9
        250     ...     x10
    */

    const allEffects = Object.values(addedEffectsByGroup).flat()
    
    function getEffectPrice({ XP }) {
        const multiplier =
            XP <= 50?   7
            :XP <= 75?  8
            :XP <= 100?  9
            :XP <= 150?  10
            :XP <= 200?  11
            :12
        return (XP || 1) * multiplier
    }

    const allEffectsPrice = allEffects.map(effect => getEffectPrice(effect))
    const totalExtraPrice = allEffectsPrice.reduce((soFar, number) => soFar + number, 0)
    const basePrice = item.Price

    console.log({allEffects, allEffectsPrice})
    return basePrice + totalExtraPrice
    // const addedPrice = matchRange(item.XP, [
    //     { range: [-9999, 0], value: rng.randomInt(100, 150) },
    //     { range: [0, 50], value: rng.randomInt(250, 375) },
    //     { range: [50, 100], value: item.XP * rng.randomInt(4, 5) },
    //     { range: [100, 175], value: item.XP * rng.randomInt(5, 6) },
    //     { range: [175, 9999], value: item.XP * rng.randomInt(6, 7) },
    // ])
    // return basePrice + addedPrice
}
function getWeaponPropsFromType(itemType) {
    const possibleRanges = ['Melee', 'Ranged']
    const possibleHands = ['One-Handed', 'Two-Handed']
    return {
        range: possibleRanges.find(range => itemType.includes(range)),
        hands: possibleHands.find(hands => itemType.includes(hands)),
    }
}
function getBaselineItemByType(xp, itemType, rng=standardRNG) {
    if (itemType.includes('Shield')) {
        const item = {
            Name: rng.randomOf(...SHIELD_NAMES),
            Price: (xp <= 75? rng.randomInt(10, 30): rng.randomInt(30, 70)) * 10,
            Type: itemType,
            Notes: 'This is a shield.',
            Requirement: `Requires ${rng.randomInt(2, 3)} Might`,
            ItemType: 'Shield'
        }
        item.EffectGreen = `-50% ${parseItemText({ text: `{DamageType}`, item, rng})} Damage taken`
        return item
    }
    if (itemType.includes('Armor')) {
        const name = rng.randomOf(...Object.keys(ARMOR_TO_BODY_PART))
        const bodyPart = ARMOR_TO_BODY_PART[name]
        const heaviness =
            bodyPart.includes('heavy')?
                'heavy '
            :bodyPart.includes('medium')?
                'medium '
            :bodyPart.includes('light')?
                'light '
            :bodyPart.includes('ring')?
                'ring'
            :
                'medium';
        const realBodyPart = bodyPart.replace(' heavy', '').replace(' medium', '').replace(' light', '')
        const armorPieceDescr = heaviness != 'ring'? `${heaviness} armor piece for the ${realBodyPart}`: 'ring'
        return {
            Name: name,
            Price: getArmorBasePriceByBodyPart(bodyPart),
            Type: itemType,
            Notes: `This is a ${armorPieceDescr}`,
            Requirement: heaviness == 'medium'? 'Requires 1 Might': heaviness == 'heavy'? `Requires ${rng.randomInt(2, 3)} Might`: null,
            ItemType: bodyPart,
            ArmorType: name,
        }
    }

    const range = itemType.includes('Ranged')? `3-${rng.randomInt(1, 2) * 5} meters`: '1 meter'
    const templateWeapon = rng.randomOf(...ALL_WEAPONS_ARRAY.filter(wep => wep.type == itemType.replace(' Weapon', '') && wep.Name != 'Punch'))

    const weaponNames = [
        templateWeapon.Name,
        ...(templateWeapon.Alternatives != null? templateWeapon.Alternatives.split(', '): []),
        ...(templateWeapon.MagicAlternatives != null? templateWeapon.MagicAlternatives.split(', '): [])
    ]

    return {
        Name: rng.randomOf(...weaponNames),
        A: templateWeapon.A,
        Price: templateWeapon.Price,
        Stat: templateWeapon.Stat,
        Range: range,
        Damage: templateWeapon.Damage,
        Notes: `This weapon is a ${templateWeapon.Name}`,
        ItemType: templateWeapon.Name,
        Type: itemType,
        WeaponType: templateWeapon.Name,
        EffectGreen: templateWeapon.EffectGreen,
        EffectOriginal: templateWeapon.Effect
    }
}



// If a key doesn't exist, just uses the default weapon
const BASE_WEAPON_TO_NAME = {
    'Hand Hammer': range(1, 20).map(i => `Hammer/${i}`),
    'Dagger': range(1, 56).map(i => `Dagger/${i}`),
    'Club': range(1, 11).map(i => `Club/${i}`),
    'Shortsword': range(1, 61).map(i => `Sword/${i}`),
    'Hand Axe': range(1, 51).map(i => `Axe/${i}`),
    'Spear': range(1, 51).map(i => `Spear/${i}`),
    'Mace': range(1, 15).map(i => `Mace/${i}`),
    
    'Warhammer': range(1, 20).map(i => `Hammer/${i}`),
    'Greatsword': range(1, 61).map(i => `Sword/${i}`),
    'Longsword': range(1, 61).map(i => `Sword/${i}`),
    'Ultra Greatsword': range(1, 61).map(i => `Sword/${i}`),
    'Heavy Mace': range(1, 15).map(i => `Mace/${i}`),
    'Pike': range(1, 51).map(i => `Spear/${i}`),
    'Battle Axe': range(1, 51).map(i => `Axe/${i}`),
    'Greatclub': range(1, 11).map(i => `Club/${i}`),
    
    'Light Crossbow': range(1, 26).map(i => `Crossbow/${i}`),
    'Heavy Crossbow': range(1, 26).map(i => `Crossbow/${i}`),
    'Bow': range(1, 26).map(i => `Bow/${i}`),
}

const ARMOR_TO_NAME = {
    'Plate': range(1, 22).map(i => `HeavyArmor/${i}`),
    'Breastplate': range(1, 22).map(i => `HeavyArmor/${i}`),
    'Scale': range(1, 22).map(i => `HeavyArmor/${i}`),
    'Lorica': range(1, 22).map(i => `HeavyArmor/${i}`),
    // 'Plate': ['Plate Armor', 'Mithril Armor', 'Adamantite Armor', 'Breastplate_of_Blades', 'Chain Mail'],
    // 'Breastplate': ['Plate Armor', 'Mithril Armor', 'Adamantite Armor', 'Breastplate_of_Blades', 'Chain Mail'],
    // 'Scale': ['Plate Armor', 'Mithril Armor', 'Adamantite Armor', 'Breastplate_of_Blades', 'Chain Mail'],
    // 'Lorica': ['Plate Armor', 'Mithril Armor', 'Adamantite Armor', 'Breastplate_of_Blades', 'Chain Mail'],
    
    'Mail': ['MediumArmor/4', 'MediumArmor/5', 'MediumArmor/16'],
    'Hauberk': ['MediumArmor/16', 'Heavy/12'],
    'Cuirass': ['HeavyArmor/14', 'HeavyArmor/16', 'LightArmor/16', 'MediumArmor/7', 'MediumArmor/11'],
    'Chainmail': [4, 6, 8, 12].map(i => `HeavyArmor/${i}`),
    'Gambeson': [2, 6, 14].map(i => `MediumArmor/${i}`),
    // 'Mail': ['Chain Mail'],
    // 'Hauberk': ['Chain Mail', 'Cuirass', 'Leather Armor', 'Splint Armor', 'Hide Armor', 'Padded Armor'],
    // 'Cuirass': ['Cuirass'],
    // 'Chainmail': ['Chain Mail'],
    // 'Gambeson': ['Chain Mail', 'Cuirass', 'Leather Armor', 'Splint Armor', 'Hide Armor', 'Padded Armor'],
    'Tabard': ['Splint Armor'],
    'Toga': ['Common Clothes', 'Unarmored'],
    'Robe': range(1, 19).map(i => `Robe/${i}`),
    'Robes': range(1, 19).map(i => `Robe/${i}`),
    'Rainment': range(1, 19).map(i => `Robe/${i}`),

    'Gloves': [...(range(1, 6).map(i => `GlovesExtra/${i}`)),'Gloves of Climbing', 'Gloves of Extra Skill', 'Gloves of Greater Spell', 'Gloves of Health', 'Bracer of the Phantom'],
    'Gauntlets': ['Gloves of Weapon Training', 'Bracer of the Phantom'],
    'Bracer': ['Gloves of Health', 'Bracer of the Phantom'],
    'Bracelet': ['Ring of the Coin', 'Ring of the Spies', 'Bracer of the Phantom'],
    'Vambrace': ['Ring of the Coin', 'Ring of the Spies', 'Bracer of the Phantom'],
    'Sleeve': ['Gloves of Greater Spell', 'Gloves of Health', 'Bracer of the Phantom'],

    'Boots': ['Boots of Extra Skill', 'Boots of Health', 'Boots of Greater Spell', 'Boots of Grounding', 'Boots of Initiative', 'Boots of Jumping', 'Boots of Minor Health', 'Boots of Speed', 'Boots of TIrelessness', 'Boots of Tremor Sense', ...([1,2].map(i => `BootsExtra/${i}`))],
    'Greaves': ['Boots of Greater Spell', 'Boots of Grounding',  'Boots of Speed'],
    'Moccasins': ['Boots of Jumping'],
    'Cuisses': ['Boots of Greater Spell', 'Boots of Grounding',  'Boots of Speed'],
    'Caligae': ['Boots of Extra Skill', 'Boots of Health', 'Boots of Greater Spell', 'Boots of Grounding', 'Boots of Initiative', 'Boots of Jumping', 'Boots of Minor Health', 'Boots of Speed', 'Boots of TIrelessness', 'Boots of Tremor Sense'],
    'Sandals': ['Boots of Jumping'],
    'Shins': ['Boots of Extra Skill', 'Boots of Health', 'Boots of Greater Spell', 'Boots of Grounding', 'Boots of Initiative', 'Boots of Jumping', 'Boots of Minor Health', 'Boots of Speed', 'Boots of TIrelessness', 'Boots of Tremor Sense'],
    'Slippers': ['Boots of Jumping'],

    'Sabatons': ['Leggings of Freedom'],
    'Trousers': ['Leggings of Freedom'],
    'Legwear': ['Leggings of Freedom'],
    'Tassets': ['Leggings of Freedom'],

    'Helmet': range(1, 37).map(i => `Helmet/${i}`),
    'Helm': range(1, 37).map(i => `Helmet/${i}`),
    'Hat': range(1, 10).map(i => `Hat/${i}`),
    // 'Bascinet': 'head heavy',
    // 'Armet': 'head heavy',
    // 'Morion': 'head heavy',
    // 'Galea': 'head heavy',
    'Headwear': range(1, 10).map(i => `Hat/${i}`),
    'Hood': range(1, 9).map(i => `Hood/${i}`),
    'Cowl': range(1, 9).map(i => `Cowl/${i}`),
    'Gown': range(1, 9).map(i => `Hood/${i}`),
    'Coif': [2, 4, 18].map(i => `Helmet/${i}`),
    'Bonnet': ['Hood of Health'],
    // 'Capuchon': 'head light',
    // 'Beret': 'head light',
    // 'Tricone': 'head light',
    'Chaperon': range(1, 9).map(i => `Hood/${i}`),
    'Circlet': ['Headband of Mind Speak', 'Ring of Good Omen'],
    
    'Belt': ['Strap of Returning', 'Scarf of Minor Spell', 'Belt of Reflex'],
    'Ceinture': ['Strap of Returning', 'Scarf of Minor Spell', 'Belt of Reflex'],
    'Girdle': ['Strap of Returning', 'Scarf of Minor Spell', 'Belt of Reflex'],
    'Sash': ['Strap of Returning', 'Scarf of Minor Spell', 'Belt of Reflex'],

    'Ring': ['Band of Sustenance', 'Ring of Health', 'Ring of Recovery', 'Ring of Spell', 'RIng of Spell Storage', 'Ring of Strange Escape', 'Ring of the Coin', 'Ring of the Eldritch Thing', 'Ring of the Phoenix', 'RIng of the Spies'],
    'Band': ['Band of Sustenance', 'Ring of Health', 'Ring of Recovery', 'Ring of Spell', 'RIng of Spell Storage', 'Ring of Strange Escape', 'Ring of the Coin', 'Ring of the Eldritch Thing', 'Ring of the Phoenix', 'RIng of the Spies'],
    
    // 'Cassoc': 'upper body and legs light',
    // 'Alb': 'upper body and legs light',

    'Cape': ['Cape of Balance', 'Cape of Extra Skill', 'Cape of Spell'],
    'Cloak': ['Cape of Balance', 'Cape of Extra Skill', 'Cape of Spell'],
    'Mantle': ['Cape of Balance', 'Cape of Extra Skill', 'Cape of Spell'],
}

const ARMOR_TO_BODY_PART = {
    'Plate': 'upper body and legs heavy',
    'Breastplate': 'upper body heavy',
    'Scale': 'upper body heavy',
    'Lorica': 'upper body heavy',

    'Mail': 'upper body medium',
    'Hauberk': 'upper body medium',
    'Cuirass': 'upper body medium',
    'Chainmail': 'upper body medium',
    'Gambeson': 'upper body medium',
    'Tabard': 'upper body light',
    'Toga': 'upper body light',
    'Robe': 'upper body light',
    'Robes': 'upper body light',

    'Gloves': 'hands heavy',
    'Gauntlets': 'hands heavy',
    'Bracer': 'one hand heavy',
    'Bracelet': 'one hand heavy',
    'Vambrace': 'one hand heavy',
    'Sleeve': 'one hand heavy',

    'Boots': 'feet',
    'Greaves': 'feet',
    'Moccasins': 'feet',
    'Cuisses': 'feet',
    'Caligae': 'feet',
    'Sandals': 'feet',
    'Shins': 'feet',
    'Slippers': 'feet',
    // 'Calcei': 'feet',
    // 'Oscreae': 'feet',
    // 'Chausses': 'feet',

    'Sabatons': 'legs',
    'Trousers': 'legs',
    'Legwear': 'legs',
    'Tassets': 'legs',
    // 'Fauld': 'legs',

    'Helmet': 'head heavy',
    'Hat': 'head heavy',
    'Helm': 'head heavy',
    // 'Bascinet': 'head heavy',
    // 'Armet': 'head heavy',
    // 'Morion': 'head heavy',
    // 'Galea': 'head heavy',
    'Headwear': 'head light',
    'Hood': 'head light',
    'Coif': 'head light',
    'Bonnet': 'head light',
    // 'Capuchon': 'head light',
    // 'Beret': 'head light',
    // 'Tricone': 'head light',
    'Chaperon': 'head light',
    'Circlet': 'head light',
    
    'Belt': 'belt',
    'Ceinture': 'belt',
    'Girdle': 'belt',
    'Sash': 'belt',

    'Ring': 'ring',
    'Band': 'ring',
    
    'Robe': 'upper body and legs light',
    'Robes': 'upper body and legs light',
    // 'Cassoc': 'upper body and legs light',
    // 'Alb': 'upper body and legs light',
    'Cowl': 'upper body and legs light',
    'Rainment': 'upper body and legs light',
    'Gown': 'upper body and legs light',

    'Cape': 'back',
    'Cloak': 'back',
    'Mantle': 'back',
}
function getArmorBasePriceByBodyPart(bodyPart) {
    const heavinessModifier =
        bodyPart.includes('light')?
            1
        :bodyPart.includes('medium')?
            1.25
        :bodyPart.includes('heavy')?
            1.5
        :
            1.25
    const baseBodyPart = bodyPart.replace(' light', '').replace(' medium', '').replace(' heavy', '')
    const bodyPartBasePriceMap = {
        'upper body': 150,
        'legs': 150,
        'upper body and legs': 150,
        'one hand': 50,
        'hands': 125,
        'feet': 170,
        'belt': 100,
        'ring': 150,
        'head': 150,
        'back': 150
    }
    const baseBodyPartPrice = bodyPartBasePriceMap[baseBodyPart]
    return roundToNearest(baseBodyPartPrice * heavinessModifier, 5)
}
const SHIELD_NAMES = [
    'Shield', 'Buckler', 'Kite', 'Barrier', 'Barricade', 'Bulwark', 'Aegis', 'Scutum', 'Aspis', 'Pavise', 'Adarga', 'Dhal', 'Targe', 'Hoplon', 'Rampart', 'Safeguard', 'Protector', 'Redoubt', 'Greatshield', 'Thureos', 'Clipeus', 'Door', 'Gate'
]

// xp: int, itemType: string (e.g. "One-Handed Ranged Weapon", "Two-Handed Weapon", "Melee Weapon", "Weapon")
export function createMagicItem(xp, itemType, rng=standardRNG) {

    if (itemType != 'Armor' && itemType != 'Shield') {
        let { hands, range } = getWeaponPropsFromType(itemType)
        if (range == null) {
            range = rng.randomOf('Melee', 'Ranged')
        }
        if (hands == null) {
            hands = rng.randomOf('One-Handed', 'Two-Handed')
        }
        itemType = hands + ' ' + range + ' Weapon'
    }

    // Now itemType is always a full type like "One-Handed Ranged Weapon"
    // e.'Item Type' contains any of those tags
    let possibleEffects = MagicItemProperties.Effects
        possibleEffects = possibleEffects.filter(e => e['Item Type'] == 'Any' || includesAll(itemType, e['Item Type'].split(' ')))
        possibleEffects = possibleEffects.map(e => ({...e, Weight: (Math.max(e.XP, 0) + 10)}))

    const baselineItem = getBaselineItemByType(xp, itemType, rng)


    let xpLeft = xp
    let addedEffectsByGroup = {
        'Minor': [],
        'Curse': [],
        'Stats': [],
        'Passive': [],
        'Property': [],
        'Active': [],
        'Quirk': [],
        'Bonus Damage': []
    }

    function maybeAddSkills() {
        function getRandomSkill() {
            if (baselineItem.SkillBias == null) {
                if (baselineItem.ElementBias == null || (baselineItem.ElementBias && rng.percentChance(15))) {
                    baselineItem.SkillBias = rng.randomOf(...Object.keys(SKILLS_BY_GROUP))
                } else {
                    const skillGroup = SKILL_GROUP_BY_ELEMENT[baselineItem.ElementBias]
                    baselineItem.SkillBias = skillGroup ?? rng.randomOf(...Object.keys(SKILLS_BY_GROUP))
                }
            }
            const skillsInChosenGroup = SKILLS_BY_GROUP[baselineItem.SkillBias]
            const skillsIAlreadyHave = Object.keys(baselineItem['Skill Bonuses'] ?? {})
            const skillsInGroup = skillsInChosenGroup.filter(possibleSkill => !skillsIAlreadyHave.includes(possibleSkill))
            const availableSkills = rng.shuffle([...skillsInGroup])
            return rng.randomOf(...availableSkills)
        }
        function getRandomSkillIDontHave() {
            const skillsIHave = Object.keys(baselineItem['Skill Bonuses'])
            const possibilities = $SKILLS.filter(skill => !skillsIHave.includes(skill))
            return rng.randomOf(...possibilities)
        }

        if (rng.percentChance(15)) {
            return false
        }
        function addSkillBonus() {
            const skillName = getRandomSkill()
            const maxSkillNumber =
                baselineItem.XP <= 50?
                    rng.randomOf(1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, rng.randomInt(1, 4))
                :baselineItem.XP <= 100?
                    rng.randomOf(1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, rng.randomInt(1, 5))
                :
                    rng.randomOf(2, 2, 2, 2, 3, 3, 3, 3, rng.randomInt(1, 6))
            const skillBonus = rng.randomInt(1, maxSkillNumber)
            if (baselineItem['Skill Bonuses'] == null) {
                baselineItem['Skill Bonuses'] = {}
            }
            baselineItem['Skill Bonuses'][skillName] = skillBonus
            xpLeft -= skillBonus * 5
        }

        addSkillBonus()
        if (rng.percentChance(55)) {
            addSkillBonus()
        }

        if (rng.percentChance(40)) {
            baselineItem['Skill Bonuses'][getRandomSkillIDontHave()] = rng.randomOf(-1, -2, -2, -2, -2, -2, -2, -2, -2, rng.randomInt(-1, -7))
            xpLeft += 5
        }
        
        if (addedEffectsByGroup['Property'].length > 0) {
            addedEffectsByGroup['Property'].push({ Effect: '' })
        }
        for (const [skillName, bonus] of Object.entries(baselineItem['Skill Bonuses'])) {
            if (bonus > 0) {
                addedEffectsByGroup['Property'].push({
                    XP: 5,
                    Group: 'Property',
                    Effect: `+${bonus} in ${skillName}`
                })
            } else {
                addedEffectsByGroup['Curse'].push({
                    XP: 5,
                    Group: 'Curse',
                    Effect: `${bonus} in ${skillName}`
                })
            }
        }
    }
    function maybeAddEffect(possibleEffects, groupName, chance, extraFilterCondition=e=>true) {
        const alreadyHasEffect = e => isString(e)? addedEffectsByGroup[groupName].includes(e): addedEffectsByGroup[groupName].some(addedE => addedE.Effect == e.Effect)
        let availableEffects = possibleEffects.filter(e => e.Group == groupName)
            availableEffects = availableEffects.filter(e => e.XP <= xpLeft)
            availableEffects = availableEffects.filter(e => !alreadyHasEffect(e))
            availableEffects = availableEffects.filter(e => extraFilterCondition(e))
        if (availableEffects.length == 0) {
            return false
        }

        const weights =
            availableEffects[0].Weight == null?
                null
            :availableEffects.map(e => e.Weight)

        if (rng.percentChance(chance)) {
            const randomEffect =
                weights == null?
                    rng.randomOf(...availableEffects)
                :rng.randomOfArrayWeighted(availableEffects, weights)
            if (randomEffect == null) { // Not sure how, but it happens
                return false
            }
            addedEffectsByGroup[groupName].push(randomEffect)
            if (randomEffect.XP != null) {
                xpLeft -= randomEffect.XP
            }
            return true
        }
        return false
    }
    function addMorePropertiesToFillForXP() {
        let nFails = 0
        while (xpLeft > 0) {
            let didAddSomething = true

            const addPropertyChance =
                addedEffectsByGroup['Property'].length > 0?
                    10
                :25
            
            const didAddProperty = maybeAddEffect(possibleEffects, 'Property', addPropertyChance, e => e.XP > 0)
            if (!didAddProperty) {
                const didAddStats = maybeAddEffect(possibleEffects, 'Stats', 50, e => e.XP > 0)
                if (!didAddStats) {
                    const didAddPassive = maybeAddEffect(possibleEffects, 'Passive', 100, e => e.XP > 0)
                    if (!didAddPassive) {
                        didAddSomething = false
                    }
                }
            }

            if (!didAddSomething) {
                nFails += 1
                if (nFails >= 5) {
                    break
                }
            }
        }
    }

    maybeAddEffect(possibleEffects, 'Curse', 25)
    if (itemType.includes('Weapon')) {
        maybeAddEffect(possibleEffects, 'Bonus Damage', 99)
    }
    maybeAddEffect(possibleEffects, 'Minor', 25)
    maybeAddEffect(possibleEffects, 'Property', 15)
    maybeAddEffect(possibleEffects, 'Active', 25)
    maybeAddEffect(possibleEffects, 'Quirk', 75)

    addMorePropertiesToFillForXP()

    if (itemType.includes('Armor')) {
        maybeAddSkills()
    }


    // These are all possible effects of a magic item property from the YAML
    
    const POSSIBLE_EFFECT_TEXTS_FORMATTING = {
        'Effect': effects => effects.join('\n'),
        'OnKill': effects => effects.length == 0? '': 'When you defeat a Worthy Enemy, ' + effects.join(' and '),
        'OnAttack': effects => effects.length == 0? '': 'When you attack a Worthy Enemy, ' + effects.join(' and '),
        'Bonus Damage': effects => effects.length == 0? '': (' + ' + effects.join(' + '))
    }
    const POSSIBLE_EFFECT_PROPS = Object.keys(POSSIBLE_EFFECT_TEXTS_FORMATTING)
    const parseAllPropsOfEffectObj = (e, thisReplacement) => {
        const newE = {...e}
        for (const key of POSSIBLE_EFFECT_PROPS) {
            newE[key] = e[key] == null? null: parseItemText({
                text: e[key],
                thisText: thisReplacement,
                rng,
                item: baselineItem
            })
        }
        return newE
    }
    const preparsedEffectsByGroup = mapObject(addedEffectsByGroup, ({ key, value }) => ({
        key,
        value: value.map(e => parseAllPropsOfEffectObj(e, '{This}'))
    }))
    
    const getEffectText = e => Object.keys(POSSIBLE_EFFECT_TEXTS_FORMATTING).map(key => e[key]).filter(s => s != null).join('\n')
    const preparsedEffectsByGroupFiltered = filterObject(preparsedEffectsByGroup, ({ key, value }) => value.length > 0)
    const preparsedTextByGroups = mapObject(preparsedEffectsByGroupFiltered, ([groupName, effectObjects]) => {
        const effectTexts = effectObjects.map(e => getEffectText(e)).filter(text => text != null && text.length > 0)
        const effectTextsNoDups = removeDuplicates(effectTexts) // For when it has multiple Damage resistances
        const effectTextsSorted = sortByHash(effectTextsNoDups, str => str.length)
        const finalText = effectTextsSorted.join('\n')
        return {
            key: groupName,
            value: finalText
        }
    })

    
    /* ---------- Naming ---------- */
    baselineItem._AllText = joinObjectValues(preparsedTextByGroups, '\n')
    baselineItem._AllGoodText = Object.values(filterObject(preparsedEffectsByGroup, ([key, value]) => key != 'Curse')).join('\n')
    baselineItem.Name = tryNameItem(baselineItem, rng)
    
    /* ---------- Reparse ---------- */
    const reparsedTextByGroups = mapObject(preparsedTextByGroups, ({key, value}) => ({key, value: parseItemText({
        text: value,
        thisText: baselineItem.Name,
        rng,
        item: baselineItem
    })}))
    
    function compileAndReparseActivesToText(arr) {
        if (arr == null || arr.length == 0) {
            return null
        }
        const effectsWithParsedEffect = arr.map(e => ({...e, Effect: parseItemText({
            text: e.Effect,
            thisText: baselineItem.Name,
            rng,
            item: baselineItem
        })}))
        return effectsWithParsedEffect
            .map(e => e.A == null? e.Effect: `{Hand}${e.A}: ${e.Effect}`)
            .join('\n')
    }

    function compileAndReparsePassivesToText(passives) {
        if (passives == null || passives.length == 0) {
            return null
        }
        const parsedPassives = passives.map(e => parseAllPropsOfEffectObj(e, baselineItem.Name))

        // ['OnKill', 'OnAttack', ..] -> { OnKill: [text1, text2], OnAttack: .. }
        const passivesByType = mapKeysToObject(Object.keys(POSSIBLE_EFFECT_TEXTS_FORMATTING), key => parsedPassives.filter(e => e[key] != null).map(e => e[key]))
        const eachTypeFinalText = mapObject(passivesByType, ({key, value: arr}) => ({key, value: POSSIBLE_EFFECT_TEXTS_FORMATTING[key](arr)}))
        return Object.keys(eachTypeFinalText)
            .filter(key => eachTypeFinalText[key].length > 0)
            .map(key => eachTypeFinalText[key])
            .sort((a, b) => a.length - b.length)
            .join('\n')
    }
    function addWeaponBonusDamages(addedEffectsBonusDamage) {
        if (addedEffectsBonusDamage == null || addedEffectsBonusDamage.length == 0 || baselineItem.Damage == null) {
            return
        }
        const validBDEffects = addedEffectsBonusDamage.filter(e => e['Bonus Damage'] != null)
        for (const effect of validBDEffects) {
            baselineItem.Damage = addBonusToDamageText(baselineItem.Damage, effect['Bonus Damage'])
        }
    }



    const color = (col, text) => text == null? null: `{Color('${col}' '${text}')}`
    let validEffects
    if (itemType == 'Armor' || itemType == 'Shield') {
        validEffects = [
            color('var(--green-text)', reparsedTextByGroups['Stats']),
            color('var(--green-text)', reparsedTextByGroups['Property']),
            reparsedTextByGroups['Passive'],
            compileAndReparseActivesToText(addedEffectsByGroup['Active']),
            color('var(--blue-color)', reparsedTextByGroups['Minor']),
        ]
    } else {
        validEffects = [
            color('var(--green-text)', reparsedTextByGroups['Property']),
            compileAndReparsePassivesToText(addedEffectsByGroup['Passive']),
            compileAndReparseActivesToText(addedEffectsByGroup['Active']),
            color('var(--green-text)', reparsedTextByGroups['Stats']),
            color('var(--blue-color)', reparsedTextByGroups['Minor']),
        ]
    }
    const _validEffects = validEffects
    validEffects = validEffects.filter(s => s != null && s.length > 0)
    const finalEffect =
        validEffects.length == 0?
            null
        :
            validEffects.join('\n\n') + (baselineItem.EffectOriginal != null? `\n${baselineItem.EffectOriginal}`: '')

    console.log({addedEffectsByGroup, preparsedEffectsByGroup, preparsedEffectsByGroupFiltered, preparsedTextByGroups, reparsedTextByGroups, validEffects, finalEffect})

    if (baselineItem.Damage != null) {
        addWeaponBonusDamages(addedEffectsByGroup['Bonus Damage'])
    }
    baselineItem.Effect = finalEffect
    baselineItem.Downside = reparsedTextByGroups['Curse']
    baselineItem.Upgrade = reparsedTextByGroups['Quirk']

    baselineItem.XP = xp
    baselineItem.HasMixins = true
    baselineItem.Price = getItemPrice(baselineItem, addedEffectsByGroup, rng)

    // Add icon
    const iconName = getItemIconName(baselineItem, rng)
    baselineItem.CustomIconPath = getItemIconPathByName(iconName)

    // Add tint color
    const tintColor = getItemTintColor(baselineItem._AllText, rng)
    if (tintColor != null) {
        baselineItem.TintColor = tintColor
    }
    
    console.log({baselineItem})
    console.green(`Returning ${baselineItem.Name}!`)

    return baselineItem
}


export default function MagicItemCreator() {

    function createAnItem() {
        const seed = generateUniqueId()
        const xp = randomInt(1, 10) * 25
        const rng = new SeededRNG(seed)

        let itemCategory = randomOfArrayWeighted(['Weapon', 'Armor', 'Shield'], [45, 45, 10])
        if (itemCategory == 'Weapon') {
            itemCategory = randomOf('One-Handed', 'Two-Handed') + ' ' + randomOf('Melee', 'Ranged') + ' Weapon'
        }
        return createMagicItem(xp, itemCategory, rng)
    }
    const [item, setItem] = useState(createAnItem())

    return <Page>
        <p style={{color: 'white'}}>asdasddasdsa</p>
        <br/>
        <br/>
        <HeroButton onClick={() => setItem(createAnItem())}>Another</HeroButton>
        <br/>
        <TwoColumns>
            <Column><Spell spell={item}/></Column>
            <Column></Column>
        </TwoColumns>
    </Page>
}