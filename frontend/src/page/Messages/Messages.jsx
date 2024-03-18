import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MessagesSection from "../../components/Messages/MessagesSection";
import SectionSearching from "../../components/Messages/SectionSearching";
import { Client } from "@stomp/stompjs";
import "./messages.style.scss";
import { useSelector } from "react-redux";


export default function Messages() {

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
