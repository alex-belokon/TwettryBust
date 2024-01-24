import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateUser, logIn } from "../../../../redux/userAuth";

import ModalBtn from "../../../Buttons/ModalBtn/ModalBtn";
import Button from "../../../Buttons/Button/Button";

import "./FormikLogIn.scss";

const LoginForm = ({ closeModal, openModal }) => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedEmail = "test@example.com";
  const storedPassword = "password";

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    if (email === storedEmail && password === storedPassword) {
      dispatch(updateUser({ name: "Test User", email, password }));
      await dispatch(logIn());
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
              <div className={`input ${field.value ? "has-text" : ""}`}>
                <label htmlFor="email" className={emailFocused ? "active" : ""}>
                  Email:
                </label>
                <input
                  {...field}
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
              <div className={`input ${field.value ? "has-text" : ""}`}>
                <label
                  htmlFor="password"
                  className={passwordFocused ? "active" : ""}
                >
                  Password:
                </label>
                <input
                  {...field}
                  type="password"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </div>
            )}
          </Field>
          <ErrorMessage name="password" component="div" />
        </div>
        <ModalBtn type="submit" additionalClass="modal__btn-login">
          Login
        </ModalBtn>
        <Button type="button" modalBtnReg onClick={handleForgotPasswordClick}>
          Forgot your password?
        </Button>
        <p className="form__text">Don't have an account?</p>
        <p className="form__link" onClick={handleRegistrationClick}>
          Registration
        </p>
      </Form>
    </Formik>
  );
};

export default LoginForm;
