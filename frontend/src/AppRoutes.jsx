import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import Layout from "./Layout/Layout";
import Home from "./page/Home";
import Authorization from "./page/Authorization"; // Предполагаем, что у вас есть компонент для страницы логина
import Profile from "./page/Profile";
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";
import Following from "./page/Following";
import Followers from "./page/Followers";
import Follow from "./page/Follow";
import Messages from "./page/Messages/Messages";
import MessagesDialogSection from "./components/Messages/MessagesDialogSection";

export default function AppRoutes() {

  
  return (
    <Routes>
      <Route path="login" element={<Authorization />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route index element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path="explore" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="notifications" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="lists" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="bookmarks" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="communities" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="profile/:id" element={<RequireAuth><Profile /></RequireAuth>}>
          <Route path="posts" element={<Home />} />
          <Route path="with_replies" exact element={<Home />} />
          <Route path="highlights" exact element={<Home />} />
          <Route path="media" exact element={<Home />} />
          <Route path="likes" exact element={<Home />} />
        </Route>
        <Route path="follow" element={<RequireAuth><Follow /></RequireAuth>} >
          <Route path="following" element={<Following />} />
          <Route path="followers" element={<Followers />} />
        </Route>  
        <Route path="settings" element={<RequireAuth><Home /></RequireAuth>} />
      </Route>
      <Route path="messages" element={<RequireAuth><Messages /></RequireAuth>}> 
         <Route path=":id" element={<MessagesDialogSection />} />
      </Route>
    </Routes>
  );
}
