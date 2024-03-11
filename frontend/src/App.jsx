import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./components/AuthGoogle/UseAuth";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/redux.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StompSessionProvider } from "react-stomp-hooks";
import "./App.css";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "LIGHT"
    );
  }, []);

  return (
    <>
      {/* <StompSessionProvider url={'ws://localhost:9000/chat-websocket'}> */}
        <Provider store={store}>
          <AuthProvider>
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
          </AuthProvider>
        </Provider>
      {/* </StompSessionProvider> */}
    </>
  );
}

export default App;
