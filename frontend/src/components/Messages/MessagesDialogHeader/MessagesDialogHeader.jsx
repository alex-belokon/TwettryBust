import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MessagesDialogHeader.style.scss";

export default function MessagesDialogHeader() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);


  const url = `http://localhost:5173/messages/${id}`;

  async function getUser() {
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error("Error");
      }

      // const data = await resp.json();
      const data = {
        name: "Jane",
        lastName: "Smith",
        login: "@jane.smith",
        userScreensaver:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample.jpg",
        isFollows: false,
        bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis repellat, aliquid quae impedit, voluptatum, recusandae aliquamLorem ipsum dolor sit amet",
        joiningDate: new Date(),
        id: 3,
      };
      setUserData(data);
    } catch (error) {
      console.error("Error fetching dialog:", error);
    }
  }

  return (
    <Link to={`/profile/${id}/posts`} className="messagesDialogHeader">
        <span className="messagesDialogHeader__nameTop">
          {userData.name + " " + userData.lastName}
        </span>
        <img
          className="messagesDialogHeader__img"
          src={userData.userScreensaver}
          alt={userData.name}
        />
        <h3 className="messagesDialogHeader__name">
          {userData.name + " " + userData.lastName}
        </h3>
        <span className="messagesDialogHeader__login">{userData.login}</span>
        <p className="messagesDialogHeader__bio">{userData.bio}</p>
        <span className="messagesDialogHeader__joiningDate">
          Joined {userData.joiningDate && new Date(userData.joiningDate).toLocaleDateString()}
        </span>
    </Link>
  );
}
