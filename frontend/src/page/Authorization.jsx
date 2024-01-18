
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthGoogle/UseAuth";
import ModalLogIn from "../components/Modal/ModalLogIn/ModalLogIn";
import ModalRegistration from "../components/Modal/ModalRegistration/ModalRegistration";
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
      {currentForm === "login" && <ModalLogIn closeModal={closeModal} />}
      {currentForm === "registration" && (
        <ModalRegistration closeModal={closeModal} />
      )}
      <div className="main-page">
        <h1 className="main-page__title">В курсе происходящего</h1>
        <h2 className="main-page__subtitle">Присоединяйтесь сегодня.</h2>
        <div className="main-page__buttons">
          <button
            className="register-button"
            onClick={() => openModal("registration")}
          >
            Зарегистрироваться
          </button>
          <button
            className="login-button"
            onClick={() => openModal("login")}
          >
            Войти
          </button>
          <button className="google-login-button" onClick={handleSignIn}>
            Войти через Google
          </button>
        </div>
      </div>
    </>
  );
}

