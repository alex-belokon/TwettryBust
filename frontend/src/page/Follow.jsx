import { Outlet, useLocation } from "react-router-dom";
import { ProfileHeader } from "../components/Profile";
import FollowList from "../components/Profile/FollowList";

export default function Follow() {
  const location = useLocation();
  const userId = location.state.userId;

  return (
    <>
      <ProfileHeader follow='true'></ProfileHeader>
      <FollowList userId={userId}></FollowList>
      <Outlet></Outlet>
    </>
  );
}
