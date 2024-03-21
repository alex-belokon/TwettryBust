import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";

export const getPosts = async (queryParam, numberPage, token) => {
    const url = queryParam === 'forYou' ? `${baseUrl}/api/posts/?page=${numberPage}` : `${baseUrl}/api/posts/followedUsersPosts?page=${numberPage}`
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
}

export const getPostById = async (postId) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
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

export const postCreatePost = async (data) => {
  const token = JSON.parse(userToken());

  const sendData = {
    content: data.content,
    attachment: data.attachment,
    originalPostId: data.originalPostId,
  }

  try {
    const response = await fetch(`${baseUrl}/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(sendData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Помилка під час виконання POST-запиту:", error);
    throw error;
  }
};
// export const getCreateNotification = async (data) => {
//   try {
//     const response = await fetch(`${baseUrl}/api/notifications/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error("Помилка під час виконання POST-запиту:", error);
//     throw error;
//   }
// };

export const deletePost = async (postId) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {
    console.error("Помилка під час видалення посту:", error);
    throw error;
  }
};

export const postToggleLikes = async (userId, postId) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/posts/like?postId=${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        postId: postId,
      }),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to toggle likes: ' + response.statusText);
    }

  } catch (error) {
    console.error(error);
  }
};

export const postToggleBookmark = async (userId, postId) => {
  const token = JSON.parse(userToken());

  try {
    const response = await fetch(`${baseUrl}/api/posts/favorite?postId=${postId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to toggle likes: ' + response.statusText);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getPostDetails = async (postId) => {
  const token = JSON.parse(userToken());

  try {
    const url = `${baseUrl}/api/posts/${postId}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const postData = await response.json();
    return postData;
  } catch (e) {
    console.error('Error fetch post details:', e.message);
  }
}

export const postCommentPost = async (postId, comment) => {
  try {
    const url = `${baseUrl}/posts/${postId}/comments`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(comment),
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
    console.error('Error fetch user media:', e.message);
  }
}

export const fetchComments = async (id, page = 0) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(`${baseUrl}/posts/${id}/comments?page=${page}&size=10`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (Array.isArray(data.content)) {
      return data.content;
    } else {
      console.error('Error: expected an array of comments, but got', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return [];
};

export const deletePostComment = async (postId, commentId) => {

  try {
    const response = await fetch(`${baseUrl}/posts/${postId}/comments/${commentId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Помилка під час видалення коментаря:", error);
    throw error;
  }
}