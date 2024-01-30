import "./PostCard.scss";
import { GoKebabHorizontal } from "react-icons/go";
import { Link } from "react-router-dom";
import PostActions from "../PostActions/PostActions";
import { useState } from "react";
import ImgModal from "../../Modal/ImgModal/ImgModal";

export default function PostCard({ postData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="postCard__box">
      {postData?.userScreensaver ? (
        <img
          src={postData?.userScreensaver}
          className="postCard__userScreensaver"
          alt={
            postData?.userName || "User" + " " + postData?.userLastName || ""
          }
        />
      ) : (
        <div className="postCard__userScreensaver postCard__userScreensaver--template"></div>
      )}

      <div className="postCard__info">
        <div className="postCard__infoHeader">
          <Link
            to={`/profile/${postData?.id}/posts`}
            className="postCard__userName"
          >
            {`${postData?.userName || ""} ${
              postData?.userLastName || ""
            }`.trim() || "User"}
          </Link>

          <span className="postCard__userLogin">
            {postData?.userLogin || "@userLogin"}
          </span>
          <span className="postCard__postDate">
            {postData?.postDate
              ? new Date(postData.postDate).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : new Date().toLocaleString()}
          </span>
          <div className="postCard__btnWrapper"></div>
          <button type="button" className="postCard__infoHeaderBtn">
            <GoKebabHorizontal className="postCard__icon" />
          </button>
        </div>

        <Link to={`/post/${postData.id}`} className="postCard__infoWrapper">
          <p className="postCard__text">{postData.text}</p>
        </Link>
        {postData?.imgUrl ? (
          <img
            className="postCard__imgPost"
            src={postData?.imgUrl}
            alt="post image"
            onClick={()=>setIsModalOpen(true)}
          />
        ) : (
          <div className="postCard__imgPost--template"></div>
        )}

        <PostActions
          reply={postData?.reply}
          repost={postData?.repost}
          likes={postData?.likes}
          view={postData?.view}
          isInBookmark= {postData?.isInBookmark}
        ></PostActions>
      </div>
      {isModalOpen && <ImgModal img={postData} isInBookmark={postData?.isInBookmark} setIsModalImgOpen = {()=>setIsModalOpen(false)}></ImgModal>}
    </div>
  );
}
