import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LinkActions from "../components/LinkActions/LinkActions";
import { ProfileHeader } from "../components/Profile";

export default function Follow() {
  const location = useLocation();
  const userData = location.state ? location.state.userData : null;
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/error");
    }
  }, [userData, navigate]);

  const links = [
    { text: `${t("profile.following")}`, path: "/follow/following" },
    { text: `${t("profile.followers")}`, path: "/follow/followers" },
  ];

  return (
    <>
     {userData ? (
        <>
          <ProfileHeader follow="true" userData={userData}></ProfileHeader>
          <LinkActions userData={userData} linksArr={links}></LinkActions>
          <Outlet></Outlet>
        </>
      ) : null} 
    </>
  );
}
