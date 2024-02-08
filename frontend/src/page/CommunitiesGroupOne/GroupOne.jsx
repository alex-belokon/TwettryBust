import { useNavigate } from "react-router-dom";
import "./GroupOne.style.scss";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function GroupOne() {
  const navigate = useNavigate();
  return (
    <div className="groupOne__wrapper">
      <div className="groupOne__header">
        <IoIosArrowRoundBack
          className="profileHeader__btn"
          onClick={() => navigate(-1)}
        />
        <h2 className="groupOne__header_title">Memes</h2>
      </div>
      <div className="groupOne__body"></div>
    </div>
  );
}
