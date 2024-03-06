import { useState } from "react";
import { BiMessageRounded, BiRepost, BiBarChart } from "react-icons/bi";
import { FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import { formatNumber } from "../../../utils/fromatNumber";
import ModalReply from "../../Modal/ModalReply/ModalReply";
import "./PostActions.scss";
import { postToggleLikes, postToggleBookmark } from "../../../api/posts";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import PopupRepost from "../../Modal/Popup/PopupRepost";
import { useEffect } from "react";
export default function PostActions({
  isInBookmark = null,
  additionalClass,
  renderingData,
  postData,
}) {
  const [isModalReplyOpen, setIsModalReplyOpen] = useState(false);
  const [postLikes, setPostLikes] = useState(postData.likes);
  const [isLikeCurrentUser, setIsLikeCurrentUser] = useState(postData.isLiked);
  const [isRepostCurrentUser, setIsRepostCurrentUser] = useState(false);
  const [isPopupRepostOpen, setIsPopupRepostOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [bookmark, setBookmark] = useState(
    isInBookmark !== null && isInBookmark
  );
  const location = useLocation();
  const currentUserId = useSelector((state) => state.authUser.user.id);

  const postCardBottom = `postCard__bottom ${additionalClass || ""}`;
  const isPostPage = location.pathname.includes(`/post/`);

  useEffect(()=>{
    isRepost();
  }, [postData])

  async function addToBookmark() {
    try {
      await postToggleBookmark(currentUserId, renderingData.id);
      setBookmark((prevState) => !prevState);
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleLikes() {
    try {
      await postToggleLikes(currentUserId, renderingData.id);
      setIsLikeCurrentUser((prevState) => !prevState);
      setPostLikes((prevState) =>
        isLikeCurrentUser ? prevState - 1 : prevState + 1
      );
    } catch (e) {
      console.log(e);
    }
  }

  function isRepost () {
    if (postData.originalPost && postData.author.id === currentUserId) {
    } else if (!postData.originalPost  && postData.author.id === currentUserId) {
      setIsDisabled(true);
    } else {
      setIsRepostCurrentUser (false);
      setIsDisabled(false);
    }
  }

  console.log(renderingData)
  
  return (
    <div className={postCardBottom}>
      <button
        className="postCard__iconBtn"
        title="Reply"
        onClick={() => setIsModalReplyOpen(true)}
      >
        <BiMessageRounded />
        <span className="postCard__stats">{formatNumber(renderingData?.reply)}</span>
      </button>
      {isModalReplyOpen && (
        <ModalReply
          postData={renderingData}
          closeModal={() => setIsModalReplyOpen(false)}
        ></ModalReply>
      )}
      <div style={{ position: "relative" }}>
        <button
          className="postCard__iconBtn postCard__iconBtn--big postCard__iconBtn--green"
          title="Repost"
          onClick={() => setIsPopupRepostOpen(true)}
          disabled={isRepostCurrentUser}
        >
          {isRepostCurrentUser ? <BiRepost style={{ color: "#4b8f23"}}/> : <BiRepost />}
          <span className="postCard__stats">
            {formatNumber(renderingData?.repost)}
          </span>
        </button>
        {isPopupRepostOpen && (
          <PopupRepost
            closePopup={() => setIsPopupRepostOpen(false)}
            postData={renderingData}
          ></PopupRepost>
        )}
      </div>

      <button
        className="postCard__iconBtn postCard__iconBtn--red"
        title="Likes"
        onClick={toggleLikes}
      >
        {isLikeCurrentUser ? (
          <FaHeart style={{ color: "#ff4a4f" }} />
        ) : (
          <FaRegHeart />
        )}
        <span className="postCard__stats">{formatNumber(postLikes)}</span>
      </button>
      {isInBookmark !== null && (
        <button
          className="postCard__iconBtn"
          title="Bookmarks"
          onClick={addToBookmark}
        >
          {bookmark ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      )}
      {isPostPage && (
        <button
          className="postCard__iconBtn postCard__iconBtn--big"
          title="Share"
        >
          <FiShare />
          <span className="postCard__stats"></span>
        </button>
      )}
    </div>
  );
}
PostActions.propTypes = {
  formatNumber: PropTypes.func,
};
