import { useEffect, useState } from "react";
import PostCard from "./PostCard/PostCard";
import "./Posts.scss";
import { getPosts } from "../../api/posts";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import PageNoPosts from "./PageNoPosts/PageNoPosts";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


export default function Posts({ isFollowingActive }) {
  const [posts, setPosts] = useState(null);
  const [urlParam, setUrlParam] = useState('forYou');
  const changePost = useSelector(state => state.changePost)
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(null);
    isFollowingActive ? setUrlParam("following") : setUrlParam("forYou");
  }, [isFollowingActive]);

  useEffect(() => {
    fetchData();
  }, [urlParam, changePost]);

  const fetchData = async () => {
    try {
      const data = await getPosts(urlParam, currentUserId);
      setPosts(data);
    } catch (error) {
      navigate('/error')
    }
  };

  return (
    <div className="post-create-container">
      {!posts && (
        <div className="skeletonPosts__wrapper">
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item}></SkeletonPost>
          ))}
        </div>
      )}
      {posts && posts.length === 0 && <PageNoPosts></PageNoPosts>}
      {posts && posts.length > 0 &&
        posts.map((postData) => (
          <PostCard postData={postData} key={postData.id}/>
        ))}
    </div>
  );
}
