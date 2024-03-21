import { GoCircleSlash } from "react-icons/go";
import { deletePostComment } from "../../../api/posts";
import { useTranslation } from "react-i18next";

import Popup from "./Popup";

export default function PopupDelComment({
  closePopup,
  commentId,
  comment,
  currentUserId,
  postData,
  setComments,
  setCountCommentDetails
}) {
  const { t } = useTranslation();

  const isCommentAuthor = comment.userId === currentUserId;
  const isPostAuthor = postData.author.id === currentUserId;

  const handleDelete = async () => {
    if (isCommentAuthor || isPostAuthor) {
      await deletePostComment(comment.postId, commentId);
      closePopup();
      console.log('Deleting comment with id:', commentId);
      setComments(prevComment => prevComment.filter(comment => comment.id !== commentId));
      console.log(setCountCommentDetails);
      setCountCommentDetails(prevCount => {console.log(prevCount); return prevCount - 1});
    }
  };

  return (
    <Popup closePopup={closePopup} popupClass="popupRight">
      {(isCommentAuthor || isPostAuthor) && (
        <div className="popupPost__item" onClick={handleDelete}>
          <GoCircleSlash className="popupPost__icon" />
          <span className="popupPost__itemText popupPost__itemText--noWrap">
            {t("delete.comment")}
          </span>
        </div>
      )}
    </Popup>
  );
}