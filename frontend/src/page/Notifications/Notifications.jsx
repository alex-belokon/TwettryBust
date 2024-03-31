import { Outlet } from "react-router-dom";
import ActionsLinkList from "../../components/ActionsLink/ActionsLinkList/ActionsLinkList";
import "./Notification.scss"

export default function Notifications() {
  const tabList = [
    { text: "All", path: "/notifications" },
    { text: "Mentions", path: "/notifications/mentions/" },
  ];
  
  return (
    <section>
      <div className="sectionSearching__header">
        <h2 className="sectionSearching__title">Notifications</h2>
      </div>
      <ActionsLinkList linkList={tabList} />
      <Outlet />
    </section>
  );
}
