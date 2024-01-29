export const addSubscriber = async (subscriber) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriber),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error('Error during fetch:', error.message);
  }
};
