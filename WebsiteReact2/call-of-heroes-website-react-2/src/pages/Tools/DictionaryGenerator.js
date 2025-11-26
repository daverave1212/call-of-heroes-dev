import PageH2 from "../../components/PageH2/PageH2"
import Page from "../../containers/Page/Page"
import { drawTextLines, range, splitArrayEvenly } from "../../utils"
import { QGTitle1 } from "./TitleGenerator"
import './DictionaryGenerator.css'
import { useState } from "react"

const dictionary = {
  "ク": "be",
  "ℑ": "have",
  "₰": "do/make",
  "₺": "can",
  "/": "divide, cut",
  "キ": "take",
  "火": "give",
  "⁆": "come",
  "r": "go",
  "ȴ": "I",
  "Ђ": "you",
  "ſ": "it",
  "ᔑ": "this/that",
  "⌤": "what",
  "ƿ": "down",
  "ก": "up",
  "Ƈ": "center",
  "ƾ": "very",
  "দ": "back",
  "⋢": "front",
  "⚘": "near, nearby, next to",
  "☊": "outside",
  "₪": "if",
  "৳": "to",
  "Ҁ": "with",
  "℩": "for",
  "∮": "of/from",
  "⋲": "in",
  "☶": "which",
  "ʯ": "and",
  "ʯʯ": "or",
  "ⴡ": "but",
  "≍": "white",
  "∎": "black",
  "ð": "red",
  "₹": "green",
  "〰": "blue",
  "↕": "big, large",
  "ぬ": "good, clean, ok",
  "λ": "weird, unusual, strange",
  "⊣": "far",
  "༼": "addition",
  "≸": "conflict, war, battle",
  "♆": "damage, mistake",
  "⊟": "flight",
  "☨": "god, religion",
  "☽": "knowledge",
  "∞": "life",
  "Δ": "love, compassion, empathy",
  "⟰": "new, novelty",
  "⋙": "need, want, desire",
  "𐌄": "number",
  "✷": "origin, start, cause",
  "⥊": "physical",
  "⊫": "quantity",
  "ဉ": "rest, stay, sleep",
  "༽": "subtraction, removal",
  "ℵ": "truth",
  "⋹": "warmth",
  "☲": "zone, territory, land",
  "☌": "size",
  "☉": "time",
  "_": "times",
  "〞": '0',
  "•": '1',
  "‣•": '2',
  "∴‣•": '3',
  "∴•": '4',
  "‣∴": '5',
  "‣∴•": '6',
  "‣‣•": '7',
  "∴∴•": '8',
  "⋮": '9',
  "☓": "animal",
  "⅁": "thing/object",
  "ꩴ": "person",
  "៛": "money, gold",
  "♅": "food",
  "ၡ": "water, liquid",
  "❡": "medicine, cure",
  "↾": "wall",
  "✜": "powder, clay, paste, semi-solid",
  "ℐ": "plant, mushroom",
  "⚗": "fruit, vegetable",
  "❍": "metal",
  "水": "air, spirit",
  "门": "square, block",
  "⚺": "container",
  "O": "round, circle",
  "u": "hole",
  "∐": "flat",
  "ꧨ": "rope, hair, long flexible string-like object",
  "⚊": "stick, long object",
  "⚲": "body part, organ",
  "Ω": "night, moon, darkness",
  "₳": "light, sun, day",
  "𐌍": "path, way, road",
  "山": "hill, mountain, bump",
  "♦": "sense",
  "や": "sound",
  "ᙓ": "smell",
  "อ": "taste",
  "ত": "sight",
  "꧳": "color",
  "ℭ": "type",
  "℥": "plural (s)",
  "♮": "not/no",
  "☡": "opposite particle, turns a word into its opposite when in front of it",
  "ⴇ": "-ing",
  "⋌": "-y, -ly, -ful",
  "℔": "-ed, adjective particle, turns a word into an adjective when in front of it",
  "꧲": "-like",
  "§": "-ness, -dom, noun particle, turns a word into a noun when in front of it",
  "♃": "-er, -or",
  "︻": "-st/-nd/-th",
  "ℷ": "small, little, few",
  "৲": "-, combine particle between words",
  "♩": "-ize, verb particle, turns a word into a verb when in front of it"
}

