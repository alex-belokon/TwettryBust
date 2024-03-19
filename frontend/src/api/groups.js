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
          userId: currentUserId,   //id отримується з token
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
    const response = await fetch(`${baseUrl}/api/communities/{id}?id=${id}`,
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
export const getGroupTop = async (id, page = 0, currentUserId) => {
  console.log(id);
  try {
    const response = await fetch(
      `${baseUrl}/api/communities/${id}/posts?page=${page}&pageSize=10&currentUserId=${currentUserId}`,
      {
        method: "GET",

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
// export const getGroupLatest = async (id) => {
//   try {
//     const response = await fetch(`/api/groups/${id}/latest`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const jsonResponse = await response.json();
  
//     return jsonResponse;
//   } catch (e) {
//     console.error("Error fetch user media:", e.message);
//   }
// };
// export const getGroupMedia = async (id) => {
//   try {
//     const response = await fetch(`/api/groups/${id}/media-group`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // const jsonResponse = await response.json();
//     let jsonResponse;
//     if (id === "1") {
//       jsonResponse = [
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
//           reply: 1,
//           repost: 0,
//           likes: 555,
//           view: 10000,
//         },
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663670/samples/food/spices.jpg",
//           reply: 2,
//           repost: 10,
//           likes: 5,
//           view: 10,
//         },
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg",
//           reply: 12,
//           repost: 0,
//           likes: 10,
//           view: 2,
//         },
//       ];
//     } else if (id === "2") {
//       jsonResponse = [
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/sheep.jpg",
//           reply: 1,
//           repost: 0,
//           likes: 555,
//           view: 10000,
//         },
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663659/samples/animals/cat.jpg",
//           reply: 2,
//           repost: 10,
//           likes: 5,
//           view: 10,
//         },
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663666/samples/animals/three-dogs.jpg",
//           reply: 2,
//           repost: 10,
//           likes: 5,
//           view: 10,
//         },
//       ];
//     } else if (id === "3") {
//       jsonResponse = [
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
//           reply: 1,
//           repost: 0,
//           likes: 555,
//           view: 10000,
//         },
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
//           reply: 1,
//           repost: 0,
//           likes: 555,
//           view: 10000,
//         },
//         {
//           imgUrl:
//             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663669/samples/ecommerce/accessories-bag.jpg",
//           reply: 2,
//           repost: 10,
//           likes: 5,
//           view: 10,
//         },
//       ];
//     }

//     return jsonResponse;
//   } catch (e) {
//     console.error("Error fetch user media:", e.message);
//   }
// };
// export const getGroupAbout = async (id) => {
//   try {
//     const response = await fetch(`/api/groups/${id}/about`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // const jsonResponse = await response.json();
//     let jsonResponse;
//     //
//      if (id === "1") {
//        jsonResponse = [
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "userName",
//            userLastName: "userLastName",
//            postDate: new Date("2023-01-13"),
//            userLogin: "@login",
//            reply: 1,
//            repost: 0,
//            likes: 555,
//            view: 10000,
//            isInBookmark: true,
//            id: 1,
//          },
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663670/samples/food/spices.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "userName",
//            userLastName: "userLastName",
//            postDate: new Date("2024-01-10"),
//            userLogin: "@login",
//            reply: 2,
//            repost: 10,
//            likes: 5,
//            view: 10,
//            isInBookmark: false,
//            id: 2,
//          },
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "userName",
//            userLastName: "userLastName",
//            postDate: new Date("2024-02-08"),
//            userLogin: "@login",
//            reply: 12,
//            repost: 0,
//            likes: 10,
//            view: 2,
//            isInBookmark: true,
//            id: 3,
//          },
//        ];
//      } else if (id === "2") {
//        jsonResponse = [
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/sheep.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "QQQQQ",
//            userLastName: "QQQQQ",
//            postDate: new Date("2024-02-13"),
//            userLogin: "@login",
//            reply: 1,
//            repost: 0,
//            likes: 555,
//            view: 10000,
//            isInBookmark: true,
//            id: 1,
//          },
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663659/samples/animals/cat.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "userName",
//            userLastName: "userLastName",
//            postDate: new Date("2024-02-03"),
//            userLogin: "@login",
//            reply: 2,
//            repost: 10,
//            likes: 5,
//            view: 10,
//            isInBookmark: false,
//            id: 2,
//          },
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663666/samples/animals/three-dogs.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "userName",
//            userLastName: "userLastName",
//            postDate: new Date("2024-02-01"),
//            userLogin: "@login",
//            reply: 2,
//            repost: 10,
//            likes: 5,
//            view: 10,
//            isInBookmark: false,
//            id: 3,
//          },
//        ];
//      } else if (id === "3") {
//        jsonResponse = [
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "QQQQQ",
//            userLastName: "QQQQQ",
//            postDate: new Date("2024-02-13"),
//            userLogin: "@login",
//            reply: 1,
//            repost: 0,
//            likes: 555,
//            view: 10000,
//            isInBookmark: true,
//            id: 1,
//          },
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "QQQQQ",
//            userLastName: "QQQQQ",
//            postDate: new Date("2024-02-11"),
//            userLogin: "@login",
//            reply: 1,
//            repost: 0,
//            likes: 555,
//            view: 10000,
//            isInBookmark: true,
//            id: 2,
//          },
//          {
//            imgUrl:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663669/samples/ecommerce/accessories-bag.jpg",
//            userScreensaver:
//              "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
//            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
//            userName: "userName",
//            userLastName: "userLastName",
//            postDate: new Date("2024-02-04"),
//            userLogin: "@login",
//            reply: 2,
//            repost: 10,
//            likes: 5,
//            view: 10,
//            isInBookmark: false,
//            id: 3,
//          },
//        ];
//      }
//     return jsonResponse;
//   } catch (e) {
//     console.error("Error fetch user media:", e.message);
//   }
// };

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
