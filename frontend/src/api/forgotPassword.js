import { baseUrl } from "./baseUrl";

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${baseUrl}/api/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            throw new Error(`error status: ${response.status}`);
        }
    } catch (error) {
        console.error("fetch", error);
    }
}