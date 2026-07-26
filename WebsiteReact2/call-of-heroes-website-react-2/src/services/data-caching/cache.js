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

const cache = {
    async setAsync(key, value) {
        const db = await dbPromise;
        await db.put("keyValue", value, key);
    },
    async getAsync(key) {
        const db = await dbPromise;
        return await db.get("keyValue", key);
    },
    async deleteAsync(key) {
        const db = await dbPromise;
        await db.delete("keyValue", key);
    },
    async existsAsync(key) {
        const db = await dbPromise;
        return (await db.getKey("keyValue", key)) !== undefined;
    }

}

export default cache

window.cache = cache
