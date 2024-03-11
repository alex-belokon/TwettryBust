import Popup from "./Popup";
import Recommended from "../../Sidebar/Recommended/Recommended";
import { useTranslation } from "react-i18next";
export default function PopupSidebarSearch({ closePopup, users = null }) {
  const { t } = useTranslation();
  return (
    <Popup closePopup={closePopup} popupClass="popup--width">
      {!users || users.length === 0 ? (
        <p className="popupSidebar__text">{t("popup.searchResults")}</p>
      ) : (
        users.map((user) => (
          <Recommended
            closePopup={closePopup}
            key={user.id}
            searchUser
            recommendUser={user}
          />
        ))
      )}
    </Popup>
  );
}
