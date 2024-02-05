import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDialogs } from "../../../api/messages";
import UserMessageCard from "../UserMessageCard/UserMessageCard";

export default function ChatLogs() {
  const [chats, setChats] = useState([
    {
      name: "Anonymous",
      lastName: "Guest",
      login: "user_doe",
      lastMessage: "No recent messages",
      dateOfLastMessage: "2023-01-5",
      userScreensaver: "https://example.com/default_profile.jpg",
      id: 123456,
    },
  ]);
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
    <ul>
      {chats.map((elem) => (
        <li key={elem.id}>
          <UserMessageCard userData={elem}></UserMessageCard>
        </li>
      ))}
    </ul>
  );
}
