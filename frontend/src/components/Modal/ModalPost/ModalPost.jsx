import PostContent from "../../Posts/PostContent/PostContent";
import ModalWrapper from "../ModalElements/ModalWrapper";
export default function ModalPost({ closeModal }) {
  return (
    <>
      <ModalWrapper closeModal={closeModal} showCloseIcon>

        <PostContent closeModal={closeModal} />

      </ModalWrapper>
    </>
  );
}
