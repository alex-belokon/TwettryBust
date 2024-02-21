import Popup from "./Popup";
import Recommended from "../../Sidebar/Recommended/Recommended";

export default function PopupSidebarSearch({ closePopup, users = null }) {
  console.log("users", users);

  return (
    <Popup closePopup={closePopup}>
      {!users || users.length === 0 ? (
        <p className="popupSidebar__text">тут будуть ваші результати пошуку</p>
      ) : (
        users.map((user) => (
          <Recommended key={user.id} searchUser recommendUser={user} />
        ))
      )}
    </Popup>
  );
}
