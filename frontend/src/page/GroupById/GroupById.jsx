import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./GroupById.style.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { getGroupById, toggleFollowGroup } from "../../api/groups";
import { HiUserGroup } from "react-icons/hi2";
import { formatNumber } from "../../utils/fromatNumber";
import SkeletonCommunitiesPage from "../../skeletons/SkeletonCommunitiesPage/SkeletonCommunitiesPage";
import SwipeableListGroup from "./SwipeableListGroup";
import BtnFollowToggle from "../../components/Buttons/BtnFollowToggle/BtnFollowToggle";
import { useSelector } from "react-redux";
export default function GroupById() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [openedGroupId, setOpenedGroupId] = useState(null);
// const [btnName, setBtnName] = useState(recommendedCommunities.following);
const currentUserId = useSelector((state) => state.authUser.user.id);
   function toggleFollowGroupClick() {
     fetchToggleGroup();
     console.log("click");
   }

   async function fetchToggleGroup() {
    //  console.log(recommendedCommunities.id, currentUserId);
    //  try {
    //    await toggleFollowGroup(currentUserId, recommendedCommunities.id);
    //    filterFollow(recommendedCommunities.id);
    //    setBtnName((prevState) => !prevState);
    //  } catch (e) {
    //    console.log(e);
    //  }
   }
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await getGroupById(id);

        const selectedGroup = groupData.find(
          (item) => item.id === parseInt(id)
        );

        setGroup(selectedGroup);
        setOpenedGroupId(id);
        console.log(groupData);
      } catch (error) {
        console.error("Error fetching group data:", error.message);
      }
    };

    fetchGroupData();
  }, [id]);

  return (
    <>
      {!group && <SkeletonCommunitiesPage />}
      {group && id === openedGroupId && (
        <div className="group">
          <div className="group__header">
            <IoIosArrowRoundBack
              className="profileHeader__btn"
              onClick={() => navigate(-1)}
            />
            <h3>{group.name}</h3>
          </div>
          <div key={group.id} className="group__item">
            <img src={group.banner} className="group__img" alt={group.name} />
            <div className="group__content">
              <h1 className="group__title">{group.name}</h1>
              <BtnFollowToggle
                // btnName={btnName}
                toggleFollowClick={toggleFollowGroupClick}
              />
            </div>
            <div className="group__info">
              <p className="group__description">{group.description}</p>

              <span>
                <HiUserGroup />
                {formatNumber(group.subscribersCount)} Members
              </span>
            </div>
          </div>
          <SwipeableListGroup />
          <Outlet></Outlet>
        </div>
      )}
    </>
  );
}
