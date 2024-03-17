import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const initialValues = {
  userMessages: [],
  isConnectWebSocket: false,
}

export const stompClient = new Client({
  brokerURL: "ws://localhost:9000/gs-guide-websocket",
});
stompClient.activate();


const chatWebSocket = createSlice({
  name: 'chatWebSocket',
  initialState: initialValues,
  reducers: {
    connectSuccessful: (state) => {
      return { ...state, isConnectWebSocket: true };
    },
    updateUserMessages: (state, action) => {
      return { ...state, userMessages: [...state.userMessages, action.payload] };
    },
    clearState: (state, action) => {
      return { ...state, userMessages: [] };
    },
    sendDataChat: (state, { payload }) => {
      stompClient.publish({
        destination: `/topic/chat`,
        body: JSON.stringify({
          content: payload.content,
          chatId: payload.chatId,
          date: new Date,
          imageURL: null,
          senderId: payload.senderId
        })
      });
    }
  },
});

export const { updateUserMessages, sendDataChat, connectSuccessful, activateWebSocket, clearState } = chatWebSocket.actions;
export const chatWebSocketReducer = chatWebSocket.reducer;