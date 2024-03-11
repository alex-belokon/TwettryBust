import SwipeableList from "../../components/Profile/SwipeableList";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileHeader, ProfileUsedInfo } from "../../components/Profile";
import { getUserData } from "../../api/profile";
import { useScrollToTop } from "../../utils/useScrollToTop";
import { useLocation } from "react-router-dom";
import SkeletonProfile from "../../skeletons/SkeletonProfile/SkeletonProfile";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  useScrollToTop(!location.state?.flag);

  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      const data = await getUserData(id);
      setUserData(data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  return (
    <>
      {userData && (
        <>
          <ProfileHeader userData={userData}></ProfileHeader>
          <ProfileUsedInfo
            userData={userData}
            setUserData={setUserData}
          ></ProfileUsedInfo>
          <SwipeableList></SwipeableList>
          <Outlet></Outlet>
        </>
      )}

      {!userData && <SkeletonProfile></SkeletonProfile>}
    </>
  );
}
