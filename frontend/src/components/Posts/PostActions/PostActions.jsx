import { useState } from "react";
import { BiMessageRounded, BiRepost, BiBarChart } from "react-icons/bi";
import { FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import ModalReply from "../../Modal/ModalReply/ModalReply";
import "./PostActions.scss";

export default function PostActions({
  reply,
  repost,
  likes,
  view,
  isInBookmark = null,
}) {

  const [isModalReplyOpen, setIsModalReplyOpen] = useState(false)
  

  return (
    <div className="postCard__bottom">
      <button className="postCard__iconBtn" title="Reply" onClick={()=>setIsModalReplyOpen(true)}>
        <BiMessageRounded />
        <span className="postCard__stats">{reply}</span>
        {isModalReplyOpen && <ModalReply closeModal={()=>setIsModalReplyOpen(false)}></ModalReply>}
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--big postCard__iconBtn--green" title="Repost">
        <BiRepost />
        <span className="postCard__stats">{repost}</span>
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--red" title="Likes">
        <FaRegHeart />
        <span className="postCard__stats">{likes}</span>
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--big" title="View">
        <BiBarChart />
        <span className="postCard__stats">{view}</span>
      </button>
      {isInBookmark !== null && (
        <button className="postCard__iconBtn" title="Bookmarks">
          {isInBookmark ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      )}
    </div>
  );
}
