import { useEffect, useState } from "react";
import { getUsersPostsLikes } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import { useParams } from "react-router-dom";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import { useTranslation } from "react-i18next";
import "./ProfileMedia.scss";
import BtnLoadMore from "../../components/Buttons/BtnLoadMore/BtnLoadMore";

export default function ProfileLikes() {
  const [likePosts, setLikePosts] = useState(null);
  const { id } = useParams();
  const { t } = useTranslation();
  const [showArrow, setShowArrow] = useState(false);
  const [numberPage, setNumberPage] = useState(0);

  useEffect(() => {
    fetchData(0);
  }, [id]);

  const fetchData = async (number) => {
    try {
      const data = await getUsersPostsLikes(id, number);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setLikePosts((prevState) => number !== 0 ? [...prevState, ...data] : data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  function arrowClick () {
    fetchData(numberPage+1);
    setNumberPage((prevState) => prevState + 1);
  }

  return (
    <ul>
      {!likePosts && (
        <div style={{padding: "0 20px"}}>
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}

      {likePosts && likePosts.length > 0 && (
        <>
          {likePosts.map((item) => (
          <li key={item.id}>
            <PostCard postData={item}></PostCard>
          </li>
          ))}
           {showArrow && (
            <BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>
          )}
        </>
      )}
      {likePosts && likePosts.length === 0 && (
        <NoPosts elemName={t("profile.likes")}>
          {t("profile.likesText")}
        </NoPosts>
      )}
    </ul>
  );
}
