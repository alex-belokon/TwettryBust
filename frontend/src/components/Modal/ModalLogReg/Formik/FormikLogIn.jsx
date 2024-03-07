import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../../../../api/authorization";
import { useTranslation } from "react-i18next";

import ModalBtn from "../../../Buttons/ModalBtn/ModalBtn";
import Button from "../../../Buttons/Button/Button";

import "./Formik.scss";

const LoginForm = ({ setLoginError }) => {
  const { t } = useTranslation();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const isLoggedIn = useSelector((state) => state.authUser.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleSubmit = async (useData) => {
    try {
      const resultAction = await dispatch(login(useData));
      if (login.fulfilled.match(resultAction)) {
        if (resultAction.payload && resultAction.payload.user) {
          setLoginError(null);
        } else {
          throw new Error('Invalid server response');
        }
      } else if (resultAction.error) {
        console.error(resultAction.error.message);
        setLoginError(t("modalLogIn.loginErorr"));
      }
    } catch (err) {
      console.error("Error during login:", err);
      setLoginError(t("modalLogIn.loginErorr"));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const handleRegistrationClick = () => {
    navigate("/login/signup", { replace: true });
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className="form__wrapper">
        <div className="form__input-wrapper">
          <Field name="email">  
            {({ field }) => (
              <div className={`input__log-in ${field.value ? "has-text" : ""}`}>
                <label
                  htmlFor="emailInput"
                  className={emailFocused ? "active" : ""}
                >
                  {t("modalLogIn.from.email")}
                </label>
                <input
                  {...field}
                  id="emailInput"
                  type="email"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
            )}
          </Field>
          <ErrorMessage name="email" component="div" />
        </div>
       
        <div className="form__input-wrapper">
          <Field name="password">
            {({ field }) => (
              <div className={`input__log-in ${field.value ? "has-text" : ""}`}>
                <label
                  htmlFor="passwordInput"
                  className={passwordFocused ? "active" : ""}
                >
                  {t("modalLogIn.from.password")}
                </label>
                <input
                  {...field}
                  id="passwordInput"
                  type="password"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </div>
            )}
          </Field>
          <ErrorMessage name="password" component="div" />
        </div>
{/* 
        <div className="form__input-wrapper">
          <label className="rememberMe">
            <Field 
            type="checkbox" 
            name="rememberMe" 
            checked={rememberMe}
            onChange={handleCheckboxChange} />
            <span className="custom-checkbox"></span>
            Запомнить меня
          </label>
        </div> */}
        <ModalBtn type="submit" ariaLabel='open modal login' additionalClass="modal__btn-login">

          {t("btn.logIn")}
        </ModalBtn>
        <Button type="button" modalBtnReg onClick={handleForgotPasswordClick}>
          {t("btn.forgotPassword")}
        </Button>
        <p className="form__text">{t("modalLogIn.subTitle")}</p>
        <p className="form__link" onClick={handleRegistrationClick}>
          {t("btn.signUp")}
        </p>
      </Form>
    </Formik>
  );
};

export default LoginForm;
