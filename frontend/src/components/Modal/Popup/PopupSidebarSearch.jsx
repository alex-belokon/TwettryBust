import Popup from "./Popup";

export default function PopupSidebarSearch({ closePopup }) {
  return (
    <Popup closePopup={closePopup}>
      <div style={{backgroundColor: 'red'}}>
        <p>тут будуть ваші результати пошуку</p>
      </div>
    </Popup>
  );
}
