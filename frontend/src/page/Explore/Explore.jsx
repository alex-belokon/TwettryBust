import { Outlet } from "react-router-dom";
import ActionsLinkList from "../../components/ActionsLink/ActionsLinkList/ActionsLinkList";
import LinkActions from "../../components/LinkActions/LinkActions";

export default function Explore() {
  const links = [
    { text: "Communities", path: "/explore" },
    { text: "Users", path: "/explore/users" },
  ];

  return (
    <>
      <h2 className="explore__title">Explore</h2>
      <LinkActions linksArr={links}></LinkActions>
      <Outlet></Outlet>
    </>
  );
}
