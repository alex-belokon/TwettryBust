import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserData } from "../../../api/profile";
import { useSelector } from "react-redux";
import "./MessagesDialogHeader.style.scss";
import { avatarColor } from "../../../utils/avatarColor";

export default function MessagesDialogHeader({ interlocutorUserId }) {
  const [userData, setUserData] = useState(null);
  const currentUserId = useSelector((state) => state.user.user.id);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserData(interlocutorUserId, currentUserId);
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
        <Link to={`/profile/${userData.id}`} className="messagesDialogHeader">
          <span className="messagesDialogHeader__nameTop">
            {userData.firstName || "User"} {userData.lastName || ""}
          </span>

          {userData.avatar ? (
            <img
              className="messagesDialogHeader__img"
              src={userData.avatar}
              alt={userData.firstName}
            />
          ) : (
            <div className={`messagesDialogHeader__img ${avatarColor(userData.userName[0])}`}>{userData.userName[0]}</div>
          )}

          <h3 className="messagesDialogHeader__name">
            {`${userData.firstName || "User"} ${userData.lastName || ""}`}
          </h3>
          <span className="messagesDialogHeader__login">
            {userData.userName}
          </span>
          {userData.bio && (
            <p className="messagesDialogHeader__bio">{userData.bio}</p>
          )}
          {userData.createdAt && (
            <span className="messagesDialogHeader__joiningDate">
              Joined
              <span style={{marginLeft: '6px'}}>{new Date(userData.createdAt).toLocaleDateString()}</span>
            </span>
          )}
        </Link>
      </>
    )
  );
}
