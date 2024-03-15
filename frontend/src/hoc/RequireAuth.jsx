import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { activateWebSocket, updateUserMessages } from "../redux/chatWebSocket";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";

export default function RequireAuth({ children }) {
  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn);
  const dispatch = useDispatch();
  const isConnect = useSelector((state) => state.chatWebSocket.isConnectWebSocket);
  const currentUserId = useSelector((state) => state.authUser.user.id);

  if (!isLoggedIn) {
    return <Navigate to="/authorization"></Navigate>;
  }

  useEffect(() => {
    if (!isConnect) {
      stompClient.activate();
    }
  }, [isConnect]);

  const stompClient = new Client({
    brokerURL: "ws://localhost:9000/gs-guide-websocket",
  });

  stompClient.onConnect = (frame) => {
    stompClient.subscribe("/topic/chat", (message) => {
      const newMessage = JSON.parse(message.body);
      if (newMessage.senderId.id !== currentUserId) {
        dispatch(updateUserMessages(newMessage));
      }
    });
  };

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
