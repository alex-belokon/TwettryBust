import { useEffect, useState } from "react";
import { getUsersPostsLikes } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import { useParams } from "react-router-dom";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import { useTranslation } from "react-i18next";

export default function ProfileLikes() {
  const [likePosts, setLikePosts] = useState(null);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersPostsLikes(id);
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
        <div style={{padding: "0 20px"}}>
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
        <NoPosts elemName={t('profile.likes')}> {t('profile.likesText')}</NoPosts>
      )}
    </ul>
  );
}
