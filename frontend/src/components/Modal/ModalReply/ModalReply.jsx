import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ContentCard from "../../Posts/ContentCard/ContentCard";
import PostContent from "../../Posts/PostContent/PostContent";
import ModalWrapper from "../ModalElements/ModalWrapper";
import "./ModalReply.scss";

export default function ModalReply({ closeModal, postData, setCommentCount }) {
  const { t } = useTranslation();

  return (
    <ModalWrapper closeModal={closeModal} showCloseIcon>
      <Link className="modalReply__btn" to={`/post/${postData.id}`} onClick={closeModal}>{t("btn.postDetails")}</Link>
      <div style={{ marginTop: "15px" }}>
        <ContentCard postData={postData} isComment></ContentCard>
      </div>
      <div className="userAnswer">
        <PostContent placeholderText='Post your reply' setCommentCount={setCommentCount} postDataId = {postData.id} isReply closeModal={closeModal}></PostContent>
      </div>
    </ModalWrapper>
  );
}
