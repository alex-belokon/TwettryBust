import { baseUrl } from "./baseUrl";

export const forgotPassword = async (email) => {
    console.log(email);
    try {
            const response = await fetch(
              `http://localhost:9000/api/password-reset/request?email=${email}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
        );
        console.log("response",response);
        if (!response.ok) {
            throw new Error(`Помилка під час відправлення електронної пошти: ${response.status}`);
        }
        const data = response.body;
    
        console.log("data",data)
        return true;
         
    } catch (error) {
        console.error("Помилка під час виконання POST-запиту:", error);
    }
}
export const resetPassword = async (password) => {
    const storedData = JSON.parse(localStorage.getItem("persist:authUser"));
    const token = JSON.parse(storedData.token);
    // const token = `52008bed-748e-4f8c-92c4-e114ddc9dece`;
    console.log("token",token);
    try {
        // const response = await fetch(`${baseUrl}/api/reset-password`, {
           const response = await fetch(
              `http://localhost:9000/api/password-reset/reset?token=${token}%09&password=${password}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ password ,passwordConfirm }),
        });
        if (!response.ok) {
            throw new Error(`Помилка під час відправлення паролю користувача: ${response.status}`);
        }
     
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Помилка під час виконання POST-запиту:", error);
    }
}