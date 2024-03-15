import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MessagesSection from "../../components/Messages/MessagesSection";
import SectionSearching from "../../components/Messages/SectionSearching";
import { Client } from "@stomp/stompjs";
import "./messages.style.scss";
import { useSelector } from "react-redux";


export default function Messages() {
  // const [newMessage, setNewMessage] = useState([]);
  const newMessage = useSelector(state =>state.chatWebSocket.userMessages);

  useEffect(() => {
    console.log(newMessage);
  }, [newMessage]);
    // const stompClient = new Client({
    //   brokerURL: "ws://localhost:9000/gs-guide-websocket",
    // });

    // stompClient.onConnect = (frame) => {
    //   console.log(frame);
    //   stompClient.subscribe("/topic/chat", (message) => {
    //     console.log(message);
    //     setNewMessage(message)
    //   });
    // };

    // stompClient.onWebSocketError = (error) => {
    //   console.error("Error with websocket", error);
    // };

    // stompClient.onStompError = (frame) => {
    //   console.error("Broker reported error: " + frame.headers["message"]);
    //   console.error("Additional details: " + frame.body);
    // };

    // function sendName() {
    //   stompClient.publish({
    //     destination: "/topic/chat",
    //     body: JSON.stringify({ name: "name" }),
    //   });
    // }

    // function disconnect() {
    //   stompClient.deactivate();
    //   console.log("Disconnected");
    // }
  
    // // stompClient.activate();

    // // return () => {
    // //   disconnect();
    // // };





  return (
    <div className="messagesWrapper">
      <Header></Header>
      <div className="messagesMain">
        <SectionSearching newMessage={newMessage}></SectionSearching>
        <MessagesSection></MessagesSection>
      </div>
    </div>
  );
}
