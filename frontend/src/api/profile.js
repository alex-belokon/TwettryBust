export const getUserData = async (userId, currentUserId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/users/${userId}?currentUserId=${currentUserId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

export const changeUserData = async (userId, sendData) => {
  try {
    const response = await fetch(`http://localhost:9000/api/users/edit/${userId}`,
      {
        method: 'PUT',
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json',
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

export const getUsersFollowing = async (userId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/users/following/${userId}?page=0`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

export const getUsersFollowers = async (userId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/users/followers/${userId}?page=0`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

export const getUserPosts = async (userId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/users/${userId}/posts?page=0`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user posts:', e.message);
  }
}

export const getUserHighlights = async (userId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/posts/favoredBy?uid=${userId}&page=0`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user highlights:', e.message);
  }
}

export const getRecommendUsers = async (userId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/users/recommendations?uid=${userId}&page=0`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export const toggleFollow = async (currentUserId, followUserId) => {
  try {
    const response = await fetch('http://localhost:9000/api/users/toggleFollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/hal+json'
      },
      body: JSON.stringify({
        uid1: currentUserId, 
        uid2: followUserId
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

export const getUsersPostsLikes = async (userId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/posts/likedBy?uid=${userId}&page=0`);
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
  try{
    const response = await fetch(`http://localhost:9000/api/users/find/${param}`, {
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

export const findChatByMessage =  async (param) => {
  console.log(param);
  try{
    const response = await fetch(`http://localhost:9000/messages/containingKeyword/${param}`, {
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