import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ModalDelMessage from "../Modal/ModalDelMessage/ModalDelMessage";
import { FaArrowDownLong } from "react-icons/fa6";
import { clearState } from "../../redux/chatWebSocket";
import { useTranslation } from "react-i18next";
import { countingTime } from "../../utils/countingTime";

export default function DialogList({
  dialog,
  marginMessageList,
  currentUserId,
  setMessageList,
  setDialog,
  chatMessages,
}) {
  const messageList = useRef(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (messageList.current) {
      messageList.current.style.marginBottom = `${marginMessageList * 1.5}px`;
      setMessageList(messageList.current.scrollHeight);
    }
  }, [marginMessageList, dialog]);

  function deleteBtn(id, item) {
    setMessageId(id);
    setIsModalOpen(true);
  }

  function scrollDown() {
    setMessageList(messageList.current.scrollHeight);
    messageList.current.scrollTop = messageList;
    setDialog((prevState) => [...prevState, ...chatMessages]);
    dispatch(
      clearState(
        chatMessages.filter((elem) => elem.chatId !== dialog[0].chatId)
      )
    );
  }

  return (
    <>
      <ul className="messagesDialogSection__messageList" ref={messageList}>
        {dialog &&
          dialog.map((item, index) =>
            item.senderId.id === currentUserId ? (
              <li
                className="messagesDialogSection__message--accent"
                key={index}
              >
                <button
                  className="messagesDialogSection__delBtn--accent"
                  onClick={() => deleteBtn(item.id, item)}
                >
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
                { countingTime(item.date) }
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
                  { countingTime(item.date) }
                </span>
              </li>
            )
          )}

        {chatMessages.length !== 0 && (
          <div style={{ position: "relative" }}>
            <p className="chatMessages__newMessage">
              ---------  {t("messages.newMessage")} ---------
            </p>
            <button className="messagesDialog__arrow" onClick={scrollDown}>
              <FaArrowDownLong />
            </button>
          </div>
        )}
      </ul>
      {chatMessages.length !== 0 && (
        <ul className="messagesDialogSection__messageList messagesDialogSection__messageList--margin">
          {chatMessages.map((item, index) => (
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
                { countingTime(item.date) }
              </span>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <ModalDelMessage
          setDialog={setDialog}
          dialog={dialog}
          setMessageId={setMessageId}
          messageId={messageId}
          closeModal={() => setIsModalOpen(false)}
        ></ModalDelMessage>
      )}
    </>
  );
}
