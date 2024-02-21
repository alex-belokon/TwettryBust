import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function FollowActions({ following, followers, userId }) {

  return (
    <div className="followActions">
      <Link
        className="followActions__link"
        to="/follow/following"
        state={{ userId: userId }}
      >
      <span className="followActions__number">{following}</span> Following
      </Link>
      <Link
        className="followActions__link"
        to="/follow/followers"
        state={{ userId: userId }}

      >
        <span className="followActions__number">{followers}</span> Follower
      </Link>
    </div>
  );
}

FollowActions.propTypes = {
  following: PropTypes.number,
  followers: PropTypes.number,
};
