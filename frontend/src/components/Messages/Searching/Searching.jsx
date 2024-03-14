import { RiCloseCircleFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
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
  setSearchChats,
}) {
  const navigate = useNavigate();

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
    setSearchChats && setSearchChats(null)
  }

  function inputFocus() {
    setIsInputFocus(true);
    navigate('/messages');
  }

  function clearField() {
    setSearchingData("");
    setSearchChats(null)
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
