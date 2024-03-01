import { Outlet, useLocation } from "react-router-dom";
import LinkActions from "../components/LinkActions/LinkActions";
import { ProfileHeader } from "../components/Profile";

export default function Follow() {
  const location = useLocation();
  const userData = location.state.userData;
  const links = [
    { text: "Following", path: "/follow/following" },
    { text: "Followers", path: "/follow/followers" },
  ];

  return (
    <>
      <ProfileHeader follow="true" userData={userData}></ProfileHeader>
      <LinkActions userData={userData} linksArr={links}></LinkActions>
      <Outlet></Outlet>
    </>
  );
}
