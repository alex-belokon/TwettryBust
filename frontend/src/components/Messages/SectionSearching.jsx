import { useState } from "react";
import { BsEnvelopePlus } from "react-icons/bs";
import Searching from "./Searching/Searching";
import  ModalNewMessage from '../Modal/ModalNewMessage/ModalNewMessage';
import "./sectionSearching.style.scss";
import ChatLogs from "./ChatLogs/ChatLogs";


export default function SectionSearching() {
  const [isModalNewMessage, setIsModalNewMessage] = useState(false);

  


  return (
    <section className="sectionSearching">
      <div className="sectionSearching__header">
        <h2 className="sectionSearching__title">Повідомлення</h2>
        <button
          className="sectionSearching__btnAddNewMessage"
          aria-label="open modal to create new message"
          onClick={()=>setIsModalNewMessage(true)}
        >
          <BsEnvelopePlus />
        </button>
      </div>
      <Searching></Searching>
      <ChatLogs></ChatLogs>
      {isModalNewMessage && <ModalNewMessage closeModal = {()=>setIsModalNewMessage(false)}></ModalNewMessage>}
    </section>
  );
}
