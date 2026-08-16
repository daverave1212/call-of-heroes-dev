const GRACE_PERIOD = 2000   // 2 seconds
const _cache = {
    'example-collection:operation:paramsHash': {
        timestamp: 123192830,
        promise: 'some promise'
    }
}

// Prevents app making 91283912 requests simultaneously
export async function withAntiSpamCache(collection, operation, paramsHash, asyncFunc) {
    const cacheKey = `${collection}:${operation}:${paramsHash}`
    const now = Date.now()
    if (cacheKey in _cache) {
        const cachedResult = _cache[cacheKey]
        const timeSinceLast = now - cachedResult.timestamp
        if (timeSinceLast < GRACE_PERIOD) {
            return await cachedResult.promise
        }
    }
    const newPromise = asyncFunc()
    _cache[cacheKey] = {
        timestamp: now,
        promise: newPromise
    }
    try {
        return await newPromise
    } catch (e) {
        throw e
    }
}