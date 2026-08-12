import BACKEND_CONFIG from './backend-config.json'
const { backendUrl } = BACKEND_CONFIG

export async function activateCodeAsync(user, code) {
    if (!user) {
        return {
            success: false,
            statusCode: 401,
            message: "You must be logged in to activate a code.",
        };
    }

    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
        return {
            success: false,
            statusCode: 400,
            message: "Please enter an activation code.",
        };
    }

    try {
        const idToken = user.idToken;

        const response = await fetch(
            `${backendUrl}/api/activation-codes/redeem`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    code: normalizedCode,
                }),
            }
        );

        let data;

        try {
            data = await response.json();
        } catch {
            return {
                success: false,
                statusCode: response.status,
                message: "The server returned an invalid response.",
            };
        }

        return {
            success: response.ok,
            statusCode: response.status,
            message:
                data.message ??
                data.error ??
                "The activation request could not be completed.",
        };
    } catch (error) {
        console.error("Activation request failed:", error);

        return {
            success: false,
            statusCode: 0,
            message:
                "Could not connect to the QuestGuard server. Please try again.",
        };
    }
}