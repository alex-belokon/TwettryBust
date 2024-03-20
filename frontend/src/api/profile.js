import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";

export const getUserData = async (userId) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}`,
      {
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
  } catch (error) {
    console.error('Error fetch user profile:', error.message);
  }
};

export const changeUserData = async (sendData) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/users/edit/`,
      {
        method: 'PUT',
        body: JSON.stringify(sendData),
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
  } catch (error) {
    console.error('Error fetch user profile:', error.message);
  }
}

export const getUsersFollowing = async (id, page=0) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/users/following/?userId=${id}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.error(e)
  }

}

export const getUsersFollowers = async (userId, page=0) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/users/followers/?userId=${userId}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.error(e)
  }
}

export const getUserPosts = async (userId, page=0) => {
  const token = JSON.parse(userToken());
  
  try {
    const response = await fetch(`${baseUrl}/api/users/posts?userId=${userId}&page=${page}`, {
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
    console.error('Error fetch user posts:', e.message);
  }
}

export const getUserHighlights = async (page=0) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/posts/favoredBy?page=${page}`,  {
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
    console.error('Error fetch user highlights:', e.message);
  }
}

export const getRecommendUsers = async (token) => {

  const response = await fetch(`${baseUrl}/api/users/recommendations?page=0`, {
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
}

export const toggleFollow = async (followUserId) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/users/toggleFollow?userId=${followUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/hal+json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: followUserId
      })
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

export const getUsersPostsLikes = async (id, page=0) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/posts/likedBy?userId=${id}&page=${page}`, {
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
    console.log(e);
  }
}

export const findUser = async (param) => {
  try {
    const response = await fetch(`${baseUrl}/api/users/find/${param}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/hal+json'
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

export const findChatByMessage = async (param) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/messages/containingKeyword/${param}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/hal+json',
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