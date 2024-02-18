import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserData } from "../../../api/profile";
import "./MessagesDialogHeader.style.scss";

export default function MessagesDialogHeader() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserData(id);
        setUserData(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  return (
    userData && (
      <>
        <Link to={`/profile/${id}`} className="messagesDialogHeader">
          <span className="messagesDialogHeader__nameTop">
          {userData.firstName || 'User'} {userData.lastName || ''}
          </span>

          {userData.userScreensaver ? (
            <img
              className="messagesDialogHeader__img"
              src={userData.userScreensaver}
              alt={userData.firstName}
            />
          ) : (
            <div className="messagesDialogHeader__img"></div>
          )}

          <h3 className="messagesDialogHeader__name">
            {`${userData.firstName || 'User'} ${userData.lastName || ''}`}
          </h3>
          <span className="messagesDialogHeader__login">{userData.userName}</span>
          <p className="messagesDialogHeader__bio">{userData.bio}</p>
          <span className="messagesDialogHeader__joiningDate">
            Joined
            {userData.createdAt &&
              new Date(userData.createdAt).toLocaleDateString()}
          </span>
        </Link>
      </>
    )
  );
}
