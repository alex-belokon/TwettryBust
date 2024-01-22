import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthGoogle/UseAuth";

import ModalLogIn from "../components/Modal/ModalLogIn/ModalLogIn";
import ModalRegistration from "../components/Modal/ModalRegistration/ModalRegistration";
import Button from "../components/Buttons/Button/Button";
import logo from "../assets/logo.png";


import "./Authorization.scss";


export default function Authorization() {
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
        <h1 className="main-page__title">В курсе происходящего</h1>
        <h2 className="main-page__subtitle">Присоединяйтесь сегодня.</h2>
        <div className="main-page__buttons">
          <Button googleBtn onClick={handleSignIn}>
            Войти через Google
          </Button>
          <span className="main-page__buttons-or">или</span>
          <Button registerBtn onClick={() => openModal("registration")}>
            Зарегистрироваться
          </Button>
          <p className="main-page__buttons-text">
            Регистрируясь, вы соглашаетесь с Условиями предоставления услуг и
            Политикой конфиденциальности, а также с Политикой использования
            файлов cookie.
          </p>
          <h3 className="main-page__buttons-title" >Уже зарегистрированы?</h3>
          <Button logInBtn onClick={() => openModal("login")}>
            Войти
          </Button>
        </div>
        </div>
      </div>
    </>
  );

}

