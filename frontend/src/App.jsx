
import "./App.css";
import AppRoutes from "./AppRoutes";
import {AuthProvider} from "./components/AuthGoogle/UseAuth";

function App() {
  return<AuthProvider><AppRoutes/></AuthProvider> ;
}

export default App;

