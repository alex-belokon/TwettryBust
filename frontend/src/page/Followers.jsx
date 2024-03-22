import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsersFollowers } from "../api/profile";
import BtnLoadMore from "../components/Buttons/BtnLoadMore/BtnLoadMore";
import UserCard from "../components/UserCard/UserCard";
import SkeletonFollow from "../skeletons/SkeletonFollow";
import { useScrollToTop } from "../utils/useScrollToTop";
import "./Follow.scss";

export default function Followers() {
  const [userFollowers, setUserFollowers] = useState(null);
  const location = useLocation();
  const userId = location.state.userData.id;
  const { t } = useTranslation();
  const [showArrow, setShowArrow] = useState(false);
  const [numberPage, setNumberPage] = useState(0);
  const navigate = useNavigate();
  useScrollToTop();

  useEffect(() => {
    getFollowers(0);
  }, []);

  async function getFollowers(number) {
    try {
      const data = await getUsersFollowers(userId, number);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setUserFollowers((prevState) =>number !== 0 ? [...prevState, ...data] : data);
    } catch {
      navigate("/error");
    }
  }

  function arrowClick() {
    getFollowers(numberPage + 1);
    setNumberPage((prevState) => prevState + 1);
  }

  return (
    <div>
      {!userFollowers && <SkeletonFollow></SkeletonFollow>}
      {userFollowers && userFollowers.length === 0 && (
        <div className="follow__missingWrapper">
          <p className="follow__missingTitle">
            {t("profile.noFollowersTitle")}
          </p>
          <span className="follow__missingText">
            {t("profile.noFollowers")}
          </span>
        </div>
      )}
      {userFollowers && (
        <>
          {userFollowers.map((userCard) => (
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
