import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateUser, logIn } from "../../../../redux/userAuth";
import { useTranslation } from "react-i18next";

import ModalBtn from "../../../Buttons/ModalBtn/ModalBtn";
import Button from "../../../Buttons/Button/Button";

import "./Formik.scss";

const LoginForm = ({ closeModal, openModal }) => {
  const { t } = useTranslation();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedEmail = "test@ukr.net";
  const storedPassword = "password";

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
  
    if (email === storedEmail && password === storedPassword) {
      dispatch(updateUser({ name: "Test User", email, password }));
      await dispatch(logIn({ email, password })); // передайте учетные данные пользователя
      navigate("/"); // Перенаправление на главную страницу
    } else {
      console.error("Неправильные данные для входа");
    }
  
    setSubmitting(false);
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  const handleRegistrationClick = () => {
    closeModal();
    openModal("registration");
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