export default function DictionaryGenerator() {
    const allSymbols = Object.keys(dictionary)
    const nPages = Math.floor(allSymbols.length / 8)
    const symbolsByPage = splitArrayEvenly(allSymbols, nPages)

    const [inputValue, setInputValue] = useState('')

    function translateLine(line) {
        const words = line.trim().length > 0? line.split(' '): null
        const findSymbol = word => allSymbols.find(symbol => dictionary[symbol]?.includes(word)) ?? `ERROR(${word})`
        return words?.map(word => findSymbol(word)).join('') ?? ''
    }

    function translateTextToLines(text) {
        const lines = text.split('\n').map(line => translateLine(line))
        return lines
    }

    return <Page>
        <div className="center-content">
            <QGTitle1 text={'Fantasy Dictionary'}></QGTitle1>
            <textarea className="text-input" value={inputValue} onChange={evt => setInputValue(evt.target.value)}/>
            <div>
                { translateTextToLines(inputValue).map(line => <p style={{fontSize: '48px'}}>{line}</p>) }
            </div>
        </div>
        <div>
            { range(0, nPages).map(i => (
                <div className="parchment-page">
                    <div>
                        { symbolsByPage[i]
                            .map(symbol => `${symbol}   -   ${dictionary[symbol]}`)
                            .map(text => <p>{text}</p>)
                        }
                    </div>
                </div>
            )) }
        </div>
    </Page>
}



/*



# Default verbs
ク: be
ℑ: have
₰: do/make
₺: can
/: divide, cut
キ: take
火: give
⁆: come
r: go

# Pronouns
ȴ: I
Ђ: you
ſ: it
ᔑ: this/that
⌤: what

# Directions
ƿ: down
ก: up
Ƈ: center
ƾ: very
দ: back
⋢: front
⚘: near, nearby, next to
☊: outside

# Particles
₪: if
৳: to
Ҁ: with
℩: for
∮: of/from
⋲: in
☶: that
ʯ: and
ʯʯ: or
ⴡ: but

# Colors
≍: white
∎: black
ð: red
₹: green
〰: blue

# Adjectives
↕: big, large
ぬ: good, clean, ok
λ: weird, unusual, strange
⊣: far

# Concepts
༼: addition
≸: conflict, war, battle
♆: damage, mistake
⊟: flight
☨: god, religion
☽: knowledge
∞: life
Δ: love, compassion, empathy
⟰: new, novelty
⋙: need, want, desire
𐌄: number
✷: origin, start, cause
⥊: physical
⊫: quantity
ဉ: rest, stay, sleep
༽: subtraction, removal
ℵ: truth
⋹: warmth
☲: zone, territory, land
☌: size
☉: time

# Numbers
_: times
〞: 0 
•: 1
‣•: 2
∴‣•: 3
∴•: 4
‣∴: 5
‣∴•: 6
‣‣•: 7
∴∴•: 8
⋮: 9

‣‣‣: 6
‣•••: 6



# Concrete things
☓: animal
⅁: thing/object
ꩴ: person
៛: money, gold
♅: food
ၡ: water, liquid
❡: medicine, cure
↾: wall

# Shapes / materials
✜: powder, clay, paste, semi-solid
ℐ: plant, mushroom
⚗: fruit, vegetable
❍: metal
水: air, spirit
门: square, block
⚺: container
O: round, circle
u: hole
∐: flat
ꧨ: rope, hair, long flexible string-like object
⚊: stick, long object
⚲: body part, organ
Ω: night, moon, darkness
₳: light, sun, day
𐌍: path, way, road
山: hill, mountain, bump


# Senses / descriptors
♦: sense
や: sound
ᙓ: smell
อ: taste
ত: sight
꧳: color
ℭ: type

# Modifier particles
℥: plural (s)
♮: not/no
☡: opposite particle, turns a word into its opposite when in front of it
ⴇ: -ing
⋌: -y, -ly, -ful
℔: -ed, adjective particle, turns a word into an adjective when in front of it
꧲: -like
§: -ness, -dom, noun particle, turns a word into a noun when in front of it
♃: -er, -or
︻: -st/-nd/-th
ℷ: small, little, few
৲: -, combine particle between words
♩: -ize, verb particle, turns a word into a verb when in front of it


*/