import { BiMessageRounded, BiRepost, BiBarChart } from "react-icons/bi";
import { FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import { formatNumber } from "../../../utils/fromatNumber";
import "./PostActions.scss";

export default function PostActions({
  reply,
  repost,
  likes,
  view,
  isInBookmark = null,
  additionalClass,
}) {
  console.log("likes", likes);
  const postCardBottom = `postCard__bottom ${additionalClass || ""}`;

  const location = useLocation();
  const isPostPage = location.pathname.includes(`/post/`);

  // function formatNumber(num) {
  //   return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;
  // }
  return (
    <div className={postCardBottom}>
      <button className="postCard__iconBtn">
        <BiMessageRounded />
        <span className="postCard__stats">{formatNumber(reply)}</span>
      </button>
      <button className="postCard__iconBtn postCard__iconBtn--big">
        <BiRepost />
        <span className="postCard__stats">{formatNumber(repost)}</span>
      </button>
      <button className="postCard__iconBtn">
        <FaRegHeart />
        <span className="postCard__stats">{formatNumber(likes)}</span>
      </button>
      {!isPostPage && (
        <button className="postCard__iconBtn postCard__iconBtn--big">
          <BiBarChart />
          <span className="postCard__stats">{formatNumber(view)}</span>
        </button>
      )}
      {isInBookmark !== null && (
        <button className="postCard__iconBtn">
          {isInBookmark ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      )}
       {isPostPage && (
        <button className="postCard__iconBtn postCard__iconBtn--big">
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