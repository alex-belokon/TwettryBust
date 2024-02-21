import { baseUrl } from "./baseUrl";

export const forgotPassword = async (email) => {
    console.log(email);
    try {
        const response = await fetch(`${baseUrl}/api/forgot-password`, {
            // const response= await fetch("http://localhost:9000/api/(з бека ендпоінт)", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            throw new Error(`Помилка під час відправлення електронної пошти: ${response.status}`);
        }
        // const data = await response.json();
        const data = [
            {
                email:"null",
            }
        ]
        return data;
    } catch (error) {
        console.error("Помилка під час виконання POST-запиту:", error);
    }
}
export const resetPassword = async (password) => {
    const storedData = JSON.parse(localStorage.getItem("persist:authUser"));
    const token = JSON.parse(storedData.token);
    console.log("token",token);
    try {
        const response = await fetch(`${baseUrl}/api/reset-password`, {
          // const response= await fetch("http://localhost:9000/api/(з бека ендпоінт)", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        });
        if (!response.ok) {
            throw new Error(`Помилка під час відправлення паролю користувача: ${response.status}`);
        }
        const data = [
            {
                password: "null",
                token: "null",
            }
        ]
        // const data = await response.json();
        return data;
    } catch (error) {
        console.error("Помилка під час виконання POST-запиту:", error);
    }
}