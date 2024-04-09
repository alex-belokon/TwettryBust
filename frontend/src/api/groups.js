import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";


export const createGroups = async (data, token) => {
  try {
    const response = await fetch(`${baseUrl}/api/communities/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,

      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonResponse = await response.json();


    return jsonResponse;
  } catch (error) {
    console.error("Error fetch groups:", error.message);
  }
};
export const getGroups = async () => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/?page=0&pageSize=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error fetch groups:", error.message);
  }
};
export const searchGroups = async () => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/?page=0&pageSize=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error("Error fetch groups:", error.message);
  }
};

export const toggleFollowGroup = async (id) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/toggle_participants?communityId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/hal+json",
          "Authorization": `Bearer ${token}`,

        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.log(e);
  }
};

export const getGroupById = async (id) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/${id}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const groupData = await response.json();
    return groupData;
  } catch (error) {
    throw new Error(`Error fetching groupId data: ${error.message}`);
  }
};

export const getGroupTop = async (id, page =0) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/${id}/posts?page=${page}&pageSize=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (e) {
    console.error("Error fetch user media:", e.message);
  }
};

export const deleteCommunitie = async (id) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/delete?communityId=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
      
    }
    return true;
  } catch (error) {
    console.error("Помилка під час видалення посту:", error);
    throw error;
  }
};

export const getUsersCommunitiesFollowed = async (page = 0) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/users/communities?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    console.error("Error fetch user media:", e.message);
  }
};
