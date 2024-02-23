import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDialogs } from "../../../api/messages";
import SkeletonMessage from "../../../skeletons/SkeletonMessage";
import UserMessageCard from "../UserMessageCard/UserMessageCard";
import { findUser } from "../../../api/profile";
import "./ChatLogs.scss";

export default function ChatLogs({ isInputFocus, searchingData, chats, setChats }) {
  const userId = useSelector((state) => state.authUser.user.id);
 
  useEffect(() => {
    async function fetchData() {
      if (searchingData && searchingData.trim() !== "") {
        try {
          const data = await findUser(searchingData);
          setChats(data);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const data = await getUserDialogs(userId);
          setChats(data);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [searchingData]);

  return (
    <>
      {chats && (
        <ul className="hatLogs__list">
          {chats.map((elem) => (
            <li key={elem.id}>
              <UserMessageCard userData={elem}></UserMessageCard>
            </li>
          ))}
        </ul>
      )}
      {isInputFocus && !chats &&(
        <p className="chatLogs__text">
          Спробуйте шукати людей, групи чи повідомлення
        </p>
      )}

       {!isInputFocus && !chats && (
        <SkeletonMessage></SkeletonMessage>
      )}
    </>
  );
}
