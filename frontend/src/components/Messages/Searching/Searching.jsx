import { RiCloseCircleFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import "./searching.style.scss";
import { useState } from "react";

export default function Searching({ placeholder }) {
  const [searchField, setSearchField] = useState("");
  const [focus, setFocus] = useState(false);

  function handleBtnArrow (){
    setSearchField("");
    setFocus(false)
  }

  return (
    <div className="searching">
      {focus && (
        <button className="searching__btnArrow" onClick={() => handleBtnArrow()}>
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
          maxLength = '38'
          value={searchField}
          onFocus={()=>setFocus(true)}
        />
        {searchField && (
          <button
            className="searching__btnCross"
            onClick={() => setSearchField("")}
          >
            <RiCloseCircleFill />
          </button>
        )}
      </div>
    </div>
  );
}
