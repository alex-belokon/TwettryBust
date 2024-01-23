import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserCard from "../components/UserCard/UserCard";

export default function Following({ id }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const users = [
    {
      name: "John",
      lastName: "Doe",
      login: "@john.doe",
      userScreensaver: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663687/samples/man-portrait.jpg',
      isFollows: true,
      bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis repellat, aliquid quae impedit, voluptatum, recusandae aliquamLorem ipsum dolor sit amet',
      id: 2,
    },
    {
      name: "Jane",
      lastName: "Smith",
      login: "@jane.smith",
      userScreensaver: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample.jpg',
      isFollows: false,
      bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis repellat, aliquid quae impedit, voluptatum, recusandae aliquamLorem ipsum dolor sit amet',
      id: 3,
    },
  ];

  return (
    <div>
      {users.map((userCard) => (
        <UserCard userCard={userCard} key={userCard.id}></UserCard>
      ))}
    </div>
  );
}
