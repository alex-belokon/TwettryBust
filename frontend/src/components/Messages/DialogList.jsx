import { useEffect } from "react";
import { useRef } from "react";

export default function DialogList({
  dialog,
  marginMessageList,
  currentUserId,
  setMessageList,
}) {
  const messageList = useRef(50);

  useEffect(() => {
    if (messageList.current) {
      messageList.current.style.marginBottom = `${marginMessageList * 1.5}px`;
      setMessageList(messageList.current.scrollHeight);
    }
  }, [marginMessageList, dialog]);

  return (
    <ul className="messagesDialogSection__messageList" ref={messageList}>
      {dialog.map((item, index) =>
        item.userId === currentUserId ? (
          <li className="messagesDialogSection__message--accent" key={index}>
            <p dangerouslySetInnerHTML={{ __html: item.message }} />
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
          <li className="messagesDialogSection__message" key={index}>
            <p dangerouslySetInnerHTML={{ __html: item.message }} />
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
  );
}
