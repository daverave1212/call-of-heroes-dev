import config from "../config.mjs"
import { testWithPage, wait, withPage } from "../utils.mjs"
import path from 'path'
import fs from 'fs'
import { closeBrowser, isWarning } from "../browser.mjs"

function getPagesConfigs() {
    const navPathConfig = path.join(config.repoPath, 'src', 'NavConfig.json')
    const navConfigJson = fs.readFileSync(navPathConfig, { encoding: 'utf-8' })
    const navConfig = JSON.parse(navConfigJson)
    return navConfig.config
}
function expectPageOk(pageName, page) {
    if (!pageName.startsWith('/')) {
        pageName = '/' + pageName
    }
    test(pageName, async () => {
        await page.goto(config.domain + pageName, { waitUntil: 'load' })
        const url = page.url()
        expect(url).toMatch(pageName)
    })
}
function maybeSmokeTestPageFromMenuItem(menuItem) {
    if (menuItem.name?.includes('Play With Us')) {
        return
    }
    if (menuItem.href?.includes('/') != true) {
        return
    }
    if (menuItem.isDownload || menuItem.isExternal || menuItem.isDisabled) {
        return
    }

    const pageUrl = config.domain + menuItem.href
    testWithPage(pageUrl, async (page, errors) => {
        expectPageExists(page, errors)
        expectPageHasNoErrors(page, errors)
    })
}
function expectPageExists(page, errors, isReverse=false) {
    const pageUrl = page.url()
    const warnings = errors.filter(e => isWarning(e))
    const is404 = warnings.some(w => w.message.includes('No routes match'))

    if (is404 && !isReverse) {
        throw `Page ${pageUrl} does not exist`
    }
}
function expectPageHasNoErrors(page, errors) {
    const pageUrl = page.url()
    const realErrors = errors.filter(e => e.type == 'error')
    const hasErrors = realErrors.length > 0
    if (!hasErrors) {
        return
    }

    const finalMessage = realErrors.map(e => e.message).join('\n')
    throw `Page ${pageUrl} contains ${realErrors.length} errors` + '\n' + finalMessage
}


const menuItems = getPagesConfigs()

describe('Smoke Tests: All Pages', () => {
    
    testWithPage('/Test404DetectionWorks', async (page, errors) => {
        expectPageExists(page, errors, true)
        expectPageHasNoErrors(page, errors)
    })

    for (const menuItem of menuItems) {
        maybeSmokeTestPageFromMenuItem(menuItem)
        if (menuItem.children == null) {
            continue
        }
        for (const submenuItem of menuItem.children) {
            maybeSmokeTestPageFromMenuItem(submenuItem)
            if (submenuItem.children == null) {
                continue
            }
            for (const subsubmenuItem of submenuItem.children) {
                maybeSmokeTestPageFromMenuItem(subsubmenuItem)
            }
        }
    }


    afterAll(async () => {
        await closeBrowser()
    })
})
