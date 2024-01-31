import { useState } from "react";
import ModalWrapper from "../ModalElements/ModalWrapper";
import "./ModalPost.style.scss";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import UploadWidget from "../../UploadWidget";
import { FcAddImage } from "react-icons/fc";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";

export default function ModalPost({ closeModal, bannerUrl, setBannerUrl }) {
  const { t } = useTranslation();
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userData = useSelector((state) => state.authUser.user);
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };
  const handlePostSubmit = () => {
    // тут має бути POST запит на сервер
    console.log("bannerUrl:", bannerUrl);
    if (bannerUrl) {
      setPostContent((prevContent) => prevContent + bannerUrl);
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
      <ModalWrapper closeModal={closeModal}>
        <RxCross2 className="post__crossBtn" onClick={closeModal} />
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
        </div>
        <div className="post__footer">
          <ul className="post__list">
            <li>
              <div className="tooltip">
                <UploadWidget imgUrl={setBannerUrl}>
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
      </ModalWrapper>
    </>
  );
}
