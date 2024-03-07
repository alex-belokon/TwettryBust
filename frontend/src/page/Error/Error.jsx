import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Error.scss";
import { logOut } from "../../redux/tokenSlice";
import { useTranslation } from "react-i18next";
export default function Error() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
const { t } = useTranslation();
  function loginOnceMore () {
    dispatch(logOut());
    navigate("/login");
  }

  function reload () {
    const path = location.state ? location.state.from : "/";
    navigate(path);
  }

  return (
    <div className="error__wrapper">
      <div className="error__emoji">😞</div>
      <h2 className="error__title">{t("notFound.error")}</h2>
      <button className="error__button" onClick={reload}>
        {t("btn.refresh")}
      </button>
      <button className="error__button" onClick={loginOnceMore}>
        {t("btn.log")}
      </button>
      <button className="error__button" onClick={() => navigate(-1)}>
        {t("btn.back")}
      </button>
    </div>
  );
}
