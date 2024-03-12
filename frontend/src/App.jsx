import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./components/AuthGoogle/UseAuth";
import { Provider } from "react-redux";
import {store, persistor} from "./redux/redux.js";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "LIGHT"
    );
  }, []);
  useEffect(() => {

  }, [])

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <PersistGate persistor={persistor}>
            <AppRoutes />
          </PersistGate>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
