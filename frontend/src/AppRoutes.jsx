import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hoc/RequireAuth";
import Layout from "./Layout/Layout";
import Authorization from "./page/Authorization";
import ForgotPassword from "./page/ForgotPassword";
import Following from "./page/Following";
import Followers from "./page/Followers";
import Follow from "./page/Follow";
import ProfilePost from "./page/profile/ProfilePost";
import ProfileHighlights from "./page/profile/ProfileHighlights";
import ProfileMedia from "./page/profile/ProfileMedia";
import ProfileLikes from "./page/profile/ProfileLikes";
// import Notifications from "./page/Notifications/Notifications";
import NotificationList from "./components/NotificationList/NotificationList";
import ModalLogIn from "./components/Modal/ModalLogReg/ModalLogIn";
import ModalRegistration from "./components/Modal/ModalLogReg/ModalRegistration";
import Communities from "./page/Communities/Communities";
import GroupById from "./page/GroupById/GroupById";
import { lazy, Suspense } from "react";
import CommunitiesLatest from "./page/GroupById/CommunitiesLatest";
import CommunitiesMedia from "./page/GroupById/CommunitiesMedia";
import CommunitiesAbout from "./page/GroupById/CommunitiesAbout";
import ResetPassword from "./page/ResetPassword";
import Explore from "./page/Explore/Explore";
import Users from "./page/Explore/Users";
import CommunitiesSearch from "./page/Explore/CommunitiesSearch";
import Error from "./page/Error/Error";
import CommunitiePost from "./page/Communities/CommunitiePost";

const HomePage = lazy(() => import('./page/Home'));
const ProfilePage = lazy(() => import('./page/profile/Profile'));
const PostPage = lazy(() => import('./components/Posts/PostDetails/PostDetails'));
const BookmarksPage = lazy(() => import("./page/Bookmarks/Bookmarks"));
const MessagesPage = lazy(() => import('./page/Messages/Messages'));
const MessagesDialogSection = lazy(() => import('./components/Messages/MessagesDialogSection'));
const NotificationsPage = lazy(() => import('./page/Notifications/Notifications'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="authorization/*" element={<Authorization />}>
        <Route path="login" element={<ModalLogIn />} />
        <Route path="singup" element={<ModalRegistration />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route
          index
          element={
            <RequireAuth>
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route path="error" element={<Error />} />
        <Route
          path="explore"
          element={
            <RequireAuth>
              <Explore />
            </RequireAuth>
          }
        >
          <Route index element={<CommunitiesSearch />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route
          path="notifications"
          element={
            <RequireAuth>
              <Suspense>
                <NotificationsPage />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route index element={<NotificationList />} />
          <Route path=":type" element={<NotificationList />} />
        </Route>
        <Route
          path="bookmarks"
          element={
            <RequireAuth>
              <Suspense fallback={<div>Loading...</div>}>
                <BookmarksPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="communities"
          element={
            <RequireAuth>
              <Suspense fallback={<div>Loading...</div>}>
                <Communities />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="communities/:id"
          element={
            <RequireAuth>
              <Suspense>
                <GroupById />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route index element={<CommunitiePost />} />
          <Route path="latest" exact element={<CommunitiesLatest />} />
          <Route path="media-group" exact element={<CommunitiesMedia />} />
          <Route path="about" exact element={<CommunitiesAbout />} />
        </Route>
        <Route
          path="post/:id"
          element={
            <RequireAuth>
              <Suspense fallback={<div>Loading...</div>}>
                <PostPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="profile/:id"
          element={
            <RequireAuth>
              <Suspense>
                <ProfilePage />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route index element={<ProfilePost />} />
          <Route path="highlights" exact element={<ProfileHighlights />} />
          <Route path="media" exact element={<ProfileMedia />} />
          <Route path="likes" exact element={<ProfileLikes />} />
        </Route>
        <Route
          path="/follow"
          element={
            <RequireAuth>
              <Follow />
            </RequireAuth>
          }
        >
          <Route path="following" element={<Following />} />
          <Route path="followers" element={<Followers />} />
        </Route>
      </Route>
      <Route
        path="messages"
        element={
          <RequireAuth>
            <Suspense>
              <MessagesPage />
            </Suspense>
          </RequireAuth>
        }
      >
        <Route
          path=":id"
          element={
            <Suspense>
              <MessagesDialogSection />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
