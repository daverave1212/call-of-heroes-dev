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
            page = await newPage(({ error, isCrash }) => {
                consoleErrors.push({ error, isCrash })
            })
        })
        beforeEach(async () => {
            consoleErrors = []
            await page.goto(config.domain + pageName)
        })

        afterEach(async () => {
            expect(consoleErrors.length).toEqual(0)
        })

        afterAll(async () => {
            await page.close()
        })

        func()

    })

}