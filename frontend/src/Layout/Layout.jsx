import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import UsersCommunity from "../components/Sidebar/UsersCommunity";
import UsersFollowings from "../components/Sidebar/UsersFollowings";
import "./layout.style.scss";

export default function Layout() {
  const { pathname } = useLocation();

  const renderSidebarContent = () => {
    if (pathname === '/explore') {
      return <UsersCommunity></UsersCommunity>;
    } else if (pathname === '/explore/users') {
      return <UsersFollowings></UsersFollowings>;
    } else {
      return <Sidebar />;
    }
  };


  return (
    <div className="wrapper">
      <Header></Header>
      <main className="mainStyle">
        <div className="mainRibbon" aria-label="main ribbon">
          <Outlet></Outlet>
        </div>
        <div className="sidebarColumn">
          {renderSidebarContent()}
        </div>
      </main>
    </div>
  );
}
