import { RiCloseCircleFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import "./searching.style.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getUserDialogs } from "../../../api/messages";
import { useSelector } from "react-redux";

export default function Searching({
  setIsInputFocus,
  isInputFocus,
  placeholder,
  setSearchingData,
  setChats,
}) {
  const [searchField, setSearchField] = useState("");
  const userId = useSelector((state) => state.authUser.user.id);

  useEffect(() => {
    async function fetchData() {
      if (searchField.trim() !== "") {
        setSearchingData(searchField);
      }
    }
    fetchData();
  }, [searchField]);

  async function fetchUserDialogs() {
    try {
      const data = await getUserDialogs(userId);
      setChats(data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleBtnArrow() {
    setSearchField("");
    setIsInputFocus(false);
    fetchUserDialogs();
  }

  function inputFocus() {
    setChats(null);
    setIsInputFocus(true);
  }

  function clearField () {
    setSearchField("");
    setChats(null);
  }

  return (
    <div className="searching">
      {isInputFocus && (
        <button
          className="searching__btnArrow"
          onClick={() => handleBtnArrow()}
        >
          <FaArrowLeftLong />
        </button>
      )}

      <div className="searching__inputWrapper">
        <HiOutlineMagnifyingGlass className="searching__iconGlass" />

        <input
          type="text"
          className="searching__field"
          placeholder={placeholder}
          onChange={(e) => setSearchField(e.target.value)}
          maxLength="38"
          value={searchField}
          onFocus={() => inputFocus()}
        />
        {searchField && (
          <button
            className="searching__btnCross"
            onClick={clearField}
          >
            <RiCloseCircleFill />
          </button>
        )}
      </div>
    </div>
  );
}
