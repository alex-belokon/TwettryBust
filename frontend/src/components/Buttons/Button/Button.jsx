import cx from 'classnames';
import './button.scss';
export default function Button(props) {

    const {
        children,
        onClick,
        className = ' ',
        type = 'button',
        logInBtn,
        registerBtn,
        googleBtn,
        modalBtnReg,
    } = props;
    
    return (
        <button
            className={cx('button',
             className, 
             {"login-btn": logInBtn},
             {"register-btn": registerBtn},
             {"google-btn":googleBtn},
             {"modal__btn-reg":modalBtnReg }
             )} 
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}