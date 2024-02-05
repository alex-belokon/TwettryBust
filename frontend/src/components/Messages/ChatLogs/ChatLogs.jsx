import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDialogs } from "../../../api/messages";
import UserMessageCard from "../UserMessageCard/UserMessageCard";
import './ChatLogs.scss';

export default function ChatLogs({ isInputFocus }) {
  const [chats, setChats] = useState(null);
  const userId = useSelector((state) => state.authUser.user.id);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserDialogs(userId);
        setChats(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {!isInputFocus && chats && (
        <ul>
          {chats.map((elem) => (
            <li key={elem.id}>
              <UserMessageCard userData={elem}></UserMessageCard>
            </li>
          ))}
        </ul>
      )}
       {isInputFocus && (
        <p className="chatLogs__text">Спробуйте шукати людей, групи чи повідомлення</p>
      )}
    </>
  );
}
