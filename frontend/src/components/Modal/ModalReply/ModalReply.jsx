import { useSelector } from "react-redux";
import ContentCard from "../../Posts/ContentCard/ContentCard";
import PostCard from "../../Posts/PostCard/PostCard";
import ModalWrapper from "../ModalElements/ModalWrapper";
import './ModalReply.scss';

export default function ModalReply({ closeModal }) {
  const userData = useSelector(state => state.authUser.user);

  const postData = {
    imgUrl:
      "https://res.cloudinary.com/dfrps0cby/image/upload/v1706292731/ronx3qzcgcif1loe6mor.jpg",
    userScreensaver:
      "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores.",
    userName: "QQQQQ",
    userLastName: "QQQQQ",
    postDate: new Date(),
    userLogin: "@login",
    reply: 1,
    repost: 0,
    likes: 555,
    view: 10000,
    isInBookmark: true,
    id: 2,
  };

  return (
    <ModalWrapper closeModal={closeModal} showCloseIcon>
      <div style={{marginTop: '15px'}}>
        <ContentCard postData={postData} isComment></ContentCard>
      </div>
      <div className="userAnswer">
      <div className="userAnswer__screensaver" onClick={() => setIsPopupOpen(true)}>
          {userData.userScreensaver ? (
            <img className="userAnswer__img" src={userData.userScreensaver} alt={userData.name + " photo"} />
          ) : (
            <span>{`${userData.name}`.split("")[0]}</span>
          )}
        </div>

      <textarea className="userAnswer__textarea" placeholder="Опублікувати відповідь"></textarea>

      </div>

    </ModalWrapper>
  );
}
