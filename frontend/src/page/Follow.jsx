import { Outlet } from "react-router-dom";
import { ProfileHeader } from "../components/Profile";
import FollowList from "../components/Profile/FollowList";

export default function Follow() {
  
  return (
    <>
      <ProfileHeader follow='true'></ProfileHeader>
      <FollowList></FollowList>
      <Outlet></Outlet>
    </>
  );
}
