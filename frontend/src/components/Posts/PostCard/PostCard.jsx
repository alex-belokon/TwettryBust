import "./PostCard.scss";
import { GoKebabHorizontal } from "react-icons/go";
import { Link } from "react-router-dom";
import { BiMessageRounded } from "react-icons/bi";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export default function PostCard({ postData }) {

  return (
    <div className="postCard__box">
      <img
        src={postData.userScreensaver}
        className="postCard__userScreensaver"
        alt={postData.userName + " " + postData.userLastName}
      />
      <div className="postCard__info">
        <div className="postCard__infoHeader">
          <Link to={`/profile/${postData.id}/posts`} className="postCard__userName">
            {postData.userName + " " + postData.userLastName}
          </Link>
          <span className="postCard__userLogin">{postData.userLogin}</span>
          <span className="postCard__postDate">
            {new Date(postData.postDate).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <div className="postCard__btnWrapper"></div>
          <button type="button" className="postCard__infoHeaderBtn">
            <GoKebabHorizontal className="postCard__icon" />
          </button>
        </div>
        <Link className="postCard__infoWrapper">
          <p className="postCard__text">{postData.text}</p>
        </Link>
        <img
            className="postCard__imgPost"
            src={postData.imgPost}
            alt="post image"
          />
        <div className="postCard__bottom">
          <button className="postCard__iconBtn">
            <BiMessageRounded /><span className="postCard__stats">{postData.reply}</span>
          </button>
          <button className="postCard__iconBtn postCard__iconBtn--big">
            <BiRepost/> <span className="postCard__stats">{postData.repost}</span>
          </button>
          <button className="postCard__iconBtn">
            <FaRegHeart/> <span className="postCard__stats">{postData.likes}</span>
          </button>
          <button className="postCard__iconBtn postCard__iconBtn--big">
            <BiBarChart/> <span className="postCard__stats">{postData.view}</span>
          </button>
          <button className="postCard__iconBtn">
          {postData.isInBookmark 
            ? <FaBookmark />
            : <FaRegBookmark/>}
          </button>
        </div>
      </div>
    </div>
  );
}