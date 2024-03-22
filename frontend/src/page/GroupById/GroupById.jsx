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
import { useTranslation } from "react-i18next";
export default function GroupById() {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("id групи:", id);
  const [group, setGroup] = useState(null);
  const [openedGroupId, setOpenedGroupId] = useState(null);
  // const [isFollowing, setIsFollowing] = useState(false);
  const [btnISFollow, setBtnISFollowed] = useState(false);
  const { t } = useTranslation();
  async function toggleFollowGroupClick() {
    await fetchToggleGroup(id);
  }

  async function fetchToggleGroup(id) {
    console.log(id);
    try {
      const updatedGroupData = await toggleFollowGroup(id);
      console.log(updatedGroupData);
      setBtnISFollowed(!btnISFollow);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await getGroupById(id);
        console.log(groupData);
        setGroup(groupData);
        setBtnISFollowed(groupData.followed);
        setOpenedGroupId(id);
      } catch (error) {
        console.error("Помилка отримання даних групи:", error.message);
      }
    };

    fetchGroupData();
  }, [id]);
  console.log(group);
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
            {group.banner ? (
              <img src={group.banner} className="group__img" alt="group" />
            ) : (
              <div className="gray_background"></div>
            )}
            <div className="group__content">
              <h1 className="group__title">{group.name}</h1>
              <BtnFollowToggle
                toggleFollowClick={toggleFollowGroupClick}
                btnName={btnISFollow}
              />
            </div>
            <div className="group__info">
              <p className="group__description">{group.description}</p>
              <span className="group__members">
                <HiUserGroup />
                {formatNumber(group.membersCounts)} {t("navigation.users")}
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
