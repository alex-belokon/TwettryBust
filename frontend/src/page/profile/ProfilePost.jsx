import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../../api/profile";
import PostCard from "../../components/Posts/PostCard/PostCard";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import NoPosts from "./NoPosts";
import { useTranslation } from "react-i18next";
import "./ProfileMedia.scss";
import BtnLoadMore from "../../components/Buttons/BtnLoadMore/BtnLoadMore";

export default function ProfilePost() {
  const [userPosts, setUserPosts] = useState(null);
  const changePost = useSelector((state) => state.changePost);
  const { id } = useParams();
  const { t } = useTranslation();
  const [numberPage, setNumberPage] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    fetchData(0);
  }, [changePost, id]);

  const fetchData = async (number) => {
    try {
      const data = await getUserPosts(id, number);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setUserPosts((prevState) => number !== 0 ? [...prevState, ...data] : data);
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
      {!userPosts && (
        <div style={{padding: "0 20px"}}>
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}
      {userPosts && userPosts.length > 0 && (
        <>
          {userPosts.map((item) => (
            <li key={item.id}>
              <PostCard postData={item}></PostCard>
            </li>
          ))}
          {showArrow && <BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>}
        </>
      )}
      {userPosts && userPosts.length === 0 && (
        <NoPosts elemName={t("profile.noPosts")}>
          {t("profile.noPostsText")}
        </NoPosts>
      )}
    </ul>
  );
}
