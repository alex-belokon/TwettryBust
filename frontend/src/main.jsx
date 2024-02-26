import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import i18n from "./i18n/i18n";

window.addEventListener('unload', function() {
  const rememberMe = localStorage.getItem('rememberMe') === 'true';
  if (!rememberMe) {
    localStorage.removeItem('persist:user');
    sessionStorage.removeItem('persist:user');
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
