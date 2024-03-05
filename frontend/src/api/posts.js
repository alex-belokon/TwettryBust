export const getPosts = async (queryParam, currentUserId) => {
  try {
    const url = queryParam === 'forYou' ? `http://localhost:9000/api/posts/?uid=${currentUserId}&page=0` : `http://localhost:9000/api/posts/followedUsersPosts?uid=${currentUserId}&page=0`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    console.log(jsonResponse);
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user media:', e.message);
  }
}

export const getCreatePost = async (data) => {
  try {
    const response = await fetch(`http://localhost:9000/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/posts/${postId}`, {
      method: "DELETE"
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
  try {
    const response = await fetch('http://localhost:9000/api/posts/like', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        postId: postId,
      }),
      headers: {
        "Content-Type": "application/json",
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
  try {
    const response = await fetch('http://localhost:9000/api/posts/favorite', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        postId: postId,
      }),
      headers: {
        "Content-Type": "application/json",
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

export const postCommentPost = async (postId, comment) => {
  try {
    const url = `http://localhost:9000/posts/${postId}/comments`;
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

    console.log(jsonResponse);
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user media:', e.message);
  }
}

export const deletePostComment = async (postId, commentId) => {
  try {
    const response = await fetch(`http://localhost:9000/posts/${postId}/comments/${commentId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
console.log('deletePostComment response:', response);
    return true;
  } catch (error) {
    console.error("Помилка під час видалення коментаря:", error);
    throw error;
  }
}