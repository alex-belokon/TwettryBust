import "./MessageInput.scss";
import { FaRegSmileBeam } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import UploadWidget from "../../UploadWidget";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { postNewMessages } from "../../../api/messages";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { clearState, sendDataChat } from "../../../redux/chatWebSocket";

export default function MessageInput({
  setMarginMessageList,
  setDialog,
  chatMessages,
  recipientId,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const textArea = useRef(null);
  const imgWrapper = useRef(null);
  const userId = useSelector((state) => state.authUser.user.id);
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
      if (imgWrapper.current) {
        imgWrapper.current.style.bottom = `${e.target.scrollHeight + 25}px`;
      }
    }
    if (e.target.scrollHeight === 28) {
      textArea.current.style.height = `28px`;
      if (imgWrapper.current) {
        imgWrapper.current.style.bottom = `${e.target.scrollHeight + 25}px`;
      }
    }
  };

  const handlePostChange = (e) => {
    setMessageContent(e.target.value);
  };

  function sendMessage(e) {
    if ((messageContent.trim() !== "" && e.type === 'click') || (messageContent.trim() !== "" && e.code === 'Enter')) {
      event.preventDefault();
      const message = {
        senderId: {
          id: userId,
        },
        content: messageContent,
        chatId: id,
        imageURL: imgUrl || null,
        date: new Date(),
      };
      addNewMessage(message);
      setShowEmojiPicker(false);
      resetAll();
    }
  }

  async function addNewMessage(message) {
    const chatMessagesDialog = chatMessages.length !== 0 ? chatMessages : [];
    chatMessagesDialog.length !== 0 &&
      dispatch(clearState(chatMessages.filter((elem) => elem.chatId !== id)));
    try {
      const data = await postNewMessages(message);
      setDialog((dialog) => [...dialog, ...chatMessagesDialog, data]);
      dispatch(sendDataChat({ ...message, recipientId: recipientId }));
    } catch (e) {
      console.log(e);
    }
  }

  function resetAll() {
    setMessageContent("");
    setImgUrl("");
    textArea.current.style.height = `28px`;
    setMarginMessageList(45);
  }

  return (
    <>
      <div className="messageInput__wrapper">
        <div className="messageInput__content">
          <UploadWidget
            className="messageInput__btn"
            imgUrl={setImgUrl}
            ariaLabel="add picture"
          >
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
          {imgUrl && (
            <div className="messageImg__wrapper" ref={imgWrapper}>
              <img className="messageImg" src={imgUrl} />
              <button
                className="messageInput__imgBtn"
                aria-label="delete image"
                onClick={() => setImgUrl("")}
              >
                <RxCross2 />
              </button>
            </div>
          )}

          <textarea
            type="text"
            className="messageInput__textarea"
            placeholder={t("messages.nweMessage")}
            value={messageContent}
            onClick={() => setShowEmojiPicker(false)}
            onInput={(e) => textareaInputHandler(e)}
            onChange={handlePostChange}
            onKeyDown={(e)=>sendMessage(e)}
            ref={textArea}
          />
          <button className="messageInput__btn" onClick={(e)=>sendMessage(e)}>
            <VscSend className="messageInput__icon" />
          </button>
        </div>
      </div>
    </>
  );
}
