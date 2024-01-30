import { useEffect, useState } from "react";
import PostCard from "./PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/postSlice";
import "./Posts.scss";


export default function Posts({ isFollowingActive }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    getPosts();
  }, []);

  const url = "http://localhost:5173/";

  async function getPosts() {
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error("Error");
      }

      // const dataArr = await resp.json();

      const dataArr = [
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
      dispatch(setPosts(dataArr));
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  return (
    <div className="post-create-container">
      {isFollowingActive
        ? posts.map((postData) => (
            <PostCard postData={postData} key={postData.id} />
          ))
        : posts.map((postData) => (
            <PostCard postData={postData} key={postData.id} />
          ))}
    </div>
  );
}
