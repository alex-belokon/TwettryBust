import { useState } from "react";
import { Link } from "react-router-dom";
import ImgModal from "../../Modal/ImgModal/ImgModal";
import BtnOpenPopup from "../BtnOpenPopup/BtnOpenPopup";
import PostActions from "../PostActions/PostActions";
import "./ContentCard.scss";

export default function ContentCard({ postData, isComment = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="contentCard__box">
      <Link
        to={`/profile/${postData?.author?.id}`}
        className={isComment ? "contentCard__imgWrapper--line" : ""}
      >
        {postData?.author?.avatar ? (
          <img
            src={postData?.author?.avatar}
            className="contentCard__userScreensaver"
            alt={
              postData?.userName || "User" + " " + postData?.userLastName || ""
            }
          />
        ) : (
          <div className="contentCard__userScreensaver contentCard__userScreensaver--template"></div>
        )}
      </Link>

      <div className="contentCard__info">
        <div className="contentCard__infoHeader">
          <Link
            to={`/profile/${postData?.author?.id}`}
            className="contentCard__userName"
          >
            {`${postData?.author?.firstName || ""} ${
              postData?.author?.userLastName || ""
            }`.trim() || "User"}
          </Link>

          <span className="contentCard__userLogin">
            {postData?.author?.userName || "@userLogin"}
          </span>
          <span className="contentCard__postDate">
            {postData?.createdAt
              ? new Date(postData.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : new Date().toLocaleString()}
          </span>
          <div className="contentCard__btnWrapper"></div>

          <div className="btnOpenPopup__wrapper">{!isComment && <BtnOpenPopup postData = {postData}></BtnOpenPopup>}</div>
        </div>

        <Link to={`/post/${postData?.id}`} className="contentCard__infoWrapper">
          <p className="contentCard__text">{postData?.content}</p>
        </Link>
        {!isComment &&
          (postData?.attachment &&
            <img
              className="contentCard__imgPost"
              src={postData?.attachment}
              alt="post image"
              onClick={() => setIsModalOpen(true)}
            />
          )
          }
        {!isComment && (
          <PostActions
            postData={postData}
            isInBookmark={postData?.isInBookmarks}
          ></PostActions>
        )}
      </div>
      {isModalOpen && (
        <ImgModal
          img={postData}
          isInBookmark={postData?.isInBookmarks}
          setIsModalImgOpen={() => setIsModalOpen(false)}
        ></ImgModal>
      )}
    </div>
  );
}
