import SwipeableList from "../../components/Profile/SwipeableList";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileHeader, ProfileUsedInfo } from "../../components/Profile";
import { getUserData } from "../../api/profile";
import { useScrollToTop } from "../../utils/useScrollToTop";
import { useLocation } from 'react-router-dom';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  let location = useLocation();

  console.log(location.state?.flag);
  
  if (!location.state?.flag) {
    useScrollToTop();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(id);
        setUserData(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ProfileHeader userData={userData}></ProfileHeader>
      <ProfileUsedInfo
        userData={userData}
        setUserData={setUserData}
      ></ProfileUsedInfo>
      <SwipeableList></SwipeableList>
      <Outlet></Outlet>
    </>
  );
}
