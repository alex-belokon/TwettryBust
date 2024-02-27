import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import PopupPost from "../../Modal/Popup/PopupPost";
import './BtnOpenPopup.scss';

export default function BtnOpenPopup({postData}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  return (
    <button type="button" className="contentCard__infoHeaderBtn">
      <GoKebabHorizontal
        className="contentCard__icon"
        onClick={() => setIsPopupOpen(true)}
      />
      {isPopupOpen && (
        <PopupPost closePopup={() => setIsPopupOpen(false)} postData={postData}></PopupPost>
      )}
    </button>
  );
}
