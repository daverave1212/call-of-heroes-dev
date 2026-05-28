import config from "../config.mjs"
import { withPage } from "../utils.mjs"
import path from 'path'
import fs from 'fs'
import { closeBrowser } from "../browser.mjs"

function getPagesConfigs() {
    const navPathConfig = path.join(config.repoPath, 'src', 'NavConfig.json')
    const navConfigJson = fs.readFileSync(navPathConfig, { encoding: 'utf-8' })
    const navConfig = JSON.parse(navConfigJson)
    return navConfig.config
}
function smokeTestPage(pageName, page) {
    if (!pageName.startsWith('/')) {
        pageName = '/' + pageName
    }
    test(pageName, async () => {
        await page.goto(config.domain + pageName, { waitUntil: 'load' })
        const url = page.url()
        expect(url.includes(pageName)).toEqual(true)
    })
}
function maybeSmokeTestMenuItem(menuItem, page) {
    if (menuItem.name?.includes('Play With Us')) {
        return
    }
    if (menuItem.href?.includes('/') != true) {
        return
    }
    smokeTestPage(menuItem.href, page)
}


describe('All Pages Smoke Tests', () => {
    withPage(page => {
        const menuItems = getPagesConfigs()
        for (const menuItem of menuItems) {
            maybeSmokeTestMenuItem(menuItem, page)
            if (menuItem.children == null) {
                continue
            }
            for (const submenuItem of menuItem.children) {
                maybeSmokeTestMenuItem(submenuItem, page)
                if (submenuItem.children == null) {
                    continue
                }
                for (const subsubmenuItem of submenuItem.children) {
                    maybeSmokeTestMenuItem(subsubmenuItem, page)
                }
            }
        }
    })
    afterAll(async () => {
        await closeBrowser()
    })
})
