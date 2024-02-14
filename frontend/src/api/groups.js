import { baseUrl } from "./baseUrl";

export const getGroups = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/groups`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    const jsonResponse = [
      {
        id: 1,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663691/cld-sample-4.jpg",
        name: "Foodies United",
        description:
          "Долучайтеся до нашої групи та діліться улюбленими рецептами та кулінарними пригодами!",
        subscribersCount: 5200,
      },
      {
        id: 2,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample.jpg",
        name: "Pawsome Pet Lovers",
        description:
          "Ласкаво просимо до нашої спільноти тваринних любителів! Розповідайте про своїх пухнастиків та переживайте разом!",
        subscribersCount: 3800,
      },
      {
        id: 3,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663671/samples/animals/kitten-playing.gif",
        name: "Memelicious Moments",
        description:
          "Готові розважити свій день? Приєднуйтесь до нас і насолоджуйтеся найсмішнішими мемами та коміксами у мережі!",
        subscribersCount: 6200,
      },
    ];

    return jsonResponse;
  } catch (error) {
    console.error("Error fetch groups:", error.message);
  }
};

export const getGroupById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const groupData = await response.json();
    const groupData = [
      {
        id: 1,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663691/cld-sample-4.jpg",
        name: "Foodies United",
        description:
          "Долучайтеся до нашої групи та діліться улюбленими рецептами та кулінарними пригодами!",
        subscribersCount: 5200,
      },
      {
        id: 2,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample.jpg",
        name: "Pawsome Pet Lovers",
        description:
          "Ласкаво просимо до нашої спільноти тваринних любителів! Розповідайте про своїх пухнастиків та переживайте разом!",
        subscribersCount: 3800,
      },
      {
        id: 3,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663671/samples/animals/kitten-playing.gif",
        name: "Memelicious Moments",
        description:
          "Готові розважити свій день? Приєднуйтесь до нас і насолоджуйтеся найсмішнішими мемами та коміксами у мережі!",
        subscribersCount: 6200,
      },
    ];
    return groupData;
  } catch (error) {
    throw new Error(`Error fetching groupId data: ${error.message}`);
  }
};

export const getPostsGroup = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();

    let jsonResponse;
    if (id === "1") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date(),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663670/samples/food/spices.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date(),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date(),
          userLogin: "@login",
          reply: 12,
          repost: 0,
          likes: 10,
          view: 2,
          isInBookmark: true,
          id: 4,
        },
      ];
    } else if (id === "2") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/sheep.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "QQQQQ",
          userLastName: "QQQQQ",
          postDate: new Date(),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
          id: 2,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663659/samples/animals/cat.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date(),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
          id: 3,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663666/samples/animals/three-dogs.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date(),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
          id: 3,
        },
      ];
    } else if (id === "3") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "QQQQQ",
          userLastName: "QQQQQ",
          postDate: new Date(),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
          id: 2,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "QQQQQ",
          userLastName: "QQQQQ",
          postDate: new Date(),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
          id: 2,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663669/samples/ecommerce/accessories-bag.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date(),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
        },
      ];
    }

    return jsonResponse;
  } catch (e) {
    console.error("Error fetch user media:", e.message);
  }
};

export const getGroupTop = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups/${id}/top`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    let jsonResponse;
    //
    if (id === "1") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date("2023-01-13"),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
          id: 1,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663670/samples/food/spices.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date("2024-01-10"),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
          id: 2,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date("2024-02-08"),
          userLogin: "@login",
          reply: 12,
          repost: 0,
          likes: 10,
          view: 2,
          isInBookmark: true,
          id: 3,
        },
      ];
    } else if (id === "2") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/sheep.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "QQQQQ",
          userLastName: "QQQQQ",
          postDate: new Date("2024-02-13"),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
          id: 1,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663659/samples/animals/cat.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date("2024-02-03"),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
          id: 2,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663666/samples/animals/three-dogs.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date("2024-02-01"),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
          id: 3,
        },
      ];
    } else if (id === "3") { 
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "QQQQQ",
          userLastName: "QQQQQ",
          postDate: new Date("2024-02-13"),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
          id: 1,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "QQQQQ",
          userLastName: "QQQQQ",
          postDate: new Date("2024-02-11"),
          userLogin: "@login",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
          isInBookmark: true,
          id: 2,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663669/samples/ecommerce/accessories-bag.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
          userName: "userName",
          userLastName: "userLastName",
          postDate: new Date("2024-02-04"),
          userLogin: "@login",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
          isInBookmark: false,
          id: 3,
        },
      ];
    }
    return jsonResponse;
  } catch (e) {
    console.error("Error fetch user media:", e.message);
  }
};
export const getGroupLatest = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups/${id}/latest`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    let jsonResponse;
    //
     if (id === "1") {
       jsonResponse = [
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2023-01-13"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 1,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663670/samples/food/spices.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-01-10"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 2,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-08"),
           userLogin: "@login",
           reply: 12,
           repost: 0,
           likes: 10,
           view: 2,
           isInBookmark: true,
           id: 3,
         },
       ];
     } else if (id === "2") {
       jsonResponse = [
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/sheep.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "QQQQQ",
           userLastName: "QQQQQ",
           postDate: new Date("2024-02-13"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 1,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663659/samples/animals/cat.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-03"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 2,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663666/samples/animals/three-dogs.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-01"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 3,
         },
       ];
     } else if (id === "3") {
       jsonResponse = [
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "QQQQQ",
           userLastName: "QQQQQ",
           postDate: new Date("2024-02-13"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 1,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "QQQQQ",
           userLastName: "QQQQQ",
           postDate: new Date("2024-02-11"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 2,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663669/samples/ecommerce/accessories-bag.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-04"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 3,
         },
       ];
     }
    return jsonResponse;
  } catch (e) {
    console.error("Error fetch user media:", e.message);
  }
};
export const getGroupMedia = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups/${id}/media-group`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    let jsonResponse;
    if (id === "1") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663670/samples/food/spices.jpg",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg",
          reply: 12,
          repost: 0,
          likes: 10,
          view: 2,
        },
      ];
    } else if (id === "2") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/sheep.jpg",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663659/samples/animals/cat.jpg",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663666/samples/animals/three-dogs.jpg",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
        },
      ];
    } else if (id === "3") {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
          reply: 1,
          repost: 0,
          likes: 555,
          view: 10000,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663669/samples/ecommerce/accessories-bag.jpg",
          reply: 2,
          repost: 10,
          likes: 5,
          view: 10,
        },
      ];
    }

    return jsonResponse;
  } catch (e) {
    console.error("Error fetch user media:", e.message);
  }
};
export const getGroupAbout = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups/${id}/about`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    let jsonResponse;
    //
     if (id === "1") {
       jsonResponse = [
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2023-01-13"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 1,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663670/samples/food/spices.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-01-10"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 2,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-08"),
           userLogin: "@login",
           reply: 12,
           repost: 0,
           likes: 10,
           view: 2,
           isInBookmark: true,
           id: 3,
         },
       ];
     } else if (id === "2") {
       jsonResponse = [
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/sheep.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "QQQQQ",
           userLastName: "QQQQQ",
           postDate: new Date("2024-02-13"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 1,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663659/samples/animals/cat.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-03"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 2,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663666/samples/animals/three-dogs.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663662/samples/people/smiling-man.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-01"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 3,
         },
       ];
     } else if (id === "3") {
       jsonResponse = [
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "QQQQQ",
           userLastName: "QQQQQ",
           postDate: new Date("2024-02-13"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 1,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "QQQQQ",
           userLastName: "QQQQQ",
           postDate: new Date("2024-02-11"),
           userLogin: "@login",
           reply: 1,
           repost: 0,
           likes: 555,
           view: 10000,
           isInBookmark: true,
           id: 2,
         },
         {
           imgUrl:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663669/samples/ecommerce/accessories-bag.jpg",
           userScreensaver:
             "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg",
           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
           userName: "userName",
           userLastName: "userLastName",
           postDate: new Date("2024-02-04"),
           userLogin: "@login",
           reply: 2,
           repost: 10,
           likes: 5,
           view: 10,
           isInBookmark: false,
           id: 3,
         },
       ];
     }
    return jsonResponse;
  } catch (e) {
    console.error("Error fetch user media:", e.message);
  }
};
