import { BiMessageRounded, BiRepost, BiBarChart } from "react-icons/bi";
import { FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import "./PostActions.scss";

export default function PostActions({
  reply,
  repost,
  likes,
  view,
  isInBookmark = null,
}) {
  console.log("likes", likes);

  return (
    <div className="postCard__bottom">
      <button className="postCard__iconBtn">
        <BiMessageRounded />
        <span className="postCard__stats">{reply}</span>
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--big">
        <BiRepost />
        <span className="postCard__stats">{repost}</span>
      </button>
      <button className="postCard__iconBtn">
        <FaRegHeart />
        <span className="postCard__stats">{likes}</span>
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--big">
        <BiBarChart />
        <span className="postCard__stats">{view}</span>
      </button>
      {isInBookmark !== null && (
        <button className="postCard__iconBtn">
          {isInBookmark ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      )}
    </div>
  );
}
