import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import Layout from "./Layout/Layout";
import Home from "./page/Home";

import Authorization from "./page/Authorization"; // Предполагаем, что у вас есть компонент для страницы логина
import Profile from "./page/Profile";


export default function AppRoutes() {

  
  return (
    <Routes>
      <Route path="login" element={<Authorization />} />
      <Route element={<Layout />}>
        <Route index element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path="explore" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="notifications" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="messages" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="lists" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="bookmarks" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="communities" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="settings" element={<RequireAuth><Home /></RequireAuth>} />
      </Route>
    </Routes>
  );
}
