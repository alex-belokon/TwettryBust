import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";

export const getNotifications = async () => {
    const token = JSON.parse(userToken());
    try {
      const response = await fetch(`${baseUrl}/api/notifications`, {
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
    } catch (error) {
      console.error('Error fetch user Dialogs:', error.message);
      throw error;
    }
  };
  export const createNewNotification = async (notificationType, sender, postId = "") => {
    try {
      const token = JSON.parse(userToken());
      const response = await fetch(`${baseUrl}/api/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            postId,
            sender,
            notificationType,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (e) {
      console.error('Error fetch all seartch info', e.message)
    }
  }