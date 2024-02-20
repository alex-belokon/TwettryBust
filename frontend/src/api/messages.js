import { baseUrl } from "./baseUrl";


export const getUserMessages = async (id, currentUserId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/chat/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    
    return jsonResponse;
  } catch (error) {
    console.error('Error fetch user messages:', error.message);
  }
};

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


export const searchUser = async (searchParams) => {
  try {
    const response = await fetch(`${baseUrl}/api/search/findByUserName`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // const jsonResponse = await response.json();
    const jsonResponse = [
      {
        name: "Thomas",
        lastName: "Brown",
        login: "john_doe",
        lastMessage: "Hello there!",
        dateOfLastMessage: "2024-01-30",
        userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663691/cld-sample-3.jpg",
        id: 9876555,
      },
      {
        name: "Elizabeth",
        lastName: "Wilson",
        login: "jane_smith",
        lastMessage: "How are you?",
        dateOfLastMessage: "2023-12-15",
        userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663663/samples/landscapes/girl-urban-view.jpg",
        id: 8765455,
      },
    ];
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch all seartch info', e.message)
  }
}