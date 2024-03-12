import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";

export const getUsersById = async (userId) => {
    const token = JSON.parse(userToken());
    try {
      const response = await fetch(`${baseUrl}/users/${userId}`, {
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