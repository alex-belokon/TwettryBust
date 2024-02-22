import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserData } from "../../../api/profile";
import "./MessagesDialogHeader.style.scss";

export default function MessagesDialogHeader({interlocutorUserId}) {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserData(interlocutorUserId);
        setUserData(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  console.log(userData);

  return (
    userData && (
      <>
        <Link to={`/profile/${id}`} className="messagesDialogHeader">
          <span className="messagesDialogHeader__nameTop">
          {userData.firstName || 'User'} {userData.lastName || ''}
          </span>

          {userData.avatar ? (
            <img
              className="messagesDialogHeader__img"
              src={userData.avatar}
              alt={userData.firstName}
            />
          ) : (
            <div className="messagesDialogHeader__img"></div>
          )}

          <h3 className="messagesDialogHeader__name">
            {`${userData.firstName || 'User'} ${userData.lastName || ''}`}
          </h3>
          <span className="messagesDialogHeader__login">{userData.userName}</span>
          {userData.bio && <p className="messagesDialogHeader__bio">{userData.bio}</p>} 
          {userData.createdAt && <span className="messagesDialogHeader__joiningDate">
            Joined
            {userData.createdAt &&
              new Date(userData.createdAt).toLocaleDateString()}
          </span>} 
        </Link>
      </>
    )
  );
}
