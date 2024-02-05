import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserMessages } from "../../api/messages";
import MessageInput from "./MessageInput/MessageInput";
import MessagesDialogHeader from "./MessagesDialogHeader/MessagesDialogHeader";

export default function MessagesDialogSection() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [dialog, setDialog] = useState([]);
  const [marginMessageList, setMarginMessageList] = useState(45);
  const messageList = useRef(50);
  const messageContainer = useRef(0);

  useEffect(() => {
    if (messageList.current) {
      messageList.current.style.marginBottom = `${marginMessageList * 1.5}px`;
    }
  }, [marginMessageList]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserMessages(id, currentUserId);
        setDialog(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop = messageList.current.scrollHeight;
    }
  }, [dialog]);

  return (
    <div className="messagesDialogSection" ref={messageContainer}>
      <MessagesDialogHeader></MessagesDialogHeader>

      <ul className="messagesDialogSection__messageList" ref={messageList}>
        {dialog.map((item, index) =>
          item.userId === currentUserId ? (
            <li className="messagesDialogSection__message" key={index}>
              {item.message}
              {item.imgUrl && (
                <img
                  className="messagesDialog__img"
                  src={item.imgUrl}
                  alt="img"
                />
              )}
              <span className="messagesDialogSection__date">
                {new Date(item.date).toLocaleString()}
              </span>
            </li>
          ) : (
            <li className="messagesDialogSection__message--accent" key={index}>
              {item.message}
              {item.imgUrl && (
                <img
                  className="messagesDialog__img"
                  src={item.imgUrl}
                  alt="img"
                />
              )}
              <span className="messagesDialogSection__date">
                {new Date(item.date).toLocaleString()}
              </span>
            </li>
          )
        )}
      </ul>

      <MessageInput setMarginMessageList={setMarginMessageList}></MessageInput>
    </div>
  );
}
