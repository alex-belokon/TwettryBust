import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";

export const getUserDialogs = async () => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(`${baseUrl}/api/chat/getChatsByCurrentUser`, {
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

export const createNewDialog = async (userId, id) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/chat/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        userRequest: { id: userId },
        creator: { id: id },
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

export const getChatMessages = async (chatId) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(`${baseUrl}/messages/byChatId/${chatId}`, {
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

export const postNewMessages = async (message) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(`${baseUrl}/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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

export const deleteUserMessage = async (id) => {
  const token = JSON.parse(userToken());
console.log(id);
  try {
    const response = await fetch(`${baseUrl}/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (e) {
    console.error('Error', e.message)
  }
}

export const deleteUserChat = async (idChat) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/chat/${idChat}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (e) {
    console.error('Error', e.message)
  }
}