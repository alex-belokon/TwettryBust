import { BiRepost } from "react-icons/bi";
import { postCreatePost } from "../../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { addDelPost } from "../../../redux/changePost";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function PopupRepost({ closePopup, postData }) {
  const currentUser = useSelector((state) => state.authUser.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();


  function repost () {
    fetchRepost();
    closePopup()
  }

  async function fetchRepost () {
    const fetchData = {
      userId: currentUser.id,
      content: postData.content,
      attachment: postData.attachment,
      originalPostId: postData.id
    }
    try{
      const data = await postCreatePost(fetchData);
      dispatch(addDelPost())
    } catch (e) {
      console.log(e);
    }
  } 

  return (
    <Popup closePopup={closePopup}>
      <div className="popupRepost__wrapper" onClick={repost}>
        <BiRepost style={{fontSize: '20px'}}/> Repost
      </div>
    </Popup>
  );
}
