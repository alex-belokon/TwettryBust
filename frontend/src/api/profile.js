import { baseUrl } from "./baseUrl";


export const getUserData = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/api/profile/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    const jsonResponse = {
      banner:
        "https://res.cloudinary.com/dfrps0cby/image/upload/v1706190879/x8zhatd7xeq0zo8hirrz.jpg",
      userScreensaver:
        "https://res.cloudinary.com/dfrps0cby/image/upload/v1706088899/yhtmn2doas2cp3nuhtbu.jpg",
      name: "AnnaRequest",
      lastName: "MatveevaRequest",
      bio: "ing elit. Vitae totam sintolor, sit amet consectetur adipisicing elit. Vitae totam sint, voluptatibus corporis quos debitis eaque cupiditate molestiae. Assumenda, ut.",
      login: "@userNameAnna",
      joiningDate: "серпень 2023",
      following: "2",
      followers: "5",
      location: "",
      website: "",
      birthDate: "2024-01-12",
      id: '4444444',
      postsNumber: '5',
    }

    return jsonResponse;
  } catch (error) {
    console.error('Error fetch user profile:', error.message);
  }
};

export const getUserPosts = async (userId) => {

  try {
    const response = await fetch(`${baseUrl}/api/profile/${userId}/posts`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    const jsonResponse = [
      {
        imgUrl:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1706292731/ronx3qzcgcif1loe6mor.jpg",
        userScreensaver:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
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

    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user posts:', e.message);
  }
}

export const getUserHighlights = async (userId) => {

  try {
    const response = await fetch(`${baseUrl}/api/profile/${userId}/highlights`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    const jsonResponse = [
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
    
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user highlights:', e.message);
  }
}

export const getUserMedia = async (userId) => {

  try {
    const response = await fetch(`${baseUrl}/api/profile/${userId}/highlights`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    const jsonResponse = [
      {
        imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663691/cld-sample-4.jpg',
        likes: 4,
        reply: 11,
        repost: 0,
        view: 100,
      },
      {
        imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample-2.jpg',
        likes: 52,
        reply: 1,
        repost: 6,
        view: 3,
      },
      {
        imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663688/samples/dessert-on-a-plate.jpg',
        likes: 5,
        reply: 1,
        repost: 0,
        view: 1000,
      },
      {
        imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663671/samples/landscapes/nature-mountains.jpg',
        likes: 7,
        reply: 1,
        repost: 8,
        view: 500,
      },
      {
        imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663682/samples/two-ladies.jpg',
        likes: 3,
        reply: 1,
        repost: 5,
        view: 9,
      },
    ];
    
    return jsonResponse;
  } catch (e) {
    console.error('Error fetch user media:', e.message);
  }
}