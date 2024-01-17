
import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";

function App() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'LIGHT');
  }, [])

  return <AppRoutes></AppRoutes>;
}

export default App;

