import config from "./config.mjs"
import path from 'path'
import fs from 'fs'

function extractPages() {
    const navPathConfig = path.join(config.repoPath, 'src', 'NavConfig.json')
    const navConfigJson = fs.readFileSync(navPathConfig, { encoding: 'utf-8' })
    const navConfig = JSON.parse(navConfigJson)
    console.log(navConfig)
}

extractPages()