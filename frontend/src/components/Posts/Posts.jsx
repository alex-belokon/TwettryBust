import { useEffect, useState } from "react";
import PostCard from "./PostCard/PostCard";
import "./Posts.scss";
import { getPosts } from "../../api/posts";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import PageNoPosts from "./PageNoPosts/PageNoPosts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import BtnLoadMore from "../Buttons/BtnLoadMore/BtnLoadMore";

export default function Posts({ isFollowingActive }) {
  const [posts, setPosts] = useState(null);
  const [urlParam, setUrlParam] = useState("forYou");
  const [numberPage, setNumberPage] = useState(0);
  const changePost = useSelector((state) => state.changePost);
  const { token } = useSelector((state) => state.authUser);
  const [showArrow, setShowArrow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(null);
    isFollowingActive ? setUrlParam("following") : setUrlParam("forYou");
  }, [isFollowingActive]);

  useEffect(() => {
    setNumberPage(0);
    fetchData(0);
  }, [urlParam, changePost]);

  const fetchData = async (number) => {
    try {
      const data = await getPosts(urlParam, number, token);
      if (data.length === 8) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
      setPosts((prevState) => number !== 0 ? [...prevState, ...data] : data);
    } catch (error) {
      navigate("/error");
    }
  };

  function arrowClick() {
    fetchData(numberPage + 1);
    setNumberPage((prevState) => prevState + 1);
  }

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
      {posts && posts.length > 0 && (
        <>
          {posts.map((postData) => (
            <PostCard postData={postData} key={postData.id} />
          ))}
          {showArrow && (
            <BtnLoadMore loadMore={() => arrowClick()}></BtnLoadMore>
          )}
        </>
      )}
    </div>
  );
}
