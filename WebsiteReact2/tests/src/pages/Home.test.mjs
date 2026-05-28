
import puppeteer from "puppeteer";
import { closeBrowser, newPage } from "../browser.mjs";
import { wait } from "../utils.mjs";
import config from "../config.mjs";



testPage('', () => {
    test('Home works', async () => {
        await wait(2000)
        expect(true).toBe(true)
    })
})

afterAll(async () => {
    await closeBrowser()
})