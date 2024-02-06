import { useEffect, useState } from "react";
import PostCard from "./PostCard/PostCard";
import "./Posts.scss";
import { getPosts } from "../../api/posts";


export default function Posts({ isFollowingActive }) {
  const [posts, setPosts] = useState([]);
  const [urlParam, setUrlParam] = useState('forYou');

  useEffect(()=>{
    isFollowingActive ? setUrlParam('forYou') : setUrlParam('following');
  }, [isFollowingActive])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(urlParam);
        setPosts(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [isFollowingActive]);

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
