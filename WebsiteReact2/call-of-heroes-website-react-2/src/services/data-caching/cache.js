// indexedDb.js

import { openDB } from "idb";

const dbPromise = openDB("questguard-db", 1, {
    upgrade(db) {
        db.createObjectStore("keyValue");
    },
});


export async function clearCache() {
    const db = await dbPromise;
    await db.clear("keyValue");
}


// Aside from the IndexedDB cache, we also make a local cache, to save even more read time
const _localCache = {}

const cache = {
    async setAsync(key, value) {
        const db = await dbPromise;
        await db.put("keyValue", value, key);
        _localCache[key] = value
    },
    async getAsync(key) {
        if (_localCache[key]) {
            return _localCache[key]
        }
        const db = await dbPromise;
        return await db.get("keyValue", key);
    },
    async deleteAsync(key) {
        const db = await dbPromise;
        await db.delete("keyValue", key);
        delete _localCache[key]
    },
    async existsAsync(key) {
        const db = await dbPromise;
        return (await db.getKey("keyValue", key)) !== undefined;
    }

}

export default cache

window.cache = cache
