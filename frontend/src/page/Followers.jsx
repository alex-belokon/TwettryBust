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
            name: "Olivia",
            lastName: "White",
            login: "@alex.j",
            userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663671/samples/animals/kitten-playing.gif",
            isFollows: true,
            bio: "Привіт! Я Olivia. Обожнюю подорожі та нові виклики. Давайте дружити!",
            id: 432109,
        },
        {
            name: "Jane",
            lastName: "Smith",
            login: "@emily.b",
            userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663685/samples/outdoor-woman.jpg",
            isFollows: false,
            bio: "Привіт, всім! Моє ім'я Емілі. Люблю читати та вивчати нові технології.",
            id: 876543,
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