import { useState } from "react";
import { BiMessageRounded, BiRepost, BiBarChart } from "react-icons/bi";
import { FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import { formatNumber } from "../../../utils/fromatNumber";
import ModalReply from "../../Modal/ModalReply/ModalReply";
import "./PostActions.scss";

export default function PostActions({
  isInBookmark = null,
  additionalClass,
  postData,
}) {
  const [isModalReplyOpen, setIsModalReplyOpen] = useState(false);
  const location = useLocation();

  const postCardBottom = `postCard__bottom ${additionalClass || ""}`;
  const isPostPage = location.pathname.includes(`/post/`);

  return (
    <div className={postCardBottom}>
      <button className="postCard__iconBtn" title="Reply" onClick={()=>setIsModalReplyOpen(true)}>
        <BiMessageRounded />
        <span className="postCard__stats">{formatNumber(postData.reply)}</span>

        {isModalReplyOpen && <ModalReply postData={postData} closeModal={()=>setIsModalReplyOpen(false)}></ModalReply>}
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--big postCard__iconBtn--green" title="Repost">
        <BiRepost />
        <span className="postCard__stats">{formatNumber(postData.repost)}</span>
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--red" title="Likes">
        <FaRegHeart />
        <span className="postCard__stats">{formatNumber(postData.likes)}</span>
      </button>
      {!isPostPage && (
        <button className="postCard__iconBtn postCard__iconBtn--big" title="Views">
          <BiBarChart />
          <span className="postCard__stats">{formatNumber(postData.view)}</span>
        </button>
      )}
      {isInBookmark !== null && (
        <button className="postCard__iconBtn" title="Bookmarks">
          {isInBookmark ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      )}
       {isPostPage && (
        <button className="postCard__iconBtn postCard__iconBtn--big" title="Share">
        <FiShare />
        <span className="postCard__stats"></span>
      </button>
      )}
    </div>
  );

 
}
PostActions.propTypes = {
  formatNumber: PropTypes.func,
}