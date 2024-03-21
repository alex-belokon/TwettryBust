import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";

export const getUserBookmarks = async (currentUserId) => {
  const token = JSON.parse(userToken());
  try {
    const url = `${baseUrl}/api/posts/favoredBy?uid=${currentUserId}&page=0`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user media:', e.message);
  }
}