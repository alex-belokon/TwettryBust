import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import ModalEditProfile from "../Modal/ModalEditProfile/ModalEditProfile";

export default function ProfileUsedInfo() {
   const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const userData = {
    banner: 'https://thumbs.dreamstime.com/b/natural-tree-happy-imege-odisha-285126552.jpg',
    // banner: null,
    // userScreensaver: null,
    userScreensaver: 'https://sitis.com.ua/upload/medialibrary/121/Programmist_1c.jpg',
    name: "Name",
    lastName: "User",
    login: "@userName3333",
    joiningDate: "серпень 2023",
    following: "2",
    followers: "5",
  };

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
            {userData.userScreensaver 
              ?<img
                className="profile__screensaver"
                src={userData.userScreensaver}
                alt={userData.name + " photo"}
              />
              : <span>{`${userData.name}`.split('')[0]}</span>
            }
          </div>
          <button className="profile__btn" onClick={()=>setIsModalEditOpen(true)}>Редагувати профіль</button>
        </div>
        <h2 className="profileInfo__userName">
          {userData.name} {userData.lastName}{" "}
        </h2>
        <p className="profileInfo__userMail">{userData.login}</p>

        <p>
          <IoCalendarOutline />
          Дата приєднання: {userData.joiningDate}
        </p>

        <div>
          <p>{userData.following} Following</p>
          <p>{userData.followers} Followers</p>
        </div>
      </div>

    {isModalEditOpen && <ModalEditProfile closeModal={()=>setIsModalEditOpen(false)}></ModalEditProfile>}
    </>
  );
}
