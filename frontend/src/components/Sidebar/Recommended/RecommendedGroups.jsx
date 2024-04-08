import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUsersCommunitiesFollowed,
  toggleFollowGroup,
} from "../../../api/groups";
import BtnFollowToggle from "../../Buttons/BtnFollowToggle/BtnFollowToggle";
import "./RecommendedGroups.scss";

export default function RecommendedGroups() {
  const { id } = useParams();
  const [recommendedGroups, setRecommendedGroups] = useState([]);
  const [btnFollowed, setBtnFollowed] = useState({});
  useEffect(() => {
    async function fetchRecommendedGroups() {
      try {
        const groups = await getUsersCommunitiesFollowed();

        const initialFollowedState = groups.reduce((acc, group) => {
          return { ...acc, [group.id]: false };
        }, {});
        setBtnFollowed(initialFollowedState);
        setRecommendedGroups(groups);
      } catch (error) {
        console.error("Помилка отримання рекомендованих груп:", error);
      }
    }
    fetchRecommendedGroups();
  }, []);
  async function toggleFollowed(groupId) {
    await fetchToggleFollowed(groupId);
  }
  async function fetchToggleFollowed(groupId) {
    try {
      const dataGroup = await toggleFollowGroup(groupId);

      setBtnFollowed((prevBtnFollowed) => ({
        ...prevBtnFollowed,
        [groupId]: !prevBtnFollowed[groupId],
      }));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="recommend">
      <ul>
        {recommendedGroups.map((group) => (
          <li key={group.id} className="recommend__list">
            <Link to={`/groups/${group.id}`}>
              {group.banner ? (
                <img src={group.banner} className="recommend__img" alt="group" />) : (
                <div className="recommend__placeholder"></div>
              )}

            </Link>
            <p>{group.name}</p>
            <BtnFollowToggle
              className="recommend__btn"
              toggleFollowClick={() => toggleFollowed(group.id)}
              btnName={!btnFollowed[group.id]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
