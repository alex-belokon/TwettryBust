import { useState } from "react";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { useTranslation } from "react-i18next";
import UploadWidget from "../../UploadWidget";
import { FcAddImage } from "react-icons/fc";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import "../PostContent/PostContent.style.scss";
export default function PostContent() {
  const { t } = useTranslation();
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userData = useSelector((state) => state.authUser.user);
  const [postImage, setPostImage] = useState(null);
  console.log("postImage:", postImage);
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };
  const handlePostSubmit = () => {
    // тут має бути POST запит на сервер

    if (postImage) {
      setPostContent((prevContent) => prevContent + postImage);
    }
    console.log("Опублікувати пост:", postContent);
    setPostContent("");
    closeModal();
  };
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setPostContent((prevContent) => prevContent + emoji);
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <>
      <div className="post__item">
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
          className="textarea"
          placeholder={t("placeholder.text")}
          value={postContent}
          onChange={handlePostChange}
          rows="4"
          cols="50"
        />
        {postImage && <img src={postImage} alt="cup" />}
      </div>
      <div className="post__footer">
        <ul className="post__list">
          <li>
            <div className="tooltip">
              <UploadWidget imgUrl={setPostImage}>
                <FcAddImage className="iconAddPost" />
              </UploadWidget>
              <p className="tooltip__text">Media</p>
            </div>
          </li>
          <li>
            <div className="tooltip">
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
        </ul>{" "}
        <ModalBtn
          type="button"
          btnClick={handlePostSubmit}
          additionalClass="postBtn"
        >
          {t(`${"btn.publish"}`)}
        </ModalBtn>
      </div>
    </>
  );
}
