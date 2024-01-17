import { useNavigate } from "react-router-dom";
import "./Authorization.scss";

export default function Authorization() {
  const navigate = useNavigate();


  return (
    <div className="main-page">
      <h1 className="main-page__title">В курсе происходящего</h1>
      <h2 className="main-page__subtitle">Присоединяйтесь сегодня.</h2>
      <div className="main-page__buttons">
        <button className="register-button">Зарегистрироваться</button>
        <button className="login-button" onClick={()=>navigate('/', { replace: true })}>Войти</button>
      </div>
    </div>
  );
}