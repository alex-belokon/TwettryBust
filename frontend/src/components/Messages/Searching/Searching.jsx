import { RiCloseCircleFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import "./searching.style.scss";
import { useState } from "react";
import { useEffect } from "react";
import { searchUser } from "../../../api/messages";
// import { searchUser } from "../../../api/messages";

export default function Searching({setIsInputFocus, isInputFocus}) {
  const [searchField, setSearchField] = useState("");

  useEffect(()=>{
    async function fetchData() {
      if(searchField.trim() !== ''){
        try {
          const data = await searchUser(searchField);
          console.log(data);
        } catch (e) {
          console.error(e)
        }
      }
    }
    fetchData();
  }, [searchField])

  function handleBtnArrow (){
    setSearchField("");
    setIsInputFocus(false)
  }

  return (
    <div className="searching">
      {isInputFocus && (
        <button className="searching__btnArrow" onClick={() => handleBtnArrow()}>
          <FaArrowLeftLong />
        </button>
      )}

      <div className="searching__inputWrapper">
        <HiOutlineMagnifyingGlass className="searching__iconGlass" />

        <input
          type="text"
          className="searching__field"
          placeholder="Search Direct Messages"
          onChange={(e) => setSearchField(e.target.value)}
          maxLength = '38'
          value={searchField}
          onFocus={()=>setIsInputFocus(true)}
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
