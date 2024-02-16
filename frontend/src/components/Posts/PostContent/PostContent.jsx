import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { useTranslation } from "react-i18next";
import UploadWidget from "../../UploadWidget";
import { FcAddImage } from "react-icons/fc";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "../PostContent/PostContent.style.scss";
import Circle from "./Circle";
import {getCreatePost} from "../../../api/posts";

export default function PostContent({
  closeModal,
  placeholderText = false,
  showReplyingTo,
  showExtraContentOnFocus,
  additionalClass,
  classPostList,
  postFooterClass,
  postItemClass,
  textAreaClass

}) {
  const { t } = useTranslation();
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTextareaFocused, setTextareaFocused] = useState(false);
  const userData = useSelector((state) => state.authUser.user);
  const [postImages, setPostImages] = useState([]);
  const textArea = useRef(null);

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
  // const handlePostSubmit = () => {
  //   // тут має бути POST запит на сервер
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const data = await getCreatePost(postContent);
  //         setPostContent(data);
  //       } catch (error) {
  //         console.error("Помилка при отриманні даних:", error);
  //       }
  //     }
  //     fetchData();
  //     }, [postContent]);
    
  //   if (postImages.length > 0) {
  //     setPostContent((prevContent) => prevContent + postImages.join(""));
  //   }
  //   console.log("Опублікувати пост:", postContent);
  //   setPostContent("");
  //   closeModal();
  // };
  const handlePostSubmit = async () => {
    const postData = {
      userId: "388988c0-d9dc-4a28-b28c-f3422793cf67",
      content: "string",
      attachment: "string",
      type:"string",
      originalPostId: "",
    };
    console.log("Опублікувати пост:", postData);
    try {
      const response = await getCreatePost(postData);
      console.log("Відповідь від сервера:", response);

      if (postImages.length > 0) {
        setPostContent((prevContent) => prevContent + postImages.join(""));
      }
      console.log("Опублікувати пост:", postData);
      setPostContent("");
      closeModal();
    } catch (error) {
      console.error("Помилка при опублікуванні поста:", error);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setPostContent((prevContent) => prevContent + emoji);
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleImageUpload = (imageUrl) => {
    setPostImages((prevImages) => [...prevImages, imageUrl]);
  };

  const handleFocus = () => {
    if (showExtraContentOnFocus) 
    setTextareaFocused(true);
  };
  return (
    <>
      <CSSTransition
        in={isTextareaFocused && showReplyingTo}
        timeout={3000}
        classNames="replyingTo"
        unmountOnExit
      >
          <div className="replyingTo">
            Replying to {`${userData.userLogin}`}
          </div>
      </CSSTransition>
      <div className={`post__item ${postItemClass}`}>
        {userData.userScreensaver ? (
          <img
            className="userData__img"
            src={userData.userScreensaver}
            alt={userData.name + " photo"}
          />
        ) : (
          <span className="userData__initials">
            {`${userData.name}`.split("")[0]}
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
      </div>
      {postImages.map((image, index) => (
        <img
          key={index}
          className="postImg"
          src={image}
          alt={`postImg-${index}`}
        />
      ))}
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
                  <FcAddImage className="iconAddPost" />
                </UploadWidget>
                <p className="tooltip__text">Media</p>
              </div>
            </li>
            <li>
              <div className={`tooltip ${showEmojiPicker}`}>
                <button onClick={toggleEmojiPicker} className="btnEmoji">
                  🙂
                </button>
                {showEmojiPicker && (
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                  />
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
            btnClick={handlePostSubmit}
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
