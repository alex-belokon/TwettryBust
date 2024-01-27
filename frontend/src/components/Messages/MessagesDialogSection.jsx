import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MessagesDialogHeader from "./MessagesDialogHeader/MessagesDialogHeader";

export default function MessagesDialogSection() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [dialog, setDialog] = useState([]);

  useEffect(() => {
    getUserDialog();
  }, []);

  const url = `http://localhost:5173/messages/${id}-${currentUserId}`;

  async function getUserDialog() {
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error("Error");
      }

      // const data = await resp.json();
      const data = [
        {
          userId: "4444444",
          message:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, odio!",
          date: new Date(),
        },
        {
          userId: "123456",
          message:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, odio!",
          date: new Date(),
        },
        {
          userId: "123456",
          message:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, odio!",
          date: new Date(),
        },
        {
          userId: "4444444",
          message:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, odio!",
          date: new Date(),
        },
        {
          userId: "4444444",
          message:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, odio!",
          date: new Date(),
        },
        {
          userId: "123456",
          message:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, odio! Lorem ipsum dolor, sit amet c",
          date: new Date(),
        },
        {
          userId: "123456",
          message:
            "Lorem ipsum dolor, sit amet !",
          date: new Date(),
        },
      ];
      setDialog(data);
    } catch (error) {
      console.error("Error fetching dialog:", error);
    }
  }

  return (
    <div className="messagesDialogSection">
      <MessagesDialogHeader></MessagesDialogHeader>
      <ul className="messagesDialogSection__messageList">
        {dialog.map((item, index) =>
          item.userId === currentUserId ? (
            <li className="messagesDialogSection__message" key={index}>{item.message} <span className="messagesDialogSection__date">{new Date(item.date).toLocaleString()}</span></li>
          ) : (
            <li className="messagesDialogSection__message--accent" key={index}>{item.message} <span className="messagesDialogSection__date">{new Date(item.date).toLocaleString()}</span></li>
          )
        )}
      </ul>
    </div>
  );
}
