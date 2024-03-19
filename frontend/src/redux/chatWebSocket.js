import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const initialValues = {
  userMessages: [],
  isConnectWebSocket: false,
}

export const stompClient = new Client({
  brokerURL: "ws://localhost:9000/gs-guide-websocket",
});

const chatWebSocket = createSlice({
  name: 'chatWebSocket',
  initialState: initialValues,
  reducers: {
    connectSuccessful: (state) => {
      return { ...state, isConnectWebSocket: true };
    },
    updateUserMessages: (state, {payload}) => {
      return { ...state, userMessages: [...state.userMessages,  payload ] };
    },
    clearState: (state, {payload}) => {
      return { ...state, userMessages: payload };
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
          senderId: {id: payload.senderId.id}
        })
      });
    }
  },
});

export const { updateUserMessages, sendDataChat, connectSuccessful, activateWebSocket, clearState } = chatWebSocket.actions;
export const chatWebSocketReducer = chatWebSocket.reducer;