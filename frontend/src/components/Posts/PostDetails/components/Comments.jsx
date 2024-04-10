import { Link } from "react-router-dom";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import PostActions from "../../PostActions/PostActions";
import ImgModal from "../../../Modal/ImgModal/ImgModal";
import PopupDelComment from "../../../Modal/Popup/PopupDelComment";
import UserAvatar from "../../../UserAvatar/UserAvatar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Comments({
  comment,
  postData,
  setComments,
  setCountCommentDetails,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const isCurrentUser = comment.userId === currentUserId;

  return (
    <div className="post__comments-wrapper">
      <div className="post__comments-box">
        <Link
          to={`/profile/${comment.userId}`}
          style={{ textDecoration: "none" }}
        >
          <div className="post__comments-box">
            <UserAvatar
              userName={comment.userName}
              userAvatar={comment.avatar}
            ></UserAvatar>
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
              {comment?.createdAt
                ? new Date(comment.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                : new Date().toLocaleString()}
            </span>
            <div className="contentCard__btnWrapper"></div>
            <div className="btnOpenPopup__wrapper">
              {isCurrentUser && (
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
                      setComments={setComments}
                      setCountCommentDetails={setCountCommentDetails}
                    ></PopupDelComment>
                  )}
                </button>
              )}
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
        </div>
        {isModalOpen && (
          <ImgModal
            setIsModalImgOpen={() => setIsModalOpen(false)}
            img={{ attachment: comment?.attachment }}
            isInBookmark={comment?.isInBookmark}
          ></ImgModal>
        )}
      </div>
    </div>
  );
}
