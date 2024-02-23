import { useEffect, useState } from "react";
import { getUsersPostsLikes } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import { useParams } from "react-router-dom";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";

export default function ProfileLikes() {
  const [likePosts, setLikePosts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersPostsLikes(id);
        console.log(data);
        setLikePosts(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <ul>
      {!likePosts && (
        <div className="skeletonPosts__wrapper">
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}

      {likePosts &&
        likePosts.length > 0 &&
        likePosts.map((item) => (
          <li key={item.id}>
            <PostCard postData={item}></PostCard>
          </li>
        ))}
      {likePosts && likePosts.length === 0 && (
        <NoPosts elemName="вподобань">
          Торкніться сердечка на пості, щоб уподобати його. Коли ви це зробите,
          він з’явиться тут.
        </NoPosts>
      )}
    </ul>
  );
}
