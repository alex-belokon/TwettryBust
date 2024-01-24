import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard/UserCard";
import { useScrollToTop } from "../utils/useScrollToTop";

export default function Following() {
  const userId = useSelector((state) => state.authUser.user.id);
  const [userFollowings, setUserFollowings] = useState([]);

  useScrollToTop();

  useEffect(() => {
    getFollowings();
  }, []);

  const getFollowingsUrl = `http://localhost:5173/${userId}`;

  async function getFollowings() {
    try {
      const response = await fetch(getFollowingsUrl);

      if (!response.ok) {
        throw new Error("error");
      }
      // setUserFollowings(response.json());
      const users = [
        {
          name: "John",
          lastName: "Doe",
          login: "@john.doe",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg",
          isFollows: true,
          bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis repellat, aliquid quae impedit, voluptatum, recusandae aliquamLorem ipsum dolor sit amet",
          id: 2,
        },
        {
          name: "Jane",
          lastName: "Smith",
          login: "@jane.smith",
          userScreensaver:
            "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample.jpg",
          isFollows: false,
          bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis repellat, aliquid quae impedit, voluptatum, recusandae aliquamLorem ipsum dolor sit amet",
          id: 3,
        },
      ];
      setUserFollowings(users);
    } catch {
      console.error("Following Error:", error);
    }
  }

  return (
    <div>
      {userFollowings.map((userCard) => (
        <UserCard userCard={userCard} key={userCard.id}></UserCard>
      ))}
    </div>
  );
}
