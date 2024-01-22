import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import ModalEditProfile from "../Modal/ModalEditProfile/ModalEditProfile";
import FollowActions from "./FollowActions";

export default function ProfileUsedInfo() {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const { t } = useTranslation();

  const apiUrl = "http://localhost:5173/";

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const data = await setUserData(response.json());
      setUserData({
        banner:
          "https://thumbs.dreamstime.com/b/natural-tree-happy-imege-odisha-285126552.jpg",
        userScreensaver:
          "https://sitis.com.ua/upload/medialibrary/121/Programmist_1c.jpg",
        name: "Name",
        lastName: "User",
        bio: "ing elit. Vitae totam sintolor, sit amet consectetur adipisicing elit. Vitae totam sint, voluptatibus corporis quos debitis eaque cupiditate molestiae. Assumenda, ut.",
        login: "@userName3333",
        joiningDate: "серпень 2023",
        following: "2",
        followers: "5",
        location: "",
        website: "",
        birthDate: "2024-01-12",
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="profile__banner">
        {userData.banner && (
          <img
            className="profile__bannerImg"
            src={userData.banner}
            alt="user banner"
          />
        )}
      </div>
      <div className="profileInfo">
        <div className="profileInfo__photoWrapper">
          <div className="profile__userScreensaver">
            {userData.userScreensaver ? (
              <img
                className="profile__screensaver"
                src={userData.userScreensaver}
                alt={userData.name + " photo"}
              />
            ) : (
              <span>{`${userData.name}`.split("")[0]}</span>
            )}
          </div>
          <button
            className="profile__btn"
            onClick={() => setIsModalEditOpen(true)}
          >
            {t("btn.editProfile")}
          </button>
        </div>
        <h2 className="profileInfo__userName">
          {userData.name} {userData.lastName}{" "}
        </h2>
        <p className="profileInfo__userMail">{userData.login}</p>
        <p className="profileInfo__bio">{userData.bio}</p>
        <p className="profileInfo__date">
          <IoCalendarOutline className="icon" />
          {t("userProfile.joined")} {userData.joiningDate}
        </p>

        <FollowActions
          following={userData.following}
          followers={userData.followers}
        ></FollowActions>
 
      </div>

      {isModalEditOpen && (
        <ModalEditProfile
          userData={userData}
          setUserData={setUserData}
          closeModal={() => setIsModalEditOpen(false)}
        ></ModalEditProfile>
      )}
    </>
  );
}
