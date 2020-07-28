
import fs from 'fs'
import YAML from 'yaml'
import pretty from 'pretty'

export const spellNameToUnderscore = name => name.split(' ').join('_')
export const newLinesToBR = text => text.split('\n').join('<br>')

export const dashCase = str => str.split(' ').join('-')
export const removeSpellTildes = spellName => spellName.substring(1, spellName.length - 1)

export const readYaml = filePath => YAML.parse(fs.readFileSync(filePath, {encoding: 'utf8', flag: 'r'}))
export const writeFile = (filePath, content) => fs.writeFileSync(filePath, content, {encoding: 'utf8'})

