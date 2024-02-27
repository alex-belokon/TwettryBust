import { RiCloseCircleFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import "./searching.style.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Searching({
  setIsInputFocus,
  isInputFocus = false,
  placeholder,
  setSearchingData,
  searchingData,
  isItModal = false,
}) {
  const userId = useSelector((state) => state.authUser.user.id);

  useEffect(() => {
    async function fetchData() {
      if (searchingData.trim() !== "" && setSearchingData) {
        setSearchingData(searchingData);
      }
    }
    fetchData();
  }, [searchingData]);


  function handleBtnArrow() {
    setSearchingData("");
    setIsInputFocus(false);
  }

  function inputFocus() {
    setIsInputFocus(true);
  }

  function clearField() {
    setSearchingData("");
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
          className={
            isItModal
              ? "searching__field searching__field--noBorder"
              : "searching__field"
          }
          placeholder={placeholder}
          onChange={(e) => setSearchingData(e.target.value)}
          maxLength="38"
          value={searchingData}
          onFocus={() => inputFocus()}
        />
        {searchingData && (
          <button className="searching__btnCross" onClick={clearField}>
            <RiCloseCircleFill />
          </button>
        )}
      </div>
    </div>
  );
}
