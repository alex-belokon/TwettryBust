import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUsersFollowing } from "../api/profile";
import UserCard from "../components/UserCard/UserCard";
import SkeletonFollow from "../skeletons/SkeletonFollow";
import { useScrollToTop } from "../utils/useScrollToTop";
import './Follow.scss';

export default function Following() {
  const [userFollowings, setUserFollowings] = useState(null);
  useScrollToTop();
  const location = useLocation();
  const currentUserId = useSelector((state) => state.user.user.id);
  const userId = location.state.userData?.id || currentUserId;
  const { t } = useTranslation();

  useEffect(() => {
    getFollowings();
  }, []);

  async function getFollowings() {
    try {
      const data = await getUsersFollowing(userId);
      setUserFollowings(data);
    } catch {
      console.error("Following Error:", error);
    }
  }

  return (
    <div>
      {!userFollowings && <SkeletonFollow></SkeletonFollow>}
      {userFollowings && userFollowings.length === 0 && (
        <div className="follow__missingWrapper">
          <p className="follow__missingTitle">{t('profile.noFollowingTitle')}</p>
          <span className="follow__missingText">{t('profile.noFollowing')}</span>
        </div>
      )}
      {userFollowings &&
        userFollowings.map((userCard) => (
          <UserCard userCard={userCard} key={userCard.id}></UserCard>
        ))}
    </div>
  );
}
