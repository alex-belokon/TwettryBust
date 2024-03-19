import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUsersFollowing } from "../api/profile";
import BtnLoadMore from "../components/Buttons/BtnLoadMore/BtnLoadMore";
import UserCard from "../components/UserCard/UserCard";
import SkeletonFollow from "../skeletons/SkeletonFollow";
import { useScrollToTop } from "../utils/useScrollToTop";
import "./Follow.scss";

export default function Following() {
  const [userFollowings, setUserFollowings] = useState(null);
  useScrollToTop();
  const location = useLocation();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const userId = location.state.userData?.id || currentUserId;
  const { t } = useTranslation();
  const [showArrow, setShowArrow] = useState(false);
  const [numberPage, setNumberPage] = useState(0);

  useEffect(() => {
    getFollowings(0);
  }, []);

  async function getFollowings(number) {
    try {
      const data = await getUsersFollowing(userId, number);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setUserFollowings((prevState) =>
        number !== 0 ? [...prevState, ...data] : data
      );
    } catch {
      console.error("Following Error:", error);
    }
  }

  function arrowClick() {
    getFollowings(numberPage + 1);
    setNumberPage((prevState) => prevState + 1);
  }

  return (
    <div>
      {!userFollowings && <SkeletonFollow></SkeletonFollow>}
      {userFollowings && userFollowings.length === 0 && (
        <div className="follow__missingWrapper">
          <p className="follow__missingTitle">
            {t("profile.noFollowingTitle")}
          </p>
          <span className="follow__missingText">
            {t("profile.noFollowing")}
          </span>
        </div>
      )}
      {userFollowings && (
        <>
          {userFollowings.map((userCard) => (
            <UserCard userCard={userCard} key={userCard.id}></UserCard>
          ))}
          {showArrow && (
            <BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>
          )}
        </>
      )}
    </div>
  );
}
