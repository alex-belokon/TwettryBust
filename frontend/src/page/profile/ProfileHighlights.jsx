import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserHighlights } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import { useTranslation } from "react-i18next";
import BtnLoadMore from "../../components/Buttons/BtnLoadMore/BtnLoadMore";

export default function ProfileHighlights() {
  const [userHighlights, setUserHighlights] = useState(null);
  const { id } = useParams();
  const { t } = useTranslation();
  const [numberPage, setNumberPage] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    fetchData(0);
  }, [id]);

  const fetchData = async (number) => {
    try {
      const data = await getUserHighlights(number);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setUserHighlights((prevState) => number !== 0 ? [...prevState, ...data] : data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  function arrowClick () {
    fetchData(numberPage+1);
    setNumberPage((prevState) => prevState + 1);
  }

  return (
    <>
      {!userHighlights && (
        <div style={{ padding: "0 20px" }}>
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}
      {userHighlights && userHighlights.length > 0 && (
        <>
          <ul>
            {userHighlights.map((item) => (
              <li key={item.id}>
                <PostCard postData={item}></PostCard>
              </li>
            ))}
          </ul>
          {showArrow && (
            <BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>
          )}
        </>
      )}
      {userHighlights && userHighlights.length === 0 && (
        <NoPosts elemName={t("profile.favorites")}>
          {t("profile.favoritesText")}
        </NoPosts>
      )}
    </>
  );
}
