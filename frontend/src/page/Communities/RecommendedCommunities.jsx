import { Link } from "react-router-dom";
import BtnFollowToggle from "../../components/Buttons/BtnFollowToggle/BtnFollowToggle";
import { avatarColor } from "../../utils/avatarColor";
import "./RecommendedCommunities.style.scss";
export default function RecommendedCommunities({ recommendedCommunities, closePopup, setRecommendedCommunities }) {

  function filterFollow(userId) {
        const filteredCommunities = recommendedCommunities.filter(
            (elem) => elem.id !== userId
        );
        setRecommendedCommunities(filteredCommunities);
    }

    return (
      <>
        {recommendedCommunities && (
          <div className="recommendCommunities__wrapper">
            <Link
              to={`/communities/${recommendedCommunities.id}`}
              className="recommendCommunities__link"
              onClick={closePopup}
            >
              <div
                className="recommendCommunities__avatar"
                style={{
                  backgroundColor: avatarColor(recommendedCommunities.name),
                }}
              >
                {recommendedCommunities.name[0].toUpperCase()}
              </div>
              <div className="recommendCommunities__name">
                {recommendedCommunities.name}
              </div>
            </Link>
            <BtnFollowToggle
              btnName={btnName}
              toggleFollowClick={toggleFollowGroupClick}
            />
          </div>
        )}
      </>
    );
}
                