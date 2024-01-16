import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./page/Home/Home";


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='explore' element={<Home />}/>
        <Route path='notifications' element={<Home />}/>
        <Route path='messages' element={<Home />}/>
        <Route path='lists' element={<Home />}/>
        <Route path='bookmarks' element={<Home />}/>
        <Route path='communities' element={<Home />}/>
        <Route path='profile' element={<Home />}/>
        <Route path='settings' element={<Home />}/>
      </Route>
    </Routes>
  );
}
