import { useTranslation } from "react-i18next";

export default function UsersCommunity () {
  const { t } = useTranslation();

  return(
    <div className="sidebarWrapper">
      <h2>{t('sidebar.followGroups')}</h2>
      <ul>
        <li>UsersCommunity</li>
      </ul>
    </div>
  )
}