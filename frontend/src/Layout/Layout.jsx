import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import './layout.style.scss'

export default function Layout() {
  return (
    <div className="wrapper">
      <Header></Header>
      <main className="mainStyle">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
