import { Outlet } from "react-router-dom";
import LinkActions from "../../components/LinkActions/LinkActions";
import { useTranslation } from "react-i18next";
import { useScrollToTop } from "../../utils/useScrollToTop";

export default function Explore() {
  const { t } = useTranslation();
  useScrollToTop();
  const links = [
    { text: t("navigation.communities"), path: "/explore" },
    { text: t("navigation.users"), path: "/explore/users" },
  ];

  return (
    <>
      <h2 className="explore__title">{t("navigation.explore")}</h2>
      <LinkActions linksArr={links}></LinkActions>
      <Outlet></Outlet>
    </>
  );
}
