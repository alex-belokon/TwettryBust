export const getUserBookmarks = async (currentUserId) => {
  try {
    const url = `http://localhost:9000/api/posts/favoredBy?uid=${currentUserId}&page=0`;
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
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user media:', e.message);
  }
}

