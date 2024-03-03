import { useEffect, useState } from "react";
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
export default function PostActions({
  isInBookmark = null,
  additionalClass,
  postData,
}) {
  const [isModalReplyOpen, setIsModalReplyOpen] = useState(false);
  const [postLikes, setPostLikes] = useState(postData.likes);
  const [isLikeCurrentUser, setIsLikeCurrentUser] = useState(postData.isLiked);
  console.log('postData: ', postData);
  const [bookmark, setBookmark] = useState(
    isInBookmark !== null && isInBookmark
  );
  const location = useLocation();
  const currentUserId = useSelector((state) => state.authUser.user.id);

  const postCardBottom = `postCard__bottom ${additionalClass || ""}`;
  const isPostPage = location.pathname.includes(`/post/`);

  async function addToBookmark() {
    try {
      await postToggleBookmark(currentUserId, postData.id);
      setBookmark((prevState) => !prevState);
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleLikes() {
    try {
      await postToggleLikes(currentUserId, postData.id);
      setIsLikeCurrentUser((prevState) => !prevState);
      setPostLikes((prevState) =>
        isLikeCurrentUser ? prevState - 1 : prevState + 1
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={postCardBottom}>
      <button
        className="postCard__iconBtn"
        title="Reply"
        onClick={() => setIsModalReplyOpen(true)}
      >
        <BiMessageRounded />
        <span className="postCard__stats">{formatNumber(postData.reply)}</span>

        {isModalReplyOpen && (
          <ModalReply
            postData={postData}
            closeModal={() => setIsModalReplyOpen(false)}
          ></ModalReply>
        )}
      </button>
      <button
        className="postCard__iconBtn postCard__iconBtn--big postCard__iconBtn--green"
        title="Repost"
      >
        <BiRepost />
        <span className="postCard__stats">{formatNumber(postData.repost)}</span>
      </button>
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
      {/* {!isPostPage && (
        <button
          className="postCard__iconBtn postCard__iconBtn--big"
          title="Views"
        >
          <BiBarChart />
          <span className="postCard__stats">{formatNumber(postData.view)}</span>
        </button>
      )} */}
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
