import "../Bookmarks/bookmarks.style.scss";
import '../../components/Profile/profile.style.scss';
import { useTranslation } from "react-i18next";
import PostCard from "../../components/Posts/PostCard/PostCard";
import NoBookmarks from "./noBookmarks"

import { useEffect, useState } from "react";
import { getUserBookmarks } from "../../api/bookmarks"
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import { useSelector } from "react-redux";

export default function Bookmarks() {
  const { t } = useTranslation();

  const [posts, setPosts] = useState(null);
  const currentUserId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserBookmarks(currentUserId);
        setPosts(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bookmarksWrapper">
      <div className="bookmarks__title">
        <h2>{t('bookmarks.pageTitle')}</h2>
        <p class="profileInfo__userMail">@userNameAnna</p>
      </div>

      <div className="post-create-container">
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
