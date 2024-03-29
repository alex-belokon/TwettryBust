import "../Bookmarks/bookmarks.style.scss";
import '../../components/Profile/profile.style.scss';
import { useTranslation } from "react-i18next";
import PostCard from "../../components/Posts/PostCard/PostCard";
import NoBookmarks from "./noBookmarks"

import { useEffect, useState } from "react";
import { getUserBookmarks } from "../../api/bookmarks"
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Bookmarks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const currentUser = useSelector((state) => state.authUser.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserBookmarks(currentUser.id);
        setPosts(data);
      } catch (error) {
        navigate("/error");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bookmarksWrapper">
      <div className="bookmarks__title">
        <h2>{t('bookmarks.pageTitle')}</h2>
        <p className="profileInfo__userMail">{currentUser.userName}</p>
      </div>

      <div>
        {!posts && (
          <div className="skeletonPosts__wrapper">
            {[1, 2, 3].map((item) => (
              <SkeletonPost key={item}></SkeletonPost>
            ))}
          </div>
        )}
        {posts && posts.length === 0 && <NoBookmarks></NoBookmarks>}

        {posts && posts.length > 0 &&
          posts.map((postData) => (
            <PostCard postData={postData} key={postData.id} />
          ))}
      </div>

    </div>

  );
}
