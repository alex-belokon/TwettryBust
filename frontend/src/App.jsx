
import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import {AuthProvider} from "./components/AuthGoogle/UseAuth";

function App() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'LIGHT');
  }, [])
  
   return<AuthProvider><AppRoutes/></AuthProvider> ;

}

export default App;

