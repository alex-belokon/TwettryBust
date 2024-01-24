import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard/UserCard";
import { useScrollToTop } from "../utils/useScrollToTop";

export default function Followers(){
  const userId = useSelector((state) => state.authUser.user.id);
  const [userFollowers, setUserFollowers] = useState([])
  useScrollToTop();

  useEffect(()=>{
    getFollowers();
  }, [])

  const getFollowersUrl = `http://localhost:5173/${userId}`;

  async function getFollowers() {
    try {
      const response = await fetch(getFollowersUrl);

      if (!response.ok) {
        throw new Error("error");
      }
      // setUserFollowers(response.json());
      const users = [
        {
            name: "Alex",
            lastName: "Johnson",
            login: "@alex.j",
            userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
            isFollows: true,
            bio: "Привіт! Я Алекс. Обожнюю подорожі та нові виклики. Давайте дружити!",
            id: 23,
        },
        {
            name: "Emily",
            lastName: "Brown",
            login: "@emily.b",
            userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663689/samples/upscale-face-1.jpg",
            isFollows: false,
            bio: "Привіт, всім! Моє ім'я Емілі. Люблю читати та вивчати нові технології.",
            id: 33,
        },
    ];
    
      setUserFollowers(users);
    } catch {
      console.error("Following Error:", error);
    }
  }

  return (
    <div>
      {userFollowers.map((userCard) => (
        <UserCard userCard={userCard} key={userCard.id}></UserCard>
      ))}
    </div>
  );
}