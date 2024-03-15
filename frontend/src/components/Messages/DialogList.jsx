import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ModalDelMessage from "../Modal/ModalDelMessage/ModalDelMessage";
import { FaArrowDownLong } from "react-icons/fa6";
import { clearState } from "../../redux/chatWebSocket";

export default function DialogList({
  dialog,
  marginMessageList,
  currentUserId,
  setMessageList,
  setDialog,
}) {
  const messageList = useRef(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const newMessage = useSelector((state) => state.chatWebSocket.userMessages);
  const [dialogRender, setDialogRender] = useState(dialog);
  const [chatMessages, setChatMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    newMessage && setChatMessages(newMessage);
    // setMessageList(messageList.current.scrollHeight);
    // console.log(messageList.current.scrollHeight);
  }, [newMessage]);

  useEffect(() => {
    setDialogRender(dialog);
  }, [dialog]);

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
    setDialogRender((prevState) => [...prevState, ...chatMessages]);
    setDialog((prevState) => [...prevState, ...chatMessages]);
    dispatch(clearState());
  }

  return (
    <>
      <ul className="messagesDialogSection__messageList" ref={messageList}>
        {dialogRender &&
          dialogRender.map((item, index) =>
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
      {chatMessages.length !== 0 && (
        <div style={{ position: "relative" }}>
          <p className="chatMessages__newMessage">--------- Непрочитані повідомлення ---------</p>
          <ul
            className="messagesDialogSection__messageList"
            // ref={messageNewList}
          >
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
                  {new Date(item.date).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <button className="messagesDialog__arrow" onClick={scrollDown}>
            <FaArrowDownLong />
          </button>
        </div>
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
