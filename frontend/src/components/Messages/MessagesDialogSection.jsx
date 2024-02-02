import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserMessages } from "../../api/messages";
import MessageInput from "./MessageInput/MessageInput";
import MessagesDialogHeader from "./MessagesDialogHeader/MessagesDialogHeader";

export default function MessagesDialogSection() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [dialog, setDialog] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try{
        const data = await getUserMessages(id, currentUserId);
        setDialog(data)
      }
      catch(e){
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  

  return (
    <div className="messagesDialogSection">
      <MessagesDialogHeader></MessagesDialogHeader>

      <ul className="messagesDialogSection__messageList">
        {dialog.map((item, index) =>
          item.userId === currentUserId ? (
            <li className="messagesDialogSection__message" key={index}>{item.message} <span className="messagesDialogSection__date">{new Date(item.date).toLocaleString()}</span></li>
          ) : (
            <li className="messagesDialogSection__message--accent" key={index}>{item.message} <span className="messagesDialogSection__date">{new Date(item.date).toLocaleString()}</span></li>
          )
        )}
      </ul>

      <MessageInput></MessageInput>
    </div>
  );
}
