import { newNotification, updateUserMessages } from './chatWebSocket';

const socketMiddleware = (stompClient) => (store) => {
  const userId = store.getState().authUser.user.id;

  if (userId) {
    stompClient.onConnect = async (frame) => {
      stompClient.subscribe(`/topic/chat/${userId}`, (message) => {
        const newDialog = JSON.parse(message.body);
        store.dispatch(updateUserMessages(newDialog));
      })
      stompClient.subscribe('/topic/notifications', (message) => {
        const notification = JSON.parse(message.body); 
      
        if (notification.body.receiver === userId) {
          store.dispatch(newNotification())
        }
      });
    };
    stompClient.activate();
  }
  return (next) => (action) => {
    next(action);
  };
};

export default socketMiddleware;