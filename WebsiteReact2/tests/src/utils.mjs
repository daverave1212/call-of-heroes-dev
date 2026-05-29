import { newPage } from "./browser.mjs";
import config from "./config.mjs";

export function wait(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}

export function includesAny(str, strings, excludesAny) {
    for (const included of strings) {
        if (str.includes(included)) {
            return included
        }
    }
    return false
}

export function testPage(pageName, func) {

    if (!pageName.startsWith('/') && pageName != '') {
        pageName = '/' + pageName
    }

    const describeTitle = pageName == ''? 'index': pageName

    describe(describeTitle, () => {
        let page

        let consoleErrors = []
    
        
        beforeAll(async () => {
            page = await newPage(({ message, type, isCrash }) => {
                consoleErrors.push({ message, isCrash })
            })
        })
        beforeEach(async () => {
            consoleErrors = []
            await page.goto(config.domain + pageName, { waitUntil: 'load' })
        })

        afterEach(async () => {
            expect(consoleErrors.length).toEqual(0)
        })

        afterAll(async () => {
            await page.close()
        })

        func(page)

    })

}

export async function withPage(pageName, func) {
    let consoleErrors = []
    const page = await newPage(err => {
        const { message, type, isCrash } = err
        consoleErrors.push(err)
    })

    const fullUrl =
        !pageName.includes(config.domain)?
            (config.domain + pageName).trim()
        :
            pageName.trim()

    // console.log(`Going to "${fullUrl}"`)
    await page.goto(fullUrl, { waitUntil: 'load' })
    await wait(500)
    await func(page, consoleErrors)
    await page.close()
}
export function testWithPage(pageName, func) {
    test(pageName, async () => {
        await withPage(pageName, func)
    })
}