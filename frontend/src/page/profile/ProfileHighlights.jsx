import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserHighlights } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import { useTranslation } from "react-i18next";

export default function ProfileHighlights() {
  const [userHighlights, setUserHighlights] = useState(null);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserHighlights();
        setUserHighlights(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {userHighlights && (
        <div style={{ padding: "0 20px" }}>
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}
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
        <NoPosts elemName={t("profile.favorites")}>
          {t("profile.favoritesText")}
        </NoPosts>
      )}
    </>
  );
}
