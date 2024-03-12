import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
// import { AuthProvider } from "./components/AuthGoogle/UseAuth";
import { Provider } from "react-redux";
import {store, persistor} from "./redux/redux.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import "./App.css";
import { useState } from "react";

// const ws = new WebSocket("ws://localhost:9000/gs-guide-websocket");
// var sock = new SockJS('http://localhost:9000/gs-guide-websocket');
// let Sock = new SockJS(`http://localhost:9000/gs-guide-websocket`);

function App() {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "LIGHT"
    );
  }, []);

  // let stompClient = null;

  // const [stompClient, setStompClient] = useState();


  // useEffect(() => {
  //   try {
  //     const onConnected = () => {
  //       stompClient.subscribe(
  //         `http://localhost:9000/gs-guide-websocket`,
  //         newMessage
  //       );
  //     };
  //     const onError = (err) => {
  //       console.log(err);
  //     };

  //     let Sock = new SockJS(`http://localhost:9000/gs-guide-websocket`);
  //     stompClient = over(Sock);
  //     stompClient.connect({}, onConnected, onError);

  //     return () => {
  //       if (stompClient.connected) {
  //         try {
  //           stompClient.disconnect();
  //         } catch (e) {
  //           console.warn("message - failed to disconnect the stomp client", e);
  //         }
  //       } else {
  //         console.warn("message - no websocket to disconnect from");
  //       }
  //     };
  //   } catch (e) {
  //     console.warn("message - failed to disconnect the stomp client", e);
  //   }
  // }, []);

  // const newMessage = async (payload) => {
  //   let payloadData = JSON.parse(payload.body);
  //   console.log(payloadData);
  // };

  return (
    <>
      <Provider store={store}>
        {/* <AuthProvider> */}
        <PersistGate persistor={persistor}>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <AppRoutes />
        </PersistGate>
        {/* </AuthProvider> */}
      </Provider>
    </>
  );
}

export default App;
