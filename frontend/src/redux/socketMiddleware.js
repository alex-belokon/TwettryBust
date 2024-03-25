import { newNotification, updateUserMessages } from './chatWebSocket';

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
      stompClient.subscribe(`${userId}/topic/notification/`, (message) => {
        const newDialog = JSON.parse(message.body); console.log(message);
        // store.dispatch(updateUserMessages(newDialog));
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