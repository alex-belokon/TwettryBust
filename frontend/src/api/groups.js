import { userToken } from "../utils/userToken";
import { baseUrl } from "./baseUrl";

export const createGroups = async (data,token) => {
  // const token = JSON.parse(userToken());
  // console.log(token)
  try {
   
    const response = await fetch(
      `${baseUrl}/api/communities/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonResponse = await response.json();
     console.log("З сервера:", jsonResponse);
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
  console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Error fetch groups:", error.message);
  }
};
export const searchGroups = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/?page=0&pageSize=10`
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
export const toggleFollowGroup = async (currentUserId, followGroupId) => {
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/toggle_participants`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/hal+json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          // userId: currentUserId,   //id отримується з token
          communityId: followGroupId,
        }),
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
  try {
    const response = await fetch(`${baseUrl}/api/communities/${id}`,//{id}?id=
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const groupData = await response.json();
    console.log(groupData);

    return groupData;
  } catch (error) {
    throw new Error(`Error fetching groupId data: ${error.message}`);
  }
};
export const getGroupTop = async (id, page = 0,) => {// currentUserId
  console.log(id);
  const token = JSON.parse(userToken());
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/${id}/posts?page=${page}&pageSize=10`,//&currentUserId=${currentUserId}
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
    console.log(jsonResponse);
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
console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Помилка під час видалення посту:", error);
    throw error;
  }
};
