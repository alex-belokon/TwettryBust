import Popup from "./Popup";

export default function PopupSidebarSearch({ closePopup }) {
 
  return (
    <Popup closePopup={closePopup}>
      <p className="popupSidebar__text">тут будуть ваші результати пошуку</p>
    </Popup>
  );
}
