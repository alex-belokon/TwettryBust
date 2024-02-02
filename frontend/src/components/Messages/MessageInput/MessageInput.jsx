import "./MessageInput.scss";
import { FaRegSmileBeam } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const textArea = useRef(null);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setMessageContent((prevContent) => prevContent + emoji);
  };

  const textareaInputHandler = (e) => {
    if (textArea.current && e.target.scrollHeight !== 28) {
      textArea.current.style.height = "auto";
      textArea.current.style.height = `${e.target.scrollHeight}px`;
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
          <button className="messageInput__btn">
            <AiOutlinePicture className="messageInput__icon" />
          </button>

          <button className="messageInput__btn" onClick={toggleEmojiPicker}>
            <FaRegSmileBeam className="messageInput__icon" />
          </button>
          <textarea
            type="text"
            className="messageInput__textarea"
            placeholder="Нове повідомлення"
            value={messageContent}
            onInput={(e) => textareaInputHandler(e)}
            onChange={handlePostChange}
            ref={textArea}
          />
          <button className="messageInput__btn">
            <VscSend className="messageInput__icon" />
          </button>
        </div>
      </div>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
          style={{ width: "500px" }}
        />
      )}
    </>
  );
}
