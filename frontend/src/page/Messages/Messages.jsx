import { useState } from "react";
import Header from "../../components/Header/Header";
import MessagesSection from "../../components/Messages/MessagesSection";
import SectionSearching from "../../components/Messages/SectionSearching";
import "./messages.style.scss";

export default function Messages() {
  const [lastMessage, setLastMessage] = useState('')

  return (
    <div className="messagesWrapper">
      <Header></Header>
      <div className="messagesMain">
        <SectionSearching></SectionSearching>
        <MessagesSection></MessagesSection>
      </div>
    </div>
  );
}
