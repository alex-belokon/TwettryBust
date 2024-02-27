import Popup from "./Popup";
import Recommended from "../../Sidebar/Recommended/Recommended";

export default function PopupSidebarSearch({ closePopup, users = null }) {
  
  return (
    <Popup closePopup={closePopup} popupClass='popup--width'>
      {!users || users.length === 0 ? (
        <p className="popupSidebar__text">тут будуть ваші результати пошуку</p>
      ) : (
        users.map((user) => (
          <Recommended key={user.userId} searchUser recommendUser={user} />
        ))
      )}
    </Popup>
  );
}
