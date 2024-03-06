import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getUsersFollowers } from "../api/profile";
import UserCard from "../components/UserCard/UserCard";
import SkeletonFollow from "../skeletons/SkeletonFollow";
import { useScrollToTop } from "../utils/useScrollToTop";
import "./Follow.scss";

export default function Followers() {
  const [userFollowers, setUserFollowers] = useState(null);
  useScrollToTop();
  const location = useLocation();
  const userId = location.state.userData.id;
  const { t } = useTranslation();

  useEffect(() => {
    getFollowers();
  }, []);

  async function getFollowers() {
    try {
      const data = await getUsersFollowers(userId);
      setUserFollowers(data);
    } catch {
      console.error("Followers Error:", error);
    }
  }

  return (
    <div>
      {!userFollowers && <SkeletonFollow></SkeletonFollow>}
      {userFollowers && userFollowers.length === 0 && (
        <div className="follow__missingWrapper">
          <p className="follow__missingTitle">{t('profile.noFollowersTitle')}</p>
          <span className="follow__missingText">{t('profile.noFollowers')}</span>
        </div>
      )}
      {userFollowers &&
        userFollowers.map((userCard) => (
          <UserCard userCard={userCard} key={userCard.id}></UserCard>
        ))}
    </div>
  );
}
