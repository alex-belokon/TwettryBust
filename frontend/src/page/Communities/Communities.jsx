import { useNavigate } from "react-router-dom";
import "./Communities.style.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import BtnOpenPopup from "../../components/Posts/BtnOpenPopup/BtnOpenPopup";

export default function Communities() {
  const navigate = useNavigate();
  return (
    <div className="communitiesWrapper">
      <div className="communities__header">
        <IoIosArrowRoundBack
          className="profileHeader__btn"
          onClick={() => navigate(-1)}
        />
        <h2 className="communities__header_title">Communities</h2>
      </div>
      <div className="titlePage">
        <h2 className="titlePage__title"> Discover new Communities</h2>
        <BtnOpenPopup />
      </div>

      <div className="communities__item">
        <p>Communities page.</p>
      </div>
    </div>
  );
}
