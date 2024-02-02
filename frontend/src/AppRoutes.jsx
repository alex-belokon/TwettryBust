import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import Layout from "./Layout/Layout";
import Home from "./page/Home";
import Authorization from "./page/Authorization";
import Profile from "./page/profile/Profile";
import ForgotPassword from "./page/ForgotPassword";
import Following from "./page/Following";
import Followers from "./page/Followers";
import Follow from "./page/Follow";
import Messages from "./page/Messages/Messages";
import MessagesDialogSection from "./components/Messages/MessagesDialogSection";
import ProfilePost from "./page/profile/ProfilePost";
import ProfileReplies from "./page/profile/ProfileReplies";
import ProfileHighlights from "./page/profile/ProfileHighlights";
import ProfileMedia from "./page/profile/ProfileMedia";
import ProfileLikes from "./page/profile/ProfileLikes";
import Post from "./components/Posts/Post/Post";
import Notifications from "./page/Notifications/notifications";
import NotificationList from "./components/NotificationList/NotificationList";

export default function AppRoutes() {

  
  return (
    <Routes>
      <Route path="login" element={<Authorization />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<Layout />}>
        <Route index element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path="explore" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="notifications" element={<RequireAuth><Notifications /></RequireAuth>} >
        <Route index  element={<NotificationList />} />
          <Route path=":type" element={<NotificationList />} /></Route>
        <Route path="lists" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="bookmarks" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="communities" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="post/:id" element={<RequireAuth><Post/></RequireAuth>} />
        <Route path="profile/:id" element={<RequireAuth><Profile /></RequireAuth>}>
          <Route index element={<ProfilePost />} />
          <Route path="with_replies" exact element={<ProfileReplies />} />
          <Route path="highlights" exact element={<ProfileHighlights />} />
          <Route path="media" exact element={<ProfileMedia />} />
          <Route path="likes" exact element={<ProfileLikes />} />
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
