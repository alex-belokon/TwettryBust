import { updateUserMessages } from './chatWebSocket';

const socketMiddleware = (stompClient) => (store) => {
  const userId = store.getState().authUser.user.id;

  if (userId) {
    stompClient.onConnect = async (frame) => {
      console.log(`/topic/chat/${userId}`);
      stompClient.subscribe(`/topic/chat/${userId}`, (message) => {
        const newDialog = JSON.parse(message.body);
        console.log(newDialog);
        store.dispatch(updateUserMessages(newDialog));
      })
      stompClient.subscribe(`/topic/notification/${userId}`, (message) => {
        const newDialog = JSON.parse(message.body);
        // store.dispatch(updateUserMessages(newDialog));
      })
    };
    stompClient.activate();
  }
  return (next) => (action) => {
    next(action);
  };
};

export default socketMiddleware;