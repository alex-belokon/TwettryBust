import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalDelMessage from "../Modal/ModalDelMessage/ModalDelMessage";

export default function DialogList({
  dialog,
  marginMessageList,
  currentUserId,
  setMessageList,
  setDialog
}) {
  const messageList = useRef(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageId, setMessageId] = useState(null);

  useEffect(() => {
    if (messageList.current) {
      messageList.current.style.marginBottom = `${marginMessageList * 1.5}px`;
      setMessageList(messageList.current.scrollHeight);
    }
  }, [marginMessageList, dialog]);


  function deleteBtn (id, item) {
    setMessageId(id);
    setIsModalOpen(true);
  }

  return (
    <>
      <ul className="messagesDialogSection__messageList" ref={messageList}>
        {dialog && dialog.map((item, index) =>
          item.senderId.id === currentUserId ? (
            <li className="messagesDialogSection__message--accent" key={index}>
              <button className="messagesDialogSection__delBtn--accent" onClick={()=>deleteBtn(item.id, item)}>
                <RiDeleteBin6Line />
              </button>
              <p dangerouslySetInnerHTML={{ __html: item.content }} />
              {item.imageURL && (
                <img
                  className="messagesDialog__img"
                  src={item.imageURL}
                  alt="img"
                />
              )}
              <span className="messagesDialogSection__date">
                {new Date(item.date).toLocaleString()}
              </span>
            </li>
          ) : (
            <li className="messagesDialogSection__message" key={index}>
              <p dangerouslySetInnerHTML={{ __html: item.content }} />
              {item.imageURL && (
                <img
                  className="messagesDialog__img"
                  src={item.imageURL}
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
      {isModalOpen && <ModalDelMessage setDialog={setDialog} dialog={dialog} setMessageId={setMessageId} messageId={messageId} closeModal={() => setIsModalOpen(false)}></ModalDelMessage>}
    </>
  );
}
