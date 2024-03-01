import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createNewDialog } from "../../../../api/messages";
import { avatarColor } from "../../../../utils/avatarColor";
import './NewDialogCard.scss';

export default function NewDialogCard ({user, closeModal, chats, setChats}) {
  const currentUserId = useSelector((state) => state.user.user.id);
  const navigate = useNavigate();

  async function createDialog (userId) {
    const existingChat = chats.find(elem => {
      return elem.creator.id === userId || elem.user.id === userId;
    });

    if (!existingChat){
      try {
        const data = await createNewDialog(currentUserId, userId);
        setChats(data);
      } catch (e) {
        console.log(e);
      }
    } else {
      
    }

    closeModal();
  }

  return (
    <Link className="newDialogCard" onClick={()=>createDialog(user.id)} state={{ interlocutorId: user.id }}>
     {user.avatar 
      ? <img className="newDialogCard__img" src={user.avatar} alt={user.name} />
      : <div className={`newDialogCard__img newDialogCard__img--letter ${avatarColor(user.userName.split('')[0])}`}>
      {user.userName.split('')[0] || user.username?.split('')[0]}
    </div>
    
      } 
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