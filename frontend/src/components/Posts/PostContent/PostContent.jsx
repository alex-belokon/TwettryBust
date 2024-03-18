import PropTypes from "prop-types";
import { useRef, useState } from "react";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { useTranslation } from "react-i18next";
import UploadWidget from "../../UploadWidget";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "../PostContent/PostContent.style.scss";
import Circle from "./Circle";
import {  postCommentPost, postCreatePost } from "../../../api/posts";
import { addDelPost } from "../../../redux/changePost";
import { addDelComment } from "../../../redux/changeComment";
import { FaRegSmileBeam } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import UserAvatar from "../../UserAvatar/UserAvatar";

export default function PostContent({
  closeModal,
  placeholderText = false,
  showReplyingTo,
  showExtraContentOnFocus,
  additionalClass,
  classPostList,
  postFooterClass,
  postItemClass,
  textAreaClass,
  isReply = false,
  postDataId,
  setCommentCount,
  groupId = "",
}) {
  const { t } = useTranslation();
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTextareaFocused, setTextareaFocused] = useState(false);
  const userData = useSelector((state) => state.authUser.user);
  const [postImages, setPostImages] = useState("");
  const textArea = useRef(null);
  const userId = useSelector((state) => state.authUser.user.id);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const textareaInputHandler = (e) => {
    if (textArea.current) {
      textArea.current.style.height = "auto";
      textArea.current.style.height = `${e.target.scrollHeight}px`;
      textArea.current.style.maxHeight = `420px`;
    }
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  function addComment() {
    fetchAddComment();
    resetData();
    closeModal && closeModal();
    setCommentCount((prevState) => prevState + 1);
  }

  async function fetchAddComment() {
    const comment = {
      content: postContent,
      attachment: postImages,
      userId: userId,
      userName: userData.userName,
    };
    try {
      const data = await postCommentPost(postDataId, comment);
      dispatch(addDelComment());
    } catch (e) {
      console.log(e);
    }
  }

  const handlePostSubmit = async () => {
    setShowEmojiPicker(false);
    if (!postContent && !postImages) {
      setError(t("placeholder.post"));
      return;
    }
    console.log(groupId);
    const postData = {
      userId: userId,
      content: postContent,
      attachment: postImages,
      type: "string",
      originalPostId: "",
      communityId: groupId,
    };
    try {
      const response = await postCreatePost(postData);
      if (response) {
        setPostContent("");
        closeModal && closeModal();
        setPostImages("");
        dispatch(addDelPost());
      }

      setPostContent("");
      closeModal && closeModal();
    } catch (error) {
      console.error("Помилка при опублікуванні поста:", error);
    }
  };

  const resetData = () => {
    setPostContent("");
    closeModal && closeModal();
    setPostImages("");
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setPostContent((prevContent) => prevContent + emoji);
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleImageUpload = (imageUrl) => {
    setPostImages(imageUrl);
  };

  const handleFocus = () => {
    if (showExtraContentOnFocus) setTextareaFocused(true);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <CSSTransition
        in={isTextareaFocused && showReplyingTo}
        timeout={3000}
        classNames="replyingTo"
        unmountOnExit
      >
        <div className="replyingTo">Replying to {`${userData.userName}`}</div>
      </CSSTransition>

      <div className={`post__item ${postItemClass}`}>
        <UserAvatar
          userName={userData?.userName}
          userAvatar={userData.avatar}
        ></UserAvatar>
        <textarea
          className={`textarea ${textAreaClass}`}
          placeholder={placeholderText || `${t("placeholder.text")}`}
          value={postContent}
          onChange={handlePostChange}
          onInput={(e) => textareaInputHandler(e)}
          ref={textArea}
          maxLength={250}
          onFocus={handleFocus}
        />
        {error && <div className="error">{error}</div>}
      </div>
      {postImages && (
        <img className="postImg" src={postImages} alt={`postImg`} />
      )}
      <div className={`post__footer ${postFooterClass}`}>
        <CSSTransition
          in={isTextareaFocused || !showExtraContentOnFocus}
          timeout={3000}
          classNames="post__list"
          unmountOnExit
        >
          <ul
            className={`post__list ${
              isTextareaFocused ? "post__list--focused" : ""
            } ${classPostList}`}
          >
            <li>
              <div className="tooltip">
                <UploadWidget imgUrl={handleImageUpload}>
                  <AiOutlinePicture className="iconAddPost" />
                </UploadWidget>
                <p className="tooltip__text">Media</p>
              </div>
            </li>
            <li>
              <div className={`tooltip ${showEmojiPicker}`}>
                <button onClick={toggleEmojiPicker} className="btnEmoji">
                  <FaRegSmileBeam />
                </button>
                {showEmojiPicker && (
                  <div className="emojiPickerPost__wrapper">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      disableSearchBar
                      disableSkinTonePicker
                    />
                  </div>
                )}
                <p className="tooltip__text">Emoji</p>
              </div>
            </li>
          </ul>
        </CSSTransition>
        <div
          className={`buttonContainer ${
            isTextareaFocused ? "buttonContainer--focused" : ""
          } ${additionalClass}`}
        >
          <Circle text={postContent} borderColor={"#015366"} />
          <ModalBtn
            type="button"
            btnClick={!isReply ? handlePostSubmit : addComment}
            additionalClass="postBtn"
            ariaLabel="add new post"
          >
            {t(`${"btn.publish"}`)}
          </ModalBtn>
        </div>
      </div>
    </>
  );
}

PostContent.propTypes = {
  closeModal: PropTypes.func,
  placeholderText: PropTypes.string,
};
