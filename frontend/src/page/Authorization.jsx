import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthGoogle/UseAuth";
import { useTranslation } from "react-i18next";

import ModalLogIn from "../components/Modal/ModalLogReg/ModalLogIn";
import ModalRegistration from "../components/Modal/ModalLogReg/ModalRegistration";
import Button from "../components/Buttons/Button/Button";
import logo from "../assets/logo.png";

import "./Authorization.scss";

export default function Authorization() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      // обработка ошибок авторизации
    }
  };

  const [currentForm, setCurrentForm] = useState(null);

  const openModal = (form) => {
    setCurrentForm(form);
  };

  const closeModal = () => {
    setCurrentForm(null);
  };

  return (
    <>
      {currentForm === "login" && <ModalLogIn closeModal={closeModal} openModal={openModal} />}
      {currentForm === "registration" && (
        <ModalRegistration closeModal={closeModal} />
      )}
      <div className="main-pages">
        <div className="main-logo">
          <img className="main-logo__img" src={logo} alt="" />
        </div>
        <div className="main-page">
        <h1 className="main-page__title">{t("authPage.title")}</h1>
        <h2 className="main-page__subtitle">{t("authPage.subTitle.first")}</h2>
        <div className="main-page__buttons">
          <Button googleBtn onClick={handleSignIn}>
            Войти через Google
          </Button>
          <span className="main-page__buttons-or">{t("authPage.or")}</span>
          <Button registerBtn onClick={() => openModal("registration")}>
            {t("btn.signUp")}
          </Button>
          <p className="main-page__buttons-text">
           {t("authPage.privacy")}
          </p>
          <h3 className="main-page__buttons-title" >{t("authPage.subTitle.second")}</h3>
          <Button logInBtn onClick={() => openModal("login")}>
            {t("btn.logIn")}
          </Button>
        </div>
        </div>
      </div>
    </>
  );

}

