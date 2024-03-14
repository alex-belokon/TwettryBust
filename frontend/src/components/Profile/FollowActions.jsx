import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function FollowActions({ following, followers, userData }) {
  const { t } = useTranslation();

  return (
    <div className="followActions">
      <Link
        className="followActions__link"
        to="/follow/following"
        state={{ userData: userData }}
      >
      <span className="followActions__number">{following}</span> {t('profile.following')}
      </Link>
      <Link
        className="followActions__link"
        to="/follow/followers"
        state={{ userData: userData }}
      >
        <span className="followActions__number">{followers}</span> {t('profile.followers')}
      </Link>
    </div>
  );
}

FollowActions.propTypes = {
  following: PropTypes.number,
  followers: PropTypes.number,
};
