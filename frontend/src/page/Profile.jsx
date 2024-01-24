import { ProfileHeader, ProfileUsedInfo } from "../components/Profile";
import SwipeableList from "../components/Profile/SwipeableList";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const apiUrl = `http://localhost:5173/${id}`;

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const data = await setUserData(response.json());
      setUserData({
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705948024/rjh3ekihcveyrjj5qe3h.jpg",
        userScreensaver:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1706088899/yhtmn2doas2cp3nuhtbu.jpg",
        name: "AnnaRequest",
        lastName: "MatveevaRequest",
        bio: "ing elit. Vitae totam sintolor, sit amet consectetur adipisicing elit. Vitae totam sint, voluptatibus corporis quos debitis eaque cupiditate molestiae. Assumenda, ut.",
        login: "@userNameAnna",
        joiningDate: "серпень 2023",
        following: "2",
        followers: "5",
        location: "",
        website: "",
        birthDate: "2024-01-12",
        id: '4444444',
        postsNumber: '5',
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
      <ProfileHeader userData={userData}></ProfileHeader>
      <ProfileUsedInfo userData={userData} setUserData={setUserData}></ProfileUsedInfo>
      <SwipeableList></SwipeableList>
      <Outlet></Outlet>
    </>
  );
}
