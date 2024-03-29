import React, { useState } from "react";
import "./Communities.style.scss";
import { HiUserGroup } from "react-icons/hi2";
import { formatNumber } from "../../utils/fromatNumber";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteCommunitie } from "../../api/groups";

export default function CommunitiCard({ group }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCommunitie(group.id);
      setIsDeleting(true);
    } catch (error) {
      console.error("Error fetching group data:", error.message);
    }
  };
console.log(group)
  return (
    <div className="communitiCard">
      {!isDeleting && (
        <>
          <Link to={`/communities/${group.id}`} className="communities__item">
            {group.banner ? (
              <img
                src={group.banner}
                className="communities__img"
                alt="group"
              />
            ) : (
              <div className="gray-background"></div>
            )}
            <p className="communities__name">
              {group.name}
              <br />
              <HiUserGroup />
              <span className="postCard__stats">
                {formatNumber(group.membersCounts)}
              </span>
            </p>
          </Link>
          <button
            className="delete__communitie"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <AiOutlineDelete />
          </button>
        </>
      )}
    </div>
  );
}
