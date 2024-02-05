import PostContent from "../../Posts/PostContent/PostContent";
import ModalWrapper from "../ModalElements/ModalWrapper";
import './ModalPost.scss';

export default function ModalPost({ closeModal }) {
  return (
    <>
      <ModalWrapper closeModal={closeModal} showCloseIcon>
        <div className="modalPost__wrapper">
          <PostContent closeModal={closeModal}/>
        </div>
      </ModalWrapper>
    </>
  );
}
