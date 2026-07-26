// indexedDb.js

import { openDB } from "idb";

const dbPromise = openDB("questguard-db", 1, {
    upgrade(db) {
        db.createObjectStore("keyValue");
    },
});

export async function setCacheObject(key, value) {
    const db = await dbPromise;
    await db.put("keyValue", value, key);
}

export async function getCacheObject(key) {
    const db = await dbPromise;
    return await db.get("keyValue", key);
}

export async function deleteCacheObject(key) {
    const db = await dbPromise;
    await db.delete("keyValue", key);
}

export async function existsCacheObject(key) {
    const db = await dbPromise;
    return (await db.getKey("keyValue", key)) !== undefined;
}

export async function clearCache() {
    const db = await dbPromise;
    await db.clear("keyValue");
}
