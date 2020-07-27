
import fs from 'fs'
import YAML from 'yaml'
import * as path from 'path'
import pretty from 'pretty'

import * as FileList from './FileList.mjs'
import * as Config from './Config.mjs'

import generateClass from './Generators/GenerateClass.mjs'

function outputClass(filePath) {
    let yamlText = fs.readFileSync(filePath, {encoding: 'utf8', flag: 'r'})
    let object = YAML.parse(yamlText)

    let htmlContent = generateClass(object)

    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)

    let fullPath = path.join(Config.websiteRootPath, FileList.outputFileStructure['class'], object.Class + '.html')
    fs.writeFileSync(fullPath, pretty(htmlContent), {encoding: 'utf8'})
    console.log(`Wrote file ${fullPath}`)
}

for (let filePath of Object.keys(FileList.files)) {
    switch (FileList.files[filePath]) {
        case 'class':
            console.log(`Outputting ${filePath}`)
            outputClass(path.join(Config.designRootPath, filePath))
    }
}
