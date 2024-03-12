import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
// import { AuthProvider } from "./components/AuthGoogle/UseAuth";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/redux.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { Client } from "@stomp/stompjs";
import "./App.css";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "LIGHT"
    );
  }, []);


  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:9000/gs-guide-websocket",
    });

    stompClient.onConnect = (frame) => {
      console.log(frame);
      stompClient.subscribe("/topic/greetings", (e) => {
        console.log(e);
      });
    };

    stompClient.onWebSocketError = (error) => {
      console.error("Error with websocket", error);
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    function disconnect() {
      stompClient.deactivate();
      // setConnected(false);
      console.log("Disconnected");
    }

    stompClient.activate();



    //  const ws = new WebSocket("ws://localhost:9000/gs-guide-websocket");
    //  ws.addEventListener('open', (...e) =>{
    //   console.log(e);
    //  })
    //  ws.addEventListener('error', (...e) =>{
    //   console.log(e);
    //  })
    //  ws.addEventListener('message', (...e) =>{
    //   console.log(e);
    //  })

    


    // let stompClient = null;
    // try {
    //     const onConnected = () => {
    //         stompClient.subscribe(`http://localhost:9000/chat-websocket`, newMessage);
    //     };
    //     const onError = (err) => {
    //         console.log(err);
    //     };

    //     let Sock = new SockJS(`http://localhost:9000/chat-websocket`);
    //     stompClient = over(Sock);
    //     stompClient.connect({}, onConnected, onError);

    //     // return () => {
    //     //     if (stompClient.connected) {
    //     //         try {
    //     //             stompClient.disconnect();
    //     //         } catch (e) {
    //     //             console.warn("message - failed to disconnect the stomp client", e);
    //     //         }
    //     //     } else {
    //     //         console.warn("message - no websocket to disconnect from");
    //     //     }
    //     // };
    // } catch (e) {
    //     console.warn("message - failed to disconnect the stomp client", e);
    // }
  }, []);

  // useEffect(() => {
  //   ws.addEventListener("open", (event) => {
  //     console.log(event);
  //   });

  //   ws.addEventListener("message", (e) => {
  //     console.log("Message from server ", e);
  //   });
  // }, []);

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
