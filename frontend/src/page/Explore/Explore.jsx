import { Outlet } from "react-router-dom";
import ActionsLinkList from "../../components/ActionsLink/ActionsLinkList/ActionsLinkList";
import LinkActions from "../../components/LinkActions/LinkActions";
import { useTranslation } from "react-i18next";
export default function Explore() {
  const { t } = useTranslation();
  const links = [
    { text: "Communities", path: "/explore" },
    { text: "Users", path: "/explore/users" },
  ];

  return (
    <>
      <h2 className="explore__title">{t("navigation.explore")}</h2>
      <LinkActions linksArr={links}></LinkActions>
      <Outlet></Outlet>
    </>
  );
}
