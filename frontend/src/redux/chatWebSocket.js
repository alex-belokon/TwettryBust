import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const initialValues = {
  userMessages: [],
  isConnectWebSocket: false,
  unReadNotification: 0,
}

export const stompClient = new Client({
  brokerURL: "ws://localhost:9000/gs-guide-websocket",
});

const chatWebSocket = createSlice({
  name: 'chatWebSocket',
  initialState: initialValues,
  reducers: {
    updateUserMessages: (state, {payload}) => {
      return { ...state, userMessages: [...state.userMessages,  payload ] };
    },
    clearState: (state, {payload}) => {
      return { ...state, userMessages: payload };
    },
    newNotification: (state, {payload}) => {
      return { ...state, unReadNotification: state.unReadNotification + 1 };
    },
    notificationRead: (state, {payload}) => {
      return { ...state, unReadNotification: 0 };
    },
    sendDataChat: (state, { payload }) => {
      const {token} = JSON.parse(localStorage.getItem("persist:authUser"));
      stompClient.publish({
        destination: `/topic/chat/${payload.recipientId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: payload.content,
          chatId: payload.chatId,
          date: new Date,
          imageURL: null,
          senderId: {id: payload.senderId.id},
          isRead: false,
        })
      });
    },
    sendDataNotification: (state, { payload }) => {
      const { token } = JSON.parse(localStorage.getItem('persist:authUser'));

      stompClient.publish({
        destination: '/app/createNotification',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: payload.postId,
          sender: payload.sender,
          receiver: payload.receiver,
          notificationType: payload.notificationType,
        }),
      });
    },
  },
});

export const { updateUserMessages, sendDataChat, connectSuccessful, activateWebSocket, clearState, sendDataNotification, newNotification, notificationRead } = chatWebSocket.actions;
export const chatWebSocketReducer = chatWebSocket.reducer;