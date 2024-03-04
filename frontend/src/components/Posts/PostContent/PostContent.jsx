import PropTypes from "prop-types";
import { useRef, useState } from "react";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { useTranslation } from "react-i18next";
import UploadWidget from "../../UploadWidget";
// import { FcAddImage } from "react-icons/fc";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "../PostContent/PostContent.style.scss";
import Circle from "./Circle";
import { getCreatePost, postCommentPost } from "../../../api/posts";
import { addDelPost } from '../../../redux/changePost';
import { FaRegSmileBeam } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { avatarColor } from "../../../utils/avatarColor";

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
  isReply=false,
  postDataId,
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

  function addComment () {
    console.log('addComment');
    fetchAddComment();
    resetData();
    closeModal && closeModal();
  }

  async function fetchAddComment () {
    const comment = {
      content: postContent,
      attachment: postImages,
      userId: userId
    }
    try{
      const data = await postCommentPost(postDataId, comment);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  const handlePostSubmit = async () => {
    setShowEmojiPicker(false);
    if (!postContent && !postImages) {
      setError("Пост не може бути порожнім");
      return;
    }
    const postData = {
      userId: userId,
      content: postContent,
      attachment: postImages,
      type: "string",
      originalPostId: "",
    };
    try {
      const response = await getCreatePost(postData);
       if(response) {
        setPostContent("");
        closeModal && closeModal();
        setPostImages('');
        dispatch(addDelPost())
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
    setPostImages('');  
  }

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
        <div className="replyingTo">Replying to {`${userData.userLogin}`}</div>
      </CSSTransition>
      <div className={`post__item ${postItemClass}`}>
        {userData.avatar ? (
          <img
            className="userData__img"
            src={userData.avatar}
            alt="user photo"
          />
        ) : (
          <span
            className={`userData__initials ${avatarColor(
              userData?.userName?.[0] || "U"
            )}`}
          >
            {`${userData?.userName}`?.[0] || "U"}
          </span>
        )}

        <textarea
          className={`textarea ${textAreaClass}`}
          placeholder={placeholderText || `${t("placeholder.text")}`}
          value={postContent}
          onChange={handlePostChange}
          onInput={(e) => textareaInputHandler(e)}
          ref={textArea}
          maxLength={3000}
          onFocus={handleFocus}
        />
        {error && <div className="error">{error}</div>}
      </div>
      {/* {postImages.map((image, index) => ( */}
      {postImages && (
        <img className="postImg" src={postImages} alt={`postImg`} />
      )}
      {/* ))} */}
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
