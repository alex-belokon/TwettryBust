import { useEffect, useState } from "react";
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
  const userId = location.state.userId;

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
          <p className="follow__missingTitle">Looking for followers?</p>
          <span className="follow__missingText">
            When someone follows this account, they’ll show up here. Posting and
            interacting with others helps boost followers.
          </span>
        </div>
      )}
      {userFollowings &&
        userFollowings.map((userCard) => (
          <UserCard userCard={userCard} key={userCard.id}></UserCard>
        ))}
    </div>
  );
}
