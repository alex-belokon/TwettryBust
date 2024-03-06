import { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import PopupSidebarSearch from "../../Modal/Popup/PopupSidebarSearch";
import { RiCloseCircleFill } from "react-icons/ri";
import "./SidebarSearch.scss";
import { useEffect } from "react";
import { findUser } from "../../../api/profile";
import { useTranslation } from "react-i18next";

export default function SidebarSearch() {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [users, setUsers] = useState(null)
const { t } = useTranslation();
  useEffect(()=>{
    if(searchField.trim() === ''){
      return;
    }
    searchUsers();
  }, [searchField])

  async function searchUsers () {
    try {
      const data = await findUser(searchField);
      setUsers(data)
    } catch (e) {
      console.log(e);
    }
  }

  function resetSearch() {
    setSearchField('');
    setUsers(null);
  }

  return (
    <div className="sidebarSearch">
      <div className="sidebarSearch__inputWrapper">
        <HiOutlineMagnifyingGlass className="sidebarSearch__iconGlass" />

        <input
          type="text"
          className="sidebarSearch__field"
          placeholder={t("placeholder.text3")}
          onChange={(e) => setSearchField(e.target.value)}
          maxLength="38"
          value={searchField}
          onFocus={() => setIsInputFocus(true)}
        />

        {isInputFocus && (
          <div className="popup__wrapper">
            <PopupSidebarSearch
              closePopup={() => setIsInputFocus(false)}
              users={users}
            ></PopupSidebarSearch>
          </div>
        )}

        <button className="sidebarSearch__btnCross" onClick={resetSearch}>
          <RiCloseCircleFill />
        </button>
      </div>
    </div>
  );
}
