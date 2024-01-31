import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { Link } from "react-router-dom";
import ImgModal from "../../Modal/ImgModal/ImgModal";
import PopupPost from "../../Modal/Popup/PopupPost";
import "./ContentCard.scss";

export default function ContentCard({ postData, isComment = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="contentCard__box">
      <div className={isComment ? "contentCard__imgWrapper--line" : ""}>
        {postData?.userScreensaver ? (
          <img
            src={postData?.userScreensaver}
            className="contentCard__userScreensaver"
            alt={
              postData?.userName || "User" + " " + postData?.userLastName || ""
            }
          />
        ) : (
          <div className="contentCard__userScreensaver contentCard__userScreensaver--template"></div>
        )}
      </div>

      <div className="contentCard__info">
        <div className="contentCard__infoHeader">
          <Link
            to={`/profile/${postData?.id}`}
            className="contentCard__userName"
          >
            {`${postData?.userName || ""} ${
              postData?.userLastName || ""
            }`.trim() || "User"}
          </Link>

          <span className="contentCard__userLogin">
            {postData?.userLogin || "@userLogin"}
          </span>
          <span className="contentCard__postDate">
            {postData?.postDate
              ? new Date(postData.postDate).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : new Date().toLocaleString()}
          </span>
          <div className="contentCard__btnWrapper"></div>
          {!isComment && (
            <button type="button" className="contentCard__infoHeaderBtn">
              <GoKebabHorizontal
                className="contentCard__icon"
                onClick={() => setIsPopupOpen(true)}
              />
              {isPopupOpen && (
                <PopupPost closePopup={() => setIsPopupOpen(false)}></PopupPost>
              )}
            </button>
          )}
        </div>

        <Link to={`/post/${postData?.id}`} className="contentCard__infoWrapper">
          <p className="contentCard__text">{postData?.text}</p>
        </Link>
        {!isComment &&
          (postData?.imgUrl ? (
            <img
              className="contentCard__imgPost"
              src={postData?.imgUrl}
              alt="post image"
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            <div className="contentCard__imgPost--template"></div>
          ))}
      </div>
      {isModalOpen && (
        <ImgModal
          img={postData}
          isInBookmark={postData?.isInBookmark}
          setIsModalImgOpen={() => setIsModalOpen(false)}
        ></ImgModal>
      )}
    </div>
  );
}