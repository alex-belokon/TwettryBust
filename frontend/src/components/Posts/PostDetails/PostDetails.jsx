import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

import PostActions from "../PostActions/PostActions";
import BtnOpenPopup from "../BtnOpenPopup/BtnOpenPopup";
import PostNotFound from "./components/PostNotFound";
import PostContent from "../PostContent/PostContent";
import PostComments from "./components/PostComment";
import ImgModal from "../../Modal/ImgModal/ImgModal";
import SkeletonPostDetails from "../../../skeletons/SkeletonPostDetails/SkeletonPostDetails";

import "./PostDetails.scss";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { useScrollToTop } from "../../../utils/useScrollToTop";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [countCommentDetails, setCountCommentDetails] = useState(0); 
  useScrollToTop();
  const currentUserId = useSelector(state => state.authUser.user.id);

  const url = `http://localhost:9000/api/posts/${id}?currentUserId=${currentUserId}`;
  useEffect(() => {
    async function getPost() {
      try {
        setIsLoading(true);
        const resp = await fetch(url);
        if (resp.ok) {
          const postData = await resp.json();
          setCountCommentDetails(postData.commentsCount)
          setPost(postData);
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
      setIsLoading(false);
    }
    getPost();
  }, [id]);

  if (isLoading) {
    return <SkeletonPostDetails />;
  }
  if (!post) {
    return <PostNotFound />;
  }

  return (
    <>
        <div className="post__wrapper">
        <div className="post__header">
          <span className="post__backBtn" onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack className="profileHeader__btn" />
          </span>
          <h3>Post</h3>
        </div>
        <div className="post__box">
          <UserAvatar userName={post?.author.userName} userAvatar={post?.author.avatar} ></UserAvatar>
          <div className="post__infoHeader">
            <div className="post__infoHeaderTop">
              <Link to={`/profile/${post?.author.id}`} className="post__userName">
                {`${post?.author.firstName || ""} ${
                  post?.author.lastName || ""
                }`.trim() || "User"}
              </Link>
              <span className="post__userLogin">
                {post?.author.userName || "@userLogin"}
              </span>
            </div>
          </div>
          <BtnOpenPopup />
        </div>
        <p className="post__text">{post?.content}</p>
        {post?.attachment ? (
          <img
            className="post__imgPost"
            src={post?.attachment}
            alt="post image"
            onClick={() => setIsModalOpen(true)}
          />
          
        ) : null}
        <div className="post__postDate">
          <span className="post__time">
            {post?.createdAt
              ? new Date(post.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })
              : new Date().toLocaleTimeString()}
          </span>
          <span className="post__date">
            {post?.createdAt
              ? new Date(post.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="post__actions">
          <PostActions
            additionalClass="post__actions--bottom"
            renderingData={post}
            postData={post}
            isInBookmark={post?.isInBookmark}
            countCommentDetails={countCommentDetails}
          />
        </div>
        <PostContent
          showReplyingTo={true}
          showExtraContentOnFocus={true}
          additionalClass={"btnContainerComments"}
          classPostList={"post__list--comments"}
          postFooterClass={"post__footer--comments"}
          postItemClass={"post__item--comments"}
          textAreaClass={"post__textArea--comments"}
          isReply
          postDataId={id}
          setCommentCount={setCountCommentDetails}
        />
      </div>
      {isModalOpen && (
          <ImgModal
            setIsModalImgOpen={() => setIsModalOpen(false)}
            img={{attachment: post?.attachment}}
            isInBookmark={post?.isInBookmark}
          ></ImgModal>
        )}
      <PostComments postData={post} />
    </>
  );
}

PostDetails.propTypes = {
  formatNumber: PropTypes.func,
};
