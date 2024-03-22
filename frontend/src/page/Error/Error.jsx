import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Error.scss";
import { logOut } from "../../redux/tokenSlice";
import { useTranslation } from "react-i18next";
import img from "../../assets/Screenshot_4-removebg-preview.png";

export default function Error() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  function loginOnceMore() {
    dispatch(logOut());
    navigate("/authorization");
  }

  function reload() {
    const path = location.state ? location.state.from : "/";
    navigate(path);
  }

  return (
    <div className="error__wrapper">
      <h2 className="error__title">{t("notFound.errorTitle")}</h2>
      <img src={img} className="error__emoji" alt="error emoji" />
      <p className="error__title">{t("notFound.error")}</p>
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
