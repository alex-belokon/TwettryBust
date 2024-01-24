import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


export default function FollowActions({following, followers}) {

  return (
    <div className="followActions">
      <Link className="followActions__link" to='/follow/following'><span className="followActions__number">{following}</span> Following</Link>
      <Link className="followActions__link" to='/follow/followers'><span className="followActions__number">{followers}</span> Follower</Link>
    </div>
  );
}


FollowActions.propTypes = {
  following: PropTypes.string,
  followers: PropTypes.string,
};