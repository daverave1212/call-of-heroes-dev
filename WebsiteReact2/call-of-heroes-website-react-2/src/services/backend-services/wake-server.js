
import BACKEND_CONFIG from './backend-config.json'
const { backendUrl } = BACKEND_CONFIG

// This exists to wake up the server because I am using the free
// version of Render.com, so the server is shut down if not used.
// And it takes a bit for the server to start.
// When I upgrade the server, this will no longer be needed.

let lastWakeCallTimestamp = 0
let MIN_TIME_BETWEEN_PINGS = 1000 * 60 * 5   // 5 minutes
export function maybeWakeServer() {          
    const timestamp = Date.now()
    const timeSinceLastPing = timestamp - lastWakeCallTimestamp

    if (timeSinceLastPing < MIN_TIME_BETWEEN_PINGS) {
        return
    }

    fetch(`${backendUrl}/api/ping`) // No need to return anything or await
}