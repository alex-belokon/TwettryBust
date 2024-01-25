import { useEffect, useState } from "react";
import UserMessageCard from "../UserMessageCard/UserMessageCard";

export default function ChatLogs() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats();
  }, []);

  const url = "";

  async function getChats() {
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error("Error");
      }

      // const data = await resp.json();
      const data = [
        {
          userData: {
            name: "Name",
            lastName: "LastName",
            login: "login",
            lastMessage: "wwwwwwww",
            dateOfLastMessage: "2024-01-22",
            userScreensaver:
              "https://sitis.com.ua/upload/medialibrary/121/Programmist_1c.jpg",
            id: 123456,
          },
          message: [
            {
              from: 123456,
              message: "Lorem ipsum dolor sit amet.",
              date: new Date(),
            },
            {
              from: 11111,
              message: "Lorem ipsum dolor sit amet.",
              date: new Date(),
            },
            {
              from: 123456,
              message: "Lorem ipsum dolor sit amet.",
              date: new Date(),
            },
          ],
        },
        {
          userData: {
            name: "Name2",
            lastName: "LastName2",
            login: "login2",
            lastMessage: "wwwwwwww2",
            dateOfLastMessage: "2023-01-5",
            userScreensaver:
              "https://sitis.com.ua/upload/medialibrary/121/Programmist_1c.jpg",
            id: 1234567,
          },
          message: [
            {
              from: 123456,
              message: "Lorem ipsum dolor sit amet.",
              date: new Date(),
            },
            {
              from: 11111,
              message: "Lorem ipsum dolor sit amet.",
              date: new Date(),
            },
            {
              from: 123456,
              message: "Lorem ipsum dolor sit amet.",
              date: new Date(),
            },
          ],
        },
      ];
      setChats(data);
      return data;
    } catch {
      console.error("Error:", error.message);
    }
  }

  return (
    <ul>
      {chats.map((elem) => (
        <UserMessageCard
          userData={elem.userData}
          key={elem.userData.login}
        ></UserMessageCard>
      ))}
    </ul>
  );
}


