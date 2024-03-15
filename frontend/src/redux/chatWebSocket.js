import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const initialValues = {
  userMessages: [],
  isConnectWebSocket: false,
}

const stompClient = new Client({
  brokerURL: "ws://localhost:9000/gs-guide-websocket",
});

stompClient.onConnect = (frame) => {
  stompClient.subscribe("/topic/chat", (message) => {
    const newMessage = JSON.parse(message.body);
  });
};

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
        destination: "/topic/greetings",
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



    // activateWebSocket: (dispatch) => {
    //   stompClient.onConnect = (frame) => {
    //     stompClient.subscribe("/topic/greetings", (message) => {
    //       const newMessage = JSON.parse(message.body);
    //       console.log('newMessage в редаксі', newMessage.content);
    //       state.dispatch(updateUserMessages(newMessage));
    //     });
    //   };
    //   stompClient.activate();
    //   return state;
    // },

        // activateWebSocket: (state) => {
    //   let newMessage;
    //   stompClient.onConnect = (frame) => {
    //     stompClient.subscribe("/topic/greetings", (message) => {
    //       newMessage = JSON.parse(message.body);
    //       console.log(newMessage.content);
    //     });
    //   };
    //   console.log(state);
    //   return { ...state, userMessages: [...state.userMessages, newMessage] };
    // },