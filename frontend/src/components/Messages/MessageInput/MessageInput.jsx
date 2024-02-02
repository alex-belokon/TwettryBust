import "./MessageInput.scss";
import { FaRegSmileBeam } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import UploadWidget from "../../UploadWidget";

export default function MessageInput({ setMarginMessageList }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [imgUrl, setImgUrl] = useState('')
  const textArea = useRef(null);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const closeEmojiPicker = (e) => {
    if (e.target.className === "emojiPicker__wrapper") {
      setShowEmojiPicker(false);
    }
  };
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setMessageContent((prevContent) => prevContent + emoji);
  };

  const textareaInputHandler = (e) => {
    if (
      textArea.current &&
      e.target.scrollHeight !== 28 &&
      e.target.scrollHeight < 138
    ) {
      textArea.current.style.height = "auto";
      textArea.current.style.height = `${e.target.scrollHeight}px`;
      setMarginMessageList(e.target.scrollHeight);
      textArea.current.style.maxHeight = `170px`;
    }
    if (e.target.scrollHeight === 49) {
      textArea.current.style.height = `28px`;
    }
  };
  const handlePostChange = (e) => {
    setMessageContent(e.target.value);
  };

  return (
    <>
      <div className="messageInput__wrapper">
        <div className="messageInput__content">
            <UploadWidget className='messageInput__btn' imgUrl={setImgUrl}>
              <AiOutlinePicture className="messageInput__icon" />
            </UploadWidget>

          <button className="messageInput__btn" onClick={toggleEmojiPicker}>
            <FaRegSmileBeam className="messageInput__icon" />
          </button>
          {showEmojiPicker && (
            <div
              className="emojiPicker__wrapper"
              onClick={(e) => closeEmojiPicker(e)}
            >
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                disableSearchBar
                disableSkinTonePicker
                style={{ width: "500px" }}
              />
            </div>
          )}
          {imgUrl && <img className="messageImg" src={imgUrl} />}
          

          <textarea
            type="text"
            className="messageInput__textarea"
            placeholder="Нове повідомлення"
            value={messageContent}
            onClick={() => setShowEmojiPicker(false)}
            onInput={(e) => textareaInputHandler(e)}
            onChange={handlePostChange}
            ref={textArea}
          />
          <button className="messageInput__btn">
            <VscSend className="messageInput__icon" />
          </button>
        </div>
      </div>
    </>
  );
}
