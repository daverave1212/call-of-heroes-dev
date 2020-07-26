
import fs from 'fs'
import YAML from 'yaml'

import * as FileList from './FileList.mjs'
import * as Config from './Config.mjs'

import generateClass from './Generators/GenerateClass.mjs'

function outputClass(path) {
    let yamlText = fs.readFileSync(path, {encoding: 'utf8', flag: 'r'})
    let object = YAML.parse(yamlText)

    let htmlContent = generateClass(object)

    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)
    if (!fs.existsSync(Config.websiteRootPath + '\\Classes')) fs.mkdirSync(Config.websiteRootPath + '\\Classes')

    fs.writeFileSync(Config.websiteRootPath + '\\Classes\\' + object.Class + '.html', htmlContent, {encoding: 'utf8'})
    console.log(`Wrote file ${Config.websiteRootPath + '\\Classes\\' + object.Class + '.html'}`)
}

for (let path of Object.keys(FileList.files)) {
    switch (FileList.files[path]) {
        case 'class':
            console.log(`Outputting ${path}`)
            outputClass(Config.designRootPath + '\\' + path)
    }
}
