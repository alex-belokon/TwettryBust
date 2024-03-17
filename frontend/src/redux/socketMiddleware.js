import { getUserDialogs } from '../api/messages';
import { updateUserMessages } from './chatWebSocket';

const socketMiddleware = (stompClient) => (store) => {
  const userId = store.getState().authUser.user.id;

  stompClient.onConnect = async (frame) => {
    try {
      const data = await getUserDialogs(userId);
      const dialogsIds = data.map(elem => elem.id);
      dialogsIds.forEach(dialogId => {
        stompClient.subscribe(`/topic/chat/${dialogId}`, (message) => {
          const newDialog = JSON.parse(message.body);
          if (newDialog.senderId.id !== userId) {
            store.dispatch(updateUserMessages(newDialog));
          }
        });
      });
    } catch (error) {
      console.error('Error subscribing to chat topics:', error.message);
    }
  };

  return (next) => (action) => {
    next(action);
  };
};

export default socketMiddleware;