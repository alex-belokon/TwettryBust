import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const userId = location.state.userId;
  
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
          <p className="follow__missingTitle">Be in the know</p>
          <span className="follow__missingText">
            Following accounts is an easy way to curate your timeline and know
            what’s happening with the topics and people you’re interested in.
          </span>
        </div>
      )}
      {userFollowers &&
        userFollowers.map((userCard) => (
          <UserCard userCard={userCard} key={userCard.id}></UserCard>
        ))}
    </div>
  );
}
