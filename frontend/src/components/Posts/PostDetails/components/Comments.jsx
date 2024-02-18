import { Link } from "react-router-dom";
import { useState } from "react";

import PostActions from "../../PostActions/PostActions";
import BtnOpenPopup from "../../BtnOpenPopup/BtnOpenPopup";
import ImgModal from "../../../Modal/ImgModal/ImgModal";

export default function Comments({ comment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="post__comments-wrapper">
      <div className="post__comments-box">
        <Link to={`/profile/${comment.id}`}>
          <div className="post__comments-box">
            {comment.userScreensaver ? (
              <img
                src={comment.userScreensaver}
                className="post__userScreensaver"
                alt={
                  comment.userName || "User" + " " + comment.userLastName || ""
                }
              />
            ) : (
              <div className="post__userScreensaver post__userScreensaver--template"></div>
            )}
          </div>
        </Link>
        <div className="contentCard__info">
          <div className="contentCard__infoHeader">
            <Link
              to={`/profile/${comment?.id}`}
              className="contentCard__userName"
            >
              {`${comment?.userName || ""} ${
                comment?.userLastName || ""
              }`.trim() || "User"}
            </Link>
            <span className="contentCard__userLogin">
              {comment?.userLogin || "@userLogin"}
            </span>
            <span className="contentCard__postDate">
              {comment?.postDate
                ? new Date(comment.postDate).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                : new Date().toLocaleString()}
            </span>
            <div className="contentCard__btnWrapper"></div>

            <div className="btnOpenPopup__wrapper">
              <BtnOpenPopup />
            </div>
          </div>

          <Link
            to={`/post/${comment?.id}`}
            className="contentCard__infoWrapper"
          >
            <p className="contentCard__text">{comment?.text}</p>
          </Link>

          {comment?.imgUrl ? (
            <img
              className="contentCard__imgPost"
              src={comment?.imgUrl}
              alt="post image"
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            ""
          )}
          <PostActions
            postData={comment}
            isInBookmark={comment?.isInBookmark}
          ></PostActions>
        </div>
        {isModalOpen && (
          <ImgModal
            setIsModalImgOpen={() => setIsModalOpen(false)}
            img={{imgUrl: comment?.imgUrl}}
            isInBookmark={comment?.isInBookmark}
          ></ImgModal>
        )}
      </div>
    </div>
  );
}
