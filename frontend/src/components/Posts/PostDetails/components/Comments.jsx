import { Link } from "react-router-dom";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import PostActions from "../../PostActions/PostActions";
import ImgModal from "../../../Modal/ImgModal/ImgModal";
import PopupDelComment from "../../../Modal/Popup/PopupDelComment";

export default function Comments({ comment, postData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  console.log(comment);

  return (
    <div className="post__comments-wrapper">
      <div className="post__comments-box">
        <Link to={`/profile/${comment.userId}`}>
          <div className="post__comments-box">
            {comment.avatar ? (
              <img
                src={comment.avatar}
                className="post__userScreensaver"
                alt={comment.firstName || "User" + " " + comment.lastName || ""}
              />
            ) : (
              <div className="post__userScreensaver post__userScreensaver--template"></div>
            )}
          </div>
        </Link>
        <div className="contentCard__info">
          <div className="contentCard__infoHeader">
            <Link
              to={`/profile/${comment?.userId}`}
              className="contentCard__userName"
            >
              {`${comment?.userfirstName || ""} ${
                comment?.userLastName || ""
              }`.trim() || "User"}
            </Link>
            <span className="contentCard__userLogin">
              {comment?.userName || "@userLogin"}
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
              <button type="button" className="contentCard__infoHeaderBtn">
                <GoKebabHorizontal
                  className="contentCard__icon"
                  onClick={() => setIsPopupOpen(true)}
                />
               {isPopupOpen && (
                <PopupDelComment
                  closePopup={() => setIsPopupOpen(false)}
                  comment={comment}
                  postData={postData}
                  currentUserId={comment?.userId}
                  commentId={comment?.id}
                ></PopupDelComment>
              )}
              </button>
            </div>
          </div>
          <div className="contentCard__textWrapper">
            <p className="contentCard__text">{comment?.content}</p>
          </div>
          {comment?.attachment ? (
            <img
              className="contentCard__imgPost"
              src={comment?.attachment}
              alt="post image"
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            ""
          )}
          {/* <PostActions
            postData={comment}
            isInBookmark={comment?.isInBookmark}
          ></PostActions> */}
        </div>
        {isModalOpen && (
          <ImgModal
            setIsModalImgOpen={() => setIsModalOpen(false)}
            img={{ imgUrl: comment?.imgUrl }}
            isInBookmark={comment?.isInBookmark}
          ></ImgModal>
        )}
      </div>
    </div>
  );
}
