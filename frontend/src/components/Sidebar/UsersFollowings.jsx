import Following from "../../page/Following";
import { useTranslation } from "react-i18next";

export default function UsersFollowings () {
  const { t } = useTranslation();

  return(
    <div className="sidebarWrapper">
      <h2 className="sidebar__title">{t('sidebar.followUsers')}</h2>
      <Following></Following>
    </div>
  )
}