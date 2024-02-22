import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getChatMessages } from "../../api/messages";
import SkeletonMessagesDialog from "../../skeletons/SkeletonMessagesDialog";
import MessageInput from "./MessageInput/MessageInput";
import MessagesDialogHeader from "./MessagesDialogHeader/MessagesDialogHeader";
import DialogList from "./DialogList";

export default function MessagesDialogSection() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [dialog, setDialog] = useState(null);
  const [marginMessageList, setMarginMessageList] = useState(45);
  const [messageList, setMessageList] = useState(null);
  const messageContainer = useRef(0);
  const location = useLocation();
  const interlocutorUserId = location.state.interlocutorId;

  console.log('interlocutorUserId', interlocutorUserId);

  useEffect(() => {
    setDialog(null);
    async function fetchData() {
      try {
        const data = await getChatMessages(id);
        setDialog(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop = messageList;
    }
  }, [dialog, messageList]);

  return (
    <>
      {!dialog && <SkeletonMessagesDialog></SkeletonMessagesDialog>}
      {dialog && (
        <div className="messagesDialogSection" ref={messageContainer}>
          <MessagesDialogHeader interlocutorUserId={interlocutorUserId}></MessagesDialogHeader>
          <DialogList
            setMessageList={setMessageList}
            dialog={dialog}
            marginMessageList={marginMessageList}
            currentUserId={currentUserId}
            setDialog={setDialog}
          ></DialogList>

          <MessageInput
            setDialog={setDialog}
            setMarginMessageList={setMarginMessageList}
          ></MessageInput>
        </div>
      )}
    </>
  );
}
