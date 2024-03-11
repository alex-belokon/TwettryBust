import { userToken } from "../utils/userToken";

export const getUsersById = async (userId) => {
    const token = JSON.parse(userToken());
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonResponse = await response.json(); 
      return jsonResponse;
    } catch (e) {
      console.log(e);
    }
  }