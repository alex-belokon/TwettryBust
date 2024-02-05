import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import Layout from "./Layout/Layout";
import Authorization from "./page/Authorization";
import ForgotPassword from "./page/ForgotPassword";
import Following from "./page/Following";
import Followers from "./page/Followers";
import Follow from "./page/Follow";
import ProfilePost from "./page/profile/ProfilePost";
import ProfileReplies from "./page/profile/ProfileReplies";
import ProfileHighlights from "./page/profile/ProfileHighlights";
import ProfileMedia from "./page/profile/ProfileMedia";
import ProfileLikes from "./page/profile/ProfileLikes";
import { lazy, Suspense } from "react";
import SkeletonProfile from "./skeletons/SkeletonProfile/SkeletonProfile";

const HomePage = lazy(() => import('./page/Home'));
const ProfilePage = lazy(() => import('./page/profile/Profile'));
const PostPage = lazy(() => import('./components/Posts/Post/Post'));
const MessagesPage = lazy(() => import('./page/Messages/Messages'));
const MessagesDialogSection = lazy(() => import('./components/Messages/MessagesDialogSection'));

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="login" element={<Authorization />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<Layout />}>
        <Route index element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></RequireAuth>}/>
        <Route path="explore" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></RequireAuth>} />
        <Route path="notifications" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></RequireAuth>} />
        <Route path="lists" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></RequireAuth>} />
        <Route path="bookmarks" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></RequireAuth>} />
        <Route path="communities" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></RequireAuth>} />
        <Route path="post/:id" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><PostPage/></Suspense></RequireAuth>} />
        <Route path="profile/:id" element={<RequireAuth><Suspense><ProfilePage /></Suspense></RequireAuth>}>
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
        <Route path="settings" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></RequireAuth>} />
      </Route>
      <Route path="messages" element={<RequireAuth><Suspense fallback={<div>Loading...</div>}><MessagesPage /></Suspense></RequireAuth>}> 
         <Route path=":id" element={<Suspense fallback={<div>Loading...</div>}><MessagesDialogSection /></Suspense>} />
      </Route>
    </Routes>
  );
}
