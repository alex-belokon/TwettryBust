

export const forgotPassword = async (email) => {
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
        if (!response.ok) {
            throw new Error(`Помилка під час відправлення електронної пошти: ${response.status}`);
        }
        const data = response.body;
        return true;
         
    } catch (error) {
        console.error("Помилка під час виконання POST-запиту:", error);
    }
}
export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const response =await fetch(
      `http://localhost:9000/api/password-reset/reset?token=${token}&password=${password}&passwordConfirm=${passwordConfirm}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Помилка під час відправлення паролю користувача: ${response.status}`
      );
    }
    return true;
  } catch (error) {
    console.error("Помилка під час виконання POST-запиту:", error);
  }
};