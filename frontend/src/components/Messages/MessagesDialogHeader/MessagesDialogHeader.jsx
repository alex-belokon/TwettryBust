import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MessagesDialogHeader.style.scss";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function MessagesDialogHeader({ interlocutorUser }) {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    setUserData(interlocutorUser);
  }, [id, interlocutorUser]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    userData && (
      <>
        <Link to={`/profile/${userData.id}`} className="messagesDialogHeader">
          <div className="messagesDialogHeader__nameTop">
            {viewportWidth < 1030 && (
              <Link to={`/messages`} className="messagesDialogHeader__arrow">
                <IoIosArrowRoundBack className="profileHeader__btn" />
              </Link>
            )}
            <span className="messagesDialogHeader__nameTopText">
              {userData.firstName || userData.username}{" "}
              {userData.lastName || ""}
            </span>
          </div>
          <UserAvatar
            size="middle"
            userName={userData?.userName || userData?.username}
            userAvatar={userData.avatar}
          ></UserAvatar>
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
              <span style={{ marginLeft: "6px" }}>
                {new Date(userData.createdAt).toLocaleDateString()}
              </span>
            </span>
          )}
        </Link>
      </>
    )
  );
}
