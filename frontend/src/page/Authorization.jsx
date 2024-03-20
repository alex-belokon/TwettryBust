import { useNavigate } from "react-router-dom";
// import { useAuth } from "../components/AuthGoogle/UseAuth";
import { useTranslation } from "react-i18next";
import { Routes, Route, useLocation } from "react-router-dom";

import ModalLogIn from "../components/Modal/ModalLogReg/ModalLogIn";
import ModalRegistration from "../components/Modal/ModalLogReg/ModalRegistration";
import Button from "../components/Buttons/Button/Button";
import logo from "../assets/logo.png";

import "./Authorization.scss";

export default function Authorization() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  // const { signInWithGoogle } = useAuth();

  // const handleSignIn = async () => {
  //   try {
  //     await signInWithGoogle();
  //     navigate("/");
  //   } catch (error) {
  //     // обработка ошибок авторизации
  //   }
  // };

  const location = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <div className="main-pages">
        <Routes>
          <Route path="login" element={<ModalLogIn />} />
          <Route path="signup" element={<ModalRegistration />} />
        </Routes>
        {background && (<Route path="login"><ModalLogIn /></Route>)}
        {background && (<Route path="signup"><ModalRegistration /></Route>)}
        <div className="main-logo">
          <img className="main-logo__img" src={logo} alt="" />
        </div>
        <div className="main-page">
          <h1 className="main-page__title">{t("authPage.title")}</h1>
          <h2 className="main-page__subtitle">
            {t("authPage.subTitle.first")}
          </h2>
          <div className="main-page__buttons">
            {/* <Button googleBtn onClick={handleSignIn}>
              Войти через Google
            </Button> */}
            {/* <span className="main-page__buttons-or">{t("authPage.or")}</span> */}
            <Button registerBtn onClick={() => navigate("/authorization/signup")}>
              {t("btn.signUp")}
            </Button>
            <p className="main-page__buttons-text">{t("authPage.privacy")}</p>
            <h3 className="main-page__buttons-title">
              {t("authPage.subTitle.second")}
            </h3>
            <Button logInBtn onClick={() => navigate("/authorization/login")}>
              {t("btn.logIn")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
