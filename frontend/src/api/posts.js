import { baseUrl } from "./baseUrl";


export const getPosts = async (queryParam) => {

  try {
    const response = await fetch(`${baseUrl}/api/profile/${queryParam}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();

    let jsonResponse;
    if (queryParam === 'forYou') {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1706292731/ronx3qzcgcif1loe6mor.jpg",
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
          id: 2,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663683/samples/balloons.jpg",
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
          id: 3,
        },
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663664/samples/bike.jpg",
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
    } else {
      jsonResponse = [
        {
          imgUrl:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/cup-on-a-table.jpg",
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
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663661/samples/food/fish-vegetables.jpg",
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
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663665/samples/people/jazz.jpg",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663660/samples/people/kitchen-bar.jpg",
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
    }
   
    
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user media:', e.message);
  }
};

