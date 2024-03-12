import { t } from "i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import { useTranslation } from "react-i18next";

export default function ProfilePost() {
  const [userPosts, setUserPosts] = useState(null);
  const changePost = useSelector((state) => state.changePost);
  const { id } = useParams();
  const { t } = useTranslation();

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
  }, [changePost, id]);

  return (
    <ul>
      {!userPosts && (
        <div style={{padding: "0 20px"}}>
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}
      {userPosts &&
        userPosts.length > 0 &&
        userPosts.map((item) => (
          <li key={item.id}>
            <PostCard postData={item}></PostCard>
          </li>
        ))}
      {userPosts && userPosts.length === 0 && (
        <NoPosts elemName={t('profile.noPosts')}>
          {t('profile.noPostsText')}
        </NoPosts>
      )}
    </ul>
  );
}
