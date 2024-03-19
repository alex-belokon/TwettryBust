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

export default function Posts({ isFollowingActive }) {
  const [posts, setPosts] = useState(null);
  const [urlParam, setUrlParam] = useState("forYou");
  const [numberPage, setNumberPage] = useState(0);
  const changePost = useSelector((state) => state.changePost);
  const {token} = useSelector((state) => state.authUser);

  const navigate = useNavigate();

  useEffect(() => {
    setPosts(null);
    isFollowingActive ? setUrlParam("following") : setUrlParam("forYou");
  }, [isFollowingActive]);

  useEffect(() => {
    fetchData();
  }, [urlParam, changePost, numberPage]);

  const fetchData = async () => {
    try {
      const data = await getPosts(urlParam, numberPage, token);
      setPosts(data);
    } catch (error) {
      navigate("/error");
    }
  };

  function arrowClick(param) {
    if (param === "prev" && numberPage !== 0) {
      setNumberPage((prevState) => prevState - 1);
      window.scrollTo(0, 0);
    } else if (param === "next" && posts.length >= 8) {
      setNumberPage((prevState) => prevState + 1);
      window.scrollTo(0, 0);
    }
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
          <div className="arrowBtnWrapper">
            <button className="arrowBtn" onClick={() => arrowClick("prev")}>
              <FaArrowLeftLong /> Prev
            </button>
            <button className="arrowBtn" onClick={() => arrowClick("next")}>
              Next <FaArrowRightLong />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
