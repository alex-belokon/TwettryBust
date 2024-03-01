import { useTranslation } from "react-i18next";
import "./PostBtn.scss";

export default function PostBtn({ isFollowingActive, setIsFollowingActive }) {
  const { t } = useTranslation();

  return (
    <div className="post-selector-container">
      <button
        className={`post-selector__btn ${isFollowingActive ? "" : "activeTab"}`}
        onClick={() => setIsFollowingActive(false)}
      >
        {t("home.forYouTitle")}
      </button>
      <button
        className={`post-selector__btn ${isFollowingActive ? "activeTab" : ""}`}
        onClick={() => setIsFollowingActive(true)}
      >
        {t("home.followingTitle")}
      </button>
    </div>
  );
}
