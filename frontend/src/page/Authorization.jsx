import { useNavigate } from "react-router-dom";
import "./Authorization.scss";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthGoogle/UseAuth'; 

export default function Authorization() {
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth();

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate('/'); // перенаправляем пользователя на главную страницу после успешной авторизации
        } catch (error) {
            // обработка ошибок авторизации
        }
    };

    return (
        <div className="main-page">
            <h1 className="main-page__title">В курсе происходящего</h1>
            <h2 className="main-page__subtitle">Присоединяйтесь сегодня.</h2>
            <div className="main-page__buttons">
                <button className="register-button">Зарегистрироваться</button>
                <button className="login-button" onClick={()=>navigate('/', { replace: true })}>Войти</button>
                <button className="google-login-button" onClick={handleSignIn}>Войти через Google</button>
            </div>
        </div>
    );
}
 