import { useState } from "react";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { useTranslation } from "react-i18next";
import UploadWidget from "../../UploadWidget";
import { FcAddImage } from "react-icons/fc";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import "../PostContent/PostContent.style.scss";
import Circle from "./Circle";

export default function PostContent({ closeModal }) {
  const { t } = useTranslation();
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userData = useSelector((state) => state.authUser.user);
  const [postImages, setPostImages] = useState([]);
  console.log("postImage:", postImages);

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };
  const handlePostSubmit = () => {
    // тут має бути POST запит на сервер
    if (postImages.length > 0) {
      setPostContent((prevContent) => prevContent + postImages.join(""));
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

  const handleImageUpload = (imageUrl) => {
    setPostImages((prevImages) => [...prevImages, imageUrl]);
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

          maxLength={3000}
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
      <div className="post__footer">
        <ul className="post__list">
          <li>
            <div className="tooltip">
              <UploadWidget imgUrl={handleImageUpload}>

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
        </ul>

        <div className="buttonContainer">
          <Circle text={postContent} borderColor={"#000000"} />
          <ModalBtn
            type="button"
            btnClick={handlePostSubmit}
            additionalClass="postBtn"
          >
            {t(`${"btn.publish"}`)}
          </ModalBtn>
        </div>

      </div>
    </>
  );
}
