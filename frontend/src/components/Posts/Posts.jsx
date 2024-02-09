import { useEffect, useState } from "react";
import PostCard from "./PostCard/PostCard";
import "./Posts.scss";
import { getPosts } from "../../api/posts";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";

export default function Posts({ isFollowingActive }) {
  const [posts, setPosts] = useState(null);
  const [urlParam, setUrlParam] = useState("forYou");

  useEffect(() => {
    setPosts(null);
    isFollowingActive ? setUrlParam("forYou") : setUrlParam("following");
  }, [isFollowingActive]);

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
      {!posts && (
        <div className="skeletonPosts__wrapper">
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}
      {posts &&
        posts.map((postData) => (
          <PostCard postData={postData} key={postData.id} />
        ))}
    </div>
  );
}
