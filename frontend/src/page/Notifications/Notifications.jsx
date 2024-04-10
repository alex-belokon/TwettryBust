import { Outlet } from "react-router-dom";
import ActionsLinkList from "../../components/ActionsLink/ActionsLinkList/ActionsLinkList";
import "./Notification.scss"
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t, i18n } = useTranslation();
  const navigation1 = t("notification.navigation1");
  const tabList = [
    { text: navigation1, path: "/notifications"},
    { text: t("notification.navigation2"), path: "/notifications/mentions/" },
  ];
  
  return (
    <section>
      <div className="sectionSearching__header">
        <h2 className="sectionSearching__title">{t("notification.title")}</h2>
      </div>
      <ActionsLinkList linkList={tabList} />
      <Outlet />
    </section>
  );
}
