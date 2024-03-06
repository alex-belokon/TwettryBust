import { useState } from "react";
import { Link } from "react-router-dom";
import ImgModal from "../../Modal/ImgModal/ImgModal";
import BtnOpenPopup from "../BtnOpenPopup/BtnOpenPopup";
import PostActions from "../PostActions/PostActions";
import { BiRepost } from "react-icons/bi";
import "./ContentCard.scss";
import RepostedUserData from "./repostedUserData/repostedUserData";
import UserAvatar from "../../UserAvatar/UserAvatar";

export default function ContentCard({ postData, isComment = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRepostedUserData, setShowRepostedUserData] = useState(false)

  const renderingData = postData.originalPost
    ? postData.originalPost
    : postData;
  const userPopupData = postData.originalPost
    ? postData
    : postData.originalPost;


  return (
    <div className="contentCard__box">
      {postData.originalPost && (
        <div className="postCard__reposted"  onMouseEnter={() => setShowRepostedUserData(true)} onMouseLeave={() => setShowRepostedUserData(false)}>
          <BiRepost />
          <span style={{ fontSize: "14px" }}>{userPopupData.author.userName} reposted</span>
          <Link to={`profile/${userPopupData.author.id}`} className="postCard__repostedUserData">
            <RepostedUserData userPopupData={userPopupData} showRepostedUserData={showRepostedUserData}></RepostedUserData>
          </Link>
        </div>
      )}

      <Link
        to={`/profile/${renderingData?.author?.id}`}
        className={
          isComment
            ? "contentCard__imgWrapper--line"
            : "contentCard__textDecoration"
        }
      >
        <UserAvatar userName={renderingData?.author?.userName} userAvatar={renderingData?.author?.avatar}></UserAvatar>
      </Link>

      <div className="contentCard__info">
        <div className="contentCard__infoHeader">
          <Link
            to={`/profile/${renderingData?.author?.id}`}
            className="contentCard__userName"
          >
            {`${renderingData?.author?.firstName || ""} ${
              renderingData?.author?.userLastName || ""
            }`.trim() || "User"}
          </Link>

          <span className="contentCard__userLogin">
            {renderingData?.author?.userName || "@userLogin"}
          </span>
          <span className="contentCard__postDate">
            {renderingData?.createdAt
              ? new Date(renderingData.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : new Date().toLocaleString()}
          </span>
          <div className="contentCard__btnWrapper"></div>

          <div className="btnOpenPopup__wrapper">
            {!isComment && (
              <BtnOpenPopup postData={renderingData}></BtnOpenPopup>
            )}
          </div>
        </div>

        <Link
          to={`/post/${renderingData?.id}`}
          className="contentCard__infoWrapper"
        >
          <p className="contentCard__text">{renderingData?.content}</p>
        </Link>
        {!isComment && renderingData?.attachment && (
          <img
            className="contentCard__imgPost"
            src={renderingData?.attachment}
            alt="post image"
            onClick={() => setIsModalOpen(true)}
          />
        )}
        {!isComment && (
          <PostActions
            renderingData={renderingData}
            postData={postData}
            isInBookmark={renderingData?.isInBookmarks}
          ></PostActions>
        )}
      </div>
      {isModalOpen && (
        <ImgModal
          img={renderingData}
          isInBookmark={renderingData?.isInBookmarks}
          setIsModalImgOpen={() => setIsModalOpen(false)}
        ></ImgModal>
      )}
    </div>
  );
}
