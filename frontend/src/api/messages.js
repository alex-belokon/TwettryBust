import { baseUrl } from "./baseUrl";

export const getUserDialogs = async () => {
  const storedData = JSON.parse(localStorage.getItem('persist:authUser'));
  const token = JSON.parse(storedData.token);

  try {
    const response = await fetch('http://localhost:9000/api/chat/getChatsByCurrentUser', {
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

  try {
    const response = await fetch(`http://localhost:9000/api/chat/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  const storedData = JSON.parse(localStorage.getItem('persist:authUser'));
  const token = JSON.parse(storedData.token);

  try {
    const response = await fetch(`http://localhost:9000/messages/byChatId/${chatId}`, {
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
  const storedData = JSON.parse(localStorage.getItem('persist:authUser'));
  const token = JSON.parse(storedData.token);

  try {
    const response = await fetch(`http://localhost:9000/messages`, {
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

export const searchUser = async (searchParams) => {
  try {
    const response = await fetch(`${baseUrl}/api/search/findByUserName`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (e) {
    console.error('Error fetch all seartch info', e.message)
  }
}