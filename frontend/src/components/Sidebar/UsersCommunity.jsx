import { useTranslation } from "react-i18next";
import "./Sidebar.scss";
import RecommendedGroups from "./Recommended/RecommendedCommunities";
export default function UsersCommunity () {
  const { t } = useTranslation();

  return (
    <div className="sidebarWrapper">
      <h2 className="sidebar__title">{t("sidebar.followGroups")}</h2>
     <RecommendedGroups/>
    </div>
  );
}