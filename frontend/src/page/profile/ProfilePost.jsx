import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";

export default function ProfilePost() {
  const [userPosts, setUserPosts] = useState([]);
  const changePost = useSelector(state => state.changePost)
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPosts(id);
        setUserPosts(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [changePost]);

  return (
    <ul>
      {!userPosts && <SkeletonPost></SkeletonPost>}
      {userPosts &&
        userPosts.length > 0 &&
        userPosts.map((item) => (
          <li key={item.id}>
            <PostCard postData={item}></PostCard>
          </li>
        ))}
      {userPosts && userPosts.length === 0 && <NoPosts elemName='постів'>Створіть цікавий пост, аби поділитися своїми думками чи спогадами з іншими. І коли ви це зробите, він з’явиться тут.</NoPosts>}
    </ul>
  );
}
