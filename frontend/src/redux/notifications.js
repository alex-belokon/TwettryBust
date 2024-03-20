import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const initialValues = {
  notification: [],
  isConnectWebSocket: false,
}

export const stompClient = new Client({
  brokerURL: "ws://localhost:9000/gs-guide-websocket",
});

const notificationWebSocket = createSlice({
  name: 'notificationWebSocket',
  initialState: initialValues,
  reducers: {
    connectSuccessful: (state) => {
      return { ...state, isConnectWebSocket: true };
    },
    updateUserMessages: (state, {payload}) => {
      return { ...state, notification: [...state.notification,  payload ] };
    },
    clearState: (state, {payload}) => {
      return { ...state, notification: payload };
    },
    sendDataNotification: (state, { payload }) => {
      const {token} = JSON.parse(localStorage.getItem("persist:authUser"));
      stompClient.publish({
        destination: `/topic/createNotification`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId: payload.postId,
          sender: payload.sender,
          notificationType: payload.notificationType,
        })
      });
    }
  },
});

export const { updateUserMessages, sendDataNotification, connectSuccessful, activateWebSocket, clearState } = notificationWebSocket.actions;
export const notificationWebSocketReducer = notificationWebSocket.reducer;