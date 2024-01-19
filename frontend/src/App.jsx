import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./components/AuthGoogle/UseAuth";
import { Provider } from "react-redux";
import store from "./redux/redux.js";
import UploadWidget from "./components/UploadWidget";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "LIGHT"
    );
  }, []);

  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: 'dfrps0cby',
  //     uploadPreset: 'h1ocrvyn',
  //   }
  // });

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Provider>
      <UploadWidget />
    </>
  );
}

export default App;
