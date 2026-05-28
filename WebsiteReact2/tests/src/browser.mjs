import puppeteer from "puppeteer";
import { includesAny } from "./utils.mjs";
import config from "./config.mjs";

let browser;

export async function startBrowser() {
    browser = await puppeteer.launch({
        headless: true
    })

    return browser
}

export async function newPage(onError) {
    if (!browser) {
        await startBrowser();
    }

    function maybeError(errRaw, isCrash) {
        const errorText = errRaw.text()
        if (includesAny(errorText, config.errorsToIgnore)) {
            return
        }
        onError?.({ error: errorText, isCrash })
    }

    const page = await browser.newPage();

    page.on("console", msg => {
        if (msg.type() === "error") {
            maybeError(msg, false)
        }
    });

    page.on("pageerror", err => {
        maybeError(err, true)
    });

    return page;
}

export async function closeBrowser() {
  if (browser) await browser.close()
}