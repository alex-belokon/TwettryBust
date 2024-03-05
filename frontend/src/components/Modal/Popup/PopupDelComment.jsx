import { GoCircleSlash } from "react-icons/go";
import { deletePostComment } from "../../../api/posts";
import { useDispatch } from "react-redux";
import { addDelComment } from "../../../redux/changeComment";

import Popup from "./Popup";

export default function PopupDelComment({
  closePopup,
  commentId,
  comment,
  currentUserId,
  postData,
}) {

  const dispatch = useDispatch();
  console.log('PopupDelComment props:', {closePopup, commentId, comment, currentUserId, postData});

  const isCommentAuthor = comment.userId === currentUserId;
  const isPostAuthor = postData.author.id === currentUserId;

  console.log('isCommentAuthor:', isCommentAuthor);
  console.log('isPostAuthor:', isPostAuthor);

  const handleDelete = async () => {
    if (isCommentAuthor || isPostAuthor) {
      await deletePostComment(comment.postId, commentId);
      closePopup();
      dispatch(addDelComment());
    }
  };

  return (
    <Popup closePopup={closePopup} popupClass="popupRight">
      {(isCommentAuthor || isPostAuthor) && (
        <div className="popupPost__item" onClick={handleDelete}>
          <GoCircleSlash className="popupPost__icon" />
          <span className="popupPost__itemText popupPost__itemText--noWrap">
            Видалити коментар
          </span>
        </div>
      )}
    </Popup>
  );
}