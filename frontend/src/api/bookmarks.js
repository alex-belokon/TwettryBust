import { baseUrl } from "./baseUrl";


export const getUserBookmarks = async (id, currentUserId) => {
  try {
    const response = await fetch(`${baseUrl}/api/bookmarks/${id}-${currentUserId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    throw error;
  }
};