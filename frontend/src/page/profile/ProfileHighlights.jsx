import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserHighlights } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import { useTranslation } from "react-i18next";

export default function ProfileHighlights() {
  const [userHighlights, setUserHighlights] = useState([]);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserHighlights(id);
        setUserHighlights(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {!userHighlights && <SkeletonPost></SkeletonPost>}
      {userHighlights && userHighlights.length > 0 && (
        <ul>
          {userHighlights.map((item) => (
            <li key={item.id}>
              <PostCard postData={item}></PostCard>
            </li>
          ))}
        </ul>
      )}
      {userHighlights && userHighlights.length === 0 && (
        <NoPosts elemName={t('profile.favorites')}>
          {t('profile.favoritesText')}
        </NoPosts>
      )}
    </>
  );
}
