import { updateUserMessages } from './chatWebSocket';

const socketMiddleware = (stompClient) => (store) => {
  stompClient.onConnect = (frame) => {
    stompClient.subscribe("/topic/chat", (message) => {
      const newMessage = JSON.parse(message.body);
      // if (newMessage.senderId.id !== currentUserId) {
        store.dispatch(updateUserMessages(newMessage));
      // }
    });
  };

  return (next) => (action) => {
    next(action);
  };
};

export default socketMiddleware;