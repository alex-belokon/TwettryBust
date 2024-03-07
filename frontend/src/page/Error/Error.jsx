import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Error.scss";
import { logOut } from "../../redux/tokenSlice";

export default function Error() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  function loginOnceMore () {
    dispatch(logOut());
    navigate("/authorization");
  }

  function reload () {
    const path = location.state ? location.state.from : "/";
    navigate(path);
  }

  return (
    <div className="error__wrapper">
      <div className="error__emoji">😞</div>
      <h2 className="error__title">Вибачте, сталася помилка</h2>
      <button className="error__button" onClick={reload}>
        Спробуйте перезавантажити сторінку
      </button>
      <button className="error__button" onClick={loginOnceMore}>
        Please log in once more
      </button>
      <button className="error__button" onClick={() => navigate(-1)}>
        Або перейдть на попередню сторінку
      </button>
    </div>
  );
}
