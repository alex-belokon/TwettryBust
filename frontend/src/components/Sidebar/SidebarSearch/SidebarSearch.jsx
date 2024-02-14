import { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import PopupSidebarSearch from "../../Modal/Popup/PopupSidebarSearch";
import { RiCloseCircleFill } from "react-icons/ri";
import "./SidebarSearch.scss";

export default function SidebarSearch() {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchField, setSearchField] = useState("");

  function clearField () {
    setSearchField('')
  }

  return (
    <div className="sidebarSearch">
      <div className="sidebarSearch__inputWrapper">
        <HiOutlineMagnifyingGlass className="sidebarSearch__iconGlass" />

        <input
          type="text"
          className="sidebarSearch__field"
          placeholder="Searching"
          onChange={(e) => setSearchField(e.target.value)}
          maxLength="38"
          value={searchField}
          onFocus={() => setIsInputFocus(true)}
        />

        {isInputFocus && (
          <div className="popup__wrapper">
            <PopupSidebarSearch
              closePopup={() => setIsInputFocus(false)}
            ></PopupSidebarSearch>
          </div>
        )}

        <button className="sidebarSearch__btnCross" onClick={clearField}>
          <RiCloseCircleFill />
        </button>
      </div>
    </div>
  );
}
