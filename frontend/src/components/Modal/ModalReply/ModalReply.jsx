import { useSelector } from "react-redux";
import ContentCard from "../../Posts/ContentCard/ContentCard";
import PostContent from "../../Posts/PostContent/PostContent";
import ModalWrapper from "../ModalElements/ModalWrapper";
import "./ModalReply.scss";

export default function ModalReply({ closeModal, postData }) {

  return (
    <ModalWrapper closeModal={closeModal} showCloseIcon>
      <div style={{ marginTop: "15px" }}>
        <ContentCard postData={postData} isComment></ContentCard>
      </div>
      <div className="userAnswer">
        <PostContent placeholderText='Post your reply'></PostContent>
      </div>
    </ModalWrapper>
  );
}
