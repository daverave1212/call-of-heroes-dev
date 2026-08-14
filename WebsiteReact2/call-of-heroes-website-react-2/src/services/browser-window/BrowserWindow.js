

import * as Auth from "../auth/Auth";
import * as ContentProvider from "../content-providers/ContentProvider";
import * as CharacterData from "../../pages/Other/CharacterCreationCalculator/CharacterData"

export function exportModuleToWindow(moduleName, myModule) {
    window[moduleName] = myModule
    // for (const [key, value] of Object.entries(myModule)) {
    //     // Only add if window does NOT already have this property
    //     if (!(key in window)) {
    //         window[key] = value;
    //     } else {
    //         console.warn(`Skipped '${key}' to prevent overwriting window.${key}`);
    //     }
    // }
}

export function exportAllToWindow() {
    exportModuleToWindow('ContentProvider', ContentProvider)
    exportModuleToWindow('Auth', Auth)
    exportModuleToWindow('CharacterData', CharacterData)
}
