import { useEffect, useState } from "react";
import { BsEnvelopePlus } from "react-icons/bs";
import Searching from "./Searching/Searching";
import ModalNewMessage from "../Modal/ModalNewMessage/ModalNewMessage";
import "./sectionSearching.style.scss";
import ChatLogs from "./ChatLogs/ChatLogs";
import { useParams } from "react-router-dom";

export default function SectionSearching() {
  const [isModalNewMessage, setIsModalNewMessage] = useState(false);
  const { id } = useParams();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isInputFocus, setIsInputFocus] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportWidth > 1030 ? (
    <section className="sectionSearching">
      <div className="sectionSearching__header">
        <h2 className="sectionSearching__title">Повідомлення</h2>
        <button
          className="sectionSearching__btnAddNewMessage"
          aria-label="open modal to create new message"
          onClick={() => setIsModalNewMessage(true)}
        >
          <BsEnvelopePlus />
        </button>
      </div>
      <Searching setIsInputFocus={setIsInputFocus} isInputFocus={isInputFocus}></Searching>
      <ChatLogs isInputFocus={isInputFocus}></ChatLogs>
      {isModalNewMessage && (
        <ModalNewMessage
          closeModal={() => setIsModalNewMessage(false)}
        ></ModalNewMessage>
      )}
    </section>
  ) : (
    viewportWidth < 1030 && !id && (
      <section className="sectionSearching">
        <div className="sectionSearching__header">
          <h2 className="sectionSearching__title">Повідомлення</h2>
          <button
            className="sectionSearching__btnAddNewMessage"
            aria-label="open modal to create new message"
            onClick={() => setIsModalNewMessage(true)}
          >
            <BsEnvelopePlus />
          </button>
        </div>
        <Searching placeholder="Search Direct Messages"></Searching>
        <ChatLogs></ChatLogs>
        {isModalNewMessage && (
          <ModalNewMessage
            closeModal={() => setIsModalNewMessage(false)}
          ></ModalNewMessage>
        )}
      </section>
    )
  );
}
