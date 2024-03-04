import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewDialog } from "../../../../api/messages";
import { avatarColor } from "../../../../utils/avatarColor";
import './NewDialogCard.scss';

export default function NewDialogCard ({user, closeModal, chats, setChats, setDataToNavigate}) {
  const currentUserId = useSelector((state) => state.authUser.user.id);

  async function createDialog (userId) {
    const existingChat = chats.find(elem => {
      return elem.creator.id === userId || elem.user.id === userId;
    });

    if (!existingChat){
      try {
        const data = await createNewDialog(currentUserId, user.id);
        console.log(data);
        setChats(prevState => [data, ...prevState]);
        const userId = currentUserId === data.creator.id ? data.user.id : data.creator.id;
        setDataToNavigate({chatId: data.id, userId: userId });
      } catch (e) {
        console.log(e);
      }
    } else {
      const userId = currentUserId === existingChat.creator.id ? existingChat.user.id : existingChat.creator.id;
      setDataToNavigate({chatId:existingChat.id, userId: userId })
    }

    closeModal();
  }

  return (
    <Link className="newDialogCard" onClick={()=>createDialog(user.id)} state={{ interlocutorId: user.id }}>
     {user.avatar 
      ? <img className="newDialogCard__img" src={user.avatar} alt={user.name} />
      : <div className={`newDialogCard__img newDialogCard__img--letter ${avatarColor(user?.userName?.[0] || user?.username?.[0] || '')}`}>
      {user?.userName?.[0] || user?.username?.[0] || ''}
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