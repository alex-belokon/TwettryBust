import React from "react";
import "./Communities.style.scss";
import { HiUserGroup } from "react-icons/hi2";
import { formatNumber } from "../../utils/fromatNumber";
import { Link } from "react-router-dom";

export default function CommunitiCard({ group, onClick }){
  return (
    <div className="communitiCard">
    <Link to = {`/communities/${group.id}`} className="communities__item" onClick={onClick}>
      <img src={group.banner} className="communities__img" alt="group" />
      <p className="communities__name">
        {group.name}
        <br />
        <HiUserGroup />
        <span className="postCard__stats">
          {formatNumber(group.subscribersCount)}
        </span>
      </p>
      </Link>
    </div>
  );
};

