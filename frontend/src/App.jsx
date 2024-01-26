import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./components/AuthGoogle/UseAuth";
import { Provider } from "react-redux";
import store from "./redux/redux.js";
import Home from "./page/Home.jsx"

function App() {
  useEffect(() => {

    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "LIGHT"
    );
  }, []);


  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
        <Home></Home>
      </AuthProvider>
    </Provider>
  );
}

export default App;
