import puppeteer from "puppeteer";
import { includesAny } from "./utils.mjs";
import config from "./config.mjs";

let browser;

export function isWarning(consoleMessage) {
    const type = typeof consoleMessage.type === 'string'? consoleMessage.type: consoleMessage.type?.()
    return type == 'warn' || type == 'warning'
}

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

    function maybeError(errRaw, type, isCrash) {
        const errorText = errRaw?.text?.() ?? `Unknown error. Is crash? ${isCrash}`
        if (type == 'error' && includesAny(errorText, config.errorsToIgnore)) {
            return
        }
        if (isWarning(errRaw)) {
            const shouldIgnoreThisWarning = !includesAny(errorText, config.warningsToNotIgnore)
            if (shouldIgnoreThisWarning) {
                return
            }
        }
        onError?.({ message: errorText, type, isCrash })
    }

    const page = await browser.newPage();

    page.on("console", msg => {
        if (msg.type() === "error" || isWarning(msg)) {
            maybeError(msg, msg.type(), false)
        }
    });

    page.on("pageerror", err => {
        maybeError(err, 'crash', true)
    });

    return page;
}

export async function closeBrowser() {
  if (browser) await browser.close()
}