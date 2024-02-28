import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewDialog } from "../../../../api/messages";
import './NewDialogCard.scss';

export default function NewDialogCard ({user, closeModal}) {
  const userId = useSelector((state) => state.user.user.id);
  const [chatIdd, setChatId] = useState(null);

  async function createDialog () {
    try {
      const data = await createNewDialog(userId, 'e093f934-b96e-4889-b279-fc87a22ca391');
      setChatId(data.chatId);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Link className="newDialogCard" onClick={createDialog}>
     {user.avatar 
      ? <img className="newDialogCard__img" src={user.avatar} alt={user.name} />
      : <div className="newDialogCard__img newDialogCard__img--letter">{`${user.username}`.split("")[0]}</div>} 
      <div className="newDialogCard__textWrapper">
        <div>
          <p className="newDialogCard__title"  title={user.firstName && user.lastName && `${user.firstName} ${user.lastName}`}>
            {user.firstName} {user.lastName}
          </p>
          <span className="newDialogCard__login" title={`${user.username}`}>{user.userName}</span>
        </div>
        <p className="newDialogCard__lastMessage">{user.lastMessage}</p>
      </div>
    </Link>
  )
}