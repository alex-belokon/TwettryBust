import { getUserDialogs } from '../api/messages';
import { updateUserMessages } from './chatWebSocket';

const socketMiddleware = (stompClient) => (store) => {
  const userId = store.getState().authUser.user.id;

  if (userId) {
    stompClient.onConnect = async (frame) => {
      stompClient.subscribe(`/topic/chat/${userId}`, (message) => {
        const newDialog = JSON.parse(message.body);
        // if (newDialog.senderId.id !== userId) {
        store.dispatch(updateUserMessages(newDialog));
        // }
      })
    };
  }
  return (next) => (action) => {
    next(action);
  };
};

export default socketMiddleware;