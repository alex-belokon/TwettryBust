import { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import PopupSidebarSearch from "../../Modal/Popup/PopupSidebarSearch";
import './SidebarSearch.scss';

export default function SidebarSearch() {
  const [isInputFocus, setIsInputFocus] = useState(false);

  return (
    <div className="searching">
      <div className="searching__inputWrapper">
        <HiOutlineMagnifyingGlass className="searching__iconGlass" />

        <input
          type="text"
          className="searching__field "
          placeholder="Searching"
          onChange={(e) => setSearchField(e.target.value)}
          maxLength="38"
          // value={searchField}
          onFocus={() => setIsInputFocus(true)}
        />

        {isInputFocus && <div className="popup__wrapper"><PopupSidebarSearch closePopup = {()=>setIsInputFocus(false)}></PopupSidebarSearch></div>}
        {/* {searchField && (
          <button className="searching__btnCross" onClick={clearField}>
            <RiCloseCircleFill />
          </button>
        )} */}
      </div>
    </div>
  );
}
