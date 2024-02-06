import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Searching from '../components/Messages/Searching/Searching';
import "./layout.style.scss";

export default function Layout() {
  return (
    <div className="wrapper">
      <Header></Header>
      <main className="mainStyle">
        <div className="mainRibbon" aria-label="main ribbon">
          <Outlet></Outlet>
        </div>
        <div className="sidebarColumn">
          <Searching placeholder='Searching'></Searching>
        </div>
      </main>
    </div>
  );
}
