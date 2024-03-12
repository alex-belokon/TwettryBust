import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toggleFollowGroup } from "../../api/groups";
import BtnFollowToggle from "../../components/Buttons/BtnFollowToggle/BtnFollowToggle";
import { avatarColor } from "../../utils/avatarColor";
import "./RecommendedCommunities.style.scss";

export default function RecommendedCommunities({ recommendedCommunities, closePopup, setRecommendedCommunities }) {
  

    // const [btnName, setBtnName] = useState(recommendedCommunities.following);
    // const currentUserId = useSelector((state) => state.authUser.user.id);

    // function toggleFollowGroupClick() {
    //   fetchToggleGroup();
    //   console.log("click")
    // }

    // async function fetchToggleGroup() {
    //   console.log(recommendedCommunities.id, currentUserId);
    //     try {
    //         await toggleFollowGroup(currentUserId, recommendedCommunities.id);
    //         filterFollow(recommendedCommunities.id);
    //         setBtnName(prevState => !prevState);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }




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
                