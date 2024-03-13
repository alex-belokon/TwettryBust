import { useEffect, useState } from "react";
import { BsEnvelopePlus } from "react-icons/bs";
import Searching from "./Searching/Searching";
import ModalNewMessage from "../Modal/ModalNewMessage/ModalNewMessage";
import "./sectionSearching.style.scss";
import ChatLogs from "./ChatLogs/ChatLogs";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SectionSearching({newMessage}) {
  const [isModalNewMessage, setIsModalNewMessage] = useState(false);
  const { id } = useParams();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchingData, setSearchingData] = useState('');
  const [chats, setChats] = useState(null);
  const [searchChats, setSearchChats] = useState(null);
  const { t } = useTranslation();
  const [dataToNavigate, setDataToNavigate] = useState (null);
  const navigate = useNavigate();

  useEffect(()=>{
    if (dataToNavigate) {
      navigate(`/messages/${dataToNavigate.chatId}`, { state: { interlocutorId: dataToNavigate.userId } });
    }
    setDataToNavigate(null)
  }, [dataToNavigate])

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    (viewportWidth > 1030 || (viewportWidth < 1030 && !id)) && (
      <section className="sectionSearching">
        <div className="sectionSearching__header">
          <h2 className="sectionSearching__title">{t("messages.title")}</h2>
          <button
            className="sectionSearching__btnAddNewMessage"
            aria-label="open modal to create new message"
            onClick={() => setIsModalNewMessage(true)}
          >
            <BsEnvelopePlus />
          </button>
        </div>
        <Searching
          placeholder={t("placeholder.text2")}
          setSearchChats={setSearchChats}
          searchingData={searchingData}
          setSearchingData={setSearchingData}
          setIsInputFocus={setIsInputFocus}
          isInputFocus={isInputFocus}
        ></Searching>
        <ChatLogs
          searchMessages
          searchChats={searchChats}
          setSearchChats={setSearchChats}
          setChats={setChats}
          chats={chats}
          isInputFocus={isInputFocus}
          searchingData={searchingData}
          newMessage={newMessage}
        ></ChatLogs>
        {isModalNewMessage && (
          <ModalNewMessage
            closeModal={() => setIsModalNewMessage(false)}
            setChats={setChats}
            chats={chats}
            setDataToNavigate={setDataToNavigate}
          ></ModalNewMessage>
        )}
      </section>
    )
  ); 
}
