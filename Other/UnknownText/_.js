

const CHARS = 'abcdefghijkns'.split('')
const SPECIAL_CHARS = {
    'a': 'l',
    'c': 'o',
    'd': 'p',
    'e': 'm',
    'f': 'q',
    'i': 'r'
}

const CHAR_WEIGHTS = {
    'a': 5,
    'b': 4,
    'c': 2,
    'd': 4,
    'e': 5,
    'f': 3,
    'g': 1,
    'h': 2,
    'i': 10,
    'j': 3,
    'k': 5,
    'n': 5,
    's': 2
}

const PARTICLE_CHANCE = 43
const PARTICLES = {
    'an': 7,
    'g': 6,
    'ahn': 5,
    'kg': 4,
    'o': 3,
    'ni': 2,
    'apad': 2,
    'cch': 2,
    'abf': 1,
    'kla': 1,
    'sha': 1,
    'nk': 1,
    'lj': 1,
}


// The combo is written as LEFT to RIGHT here, but the final result will be FLIPPED (so backwards)
// E.g. 'sr' in the end will mean 'rs' is illegal.
const ILLEGAL_COMBOS = [
    'sr',
    'sj',
    'si',
    'sh',
    'ss',
    'nk',
    'nj',
    'nc',
    'no',
    'kj',
    'kk',
    'js',
    'jn',
    'jk',
    'jj',
    'jh',
    'jg',
    'jf',
    'je',
    'jd',
    'jb',
    'ja',
    'hhh',
    'ge',
    'gf',
    'gg',
    'fc',
    'fi',
    'ec',
    'ei',
    'dj',
    'ddd',
    'cc',
]
function getPossibleNextCharWeighted(prevChar) {
    const illegalChars = ILLEGAL_COMBOS
        .filter(str => str.charAt(0) == prevChar)
        .map(str => str.charAt(1))
    const weights = Object.keys(CHAR_WEIGHTS)
        .filter(char => !illegalChars.includes(char))
        .reduce((obj, char) => ({...obj, [char]: CHAR_WEIGHTS[char]}), {})
    return weights
}


function weightedRandom(obj) {
  const entries = Object.entries(obj);
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let r = Math.random() * totalWeight;

  for (const [key, weight] of entries) {
    if (r < weight) return key;
    r -= weight;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFrom(arr) {
    const i = randomInt(0, arr.length - 1)
    return arr[i]
}
function randomWeightedLetter() {
    return weightedRandom(CHAR_WEIGHTS)
}

function generateWord() {
    let nLetters = randomInt(1, 5) * 2 + 1
    if (nLetters == 3 && randomInt(1, 100) > 50) {
        nLetters += 1
    }
    let word = ''
    for (let i = 0; i < nLetters; i++) {
        if (i == 0) {
            word += randomWeightedLetter()
            continue
        }
        const prevLetter = word.charAt(i - 1)
        console.log({prevLetter})
        const nextCharsWeighted = getPossibleNextCharWeighted(prevLetter)
        console.log({nextCharsWeighted})
        const char = weightedRandom(nextCharsWeighted)
        console.log({char})
        word += char
    }
    
    return word
}

function maybeReplaceRandomVowels(word) {
    const shouldReplace = randomInt(0, 100) < 40
    if (!shouldReplace) {
        return word
    }
    const newWord = word.split('')
                        .map(char => SPECIAL_CHARS[char] != null? SPECIAL_CHARS[char]: char)
                        .join('')
    return newWord

}

function generateSentence(nApproximateWords) {
    const words = []
    for (let i = 0; i < nApproximateWords; i++) {
        if (randomInt(0, 100) < PARTICLE_CHANCE) {
            words.push(weightedRandom(PARTICLES))
        } else {
            words.push(generateWord())
        }
    }
    const lastWord = words[words.length - 1]
    if (PARTICLES[lastWord] != null) {
        words.push(generateWord())
    }

    return words.map(word => word.split('').reverse().join(''))
                .map(word => maybeReplaceRandomVowels(word))
                .reverse()
                .join(' ')
}

// console.log(getPossibleNextCharWeighted('j'))
console.log(`${generateSentence(261)}`)
