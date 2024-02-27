import { Outlet, useLocation } from "react-router-dom";
import { ProfileHeader } from "../components/Profile";
import FollowList from "../components/Profile/FollowList";

export default function Follow() {
  const location = useLocation();
  const userData = location.state.userData;

  return (
    <>
      <ProfileHeader follow='true' userData={userData}></ProfileHeader>
      <FollowList userData={userData}></FollowList>
      <Outlet></Outlet>
    </>
  );
}
