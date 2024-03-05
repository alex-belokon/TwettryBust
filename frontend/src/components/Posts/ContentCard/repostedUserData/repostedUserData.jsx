import { useState } from "react";
import { useEffect } from "react";
import { getUserData } from "../../../../api/profile";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import UserAvatar from "../../../UserAvatar/UserAvatar";
import "./repostedUserData.scss";

export default function RepostedUserData({
  userPopupData,
  showRepostedUserData,
}) {
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (showRepostedUserData) {
      fetchData();
    }
  }, [userPopupData, showRepostedUserData]);

  const fetchData = async () => {
    try {
      const data = await getUserData(
        userPopupData.author.id,
        userPopupData.author.id
      );
      setUserData(data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  function formattedDate(data) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(data).toLocaleDateString("uk-UA", options);
  }

  return (
    <div className="repostedUserData__wrapper">
      <div className="repostedUserData__flex">
        <UserAvatar
          userName={userData?.userName}
          userAvatar={userData?.avatar}
        ></UserAvatar>
        <div>
          <p className="repostedUserData__name">
            {userData?.firstName} {userData?.lastName}
          </p>
          <p className="repostedUserData__name">{userData?.userName}</p>
        </div>
      </div>

      <p className="repostedUserData__bio">{userData?.bio}</p>
      {userData?.dateOfBirth && (
        <p className="profileInfo__date">
          <LiaBirthdayCakeSolid className="userProfile_icon" />
          <span style={{ margin: "0 5px" }}>{t("userProfile.birthday")}</span>
          {formattedDate(userData?.dateOfBirth)}
        </p>
      )}
      <div className="repostedUserData__flex">
        <p className="profileInfo__follow">{userData?.following} Following</p>
        <p className="profileInfo__follow">{userData?.followers} Followers</p>
      </div>
    </div>
  );
}
