import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { validationSchema } from "./validation";
import { register } from "../../../../redux/slice";
import { logInAfterRegistration } from "../../../../redux/userAuth";

import ModalBtn from "../../../Buttons/ModalBtn/ModalBtn";

const FormikRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.authUser.isLoggedIn);
  console.log( "isLoggedIn after registration ",isLoggedIn)
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    const action = await dispatch(register(values));
    console.log( "action", action);
    console.log("action.payload", action.payload); // Добавьте эту строку, чтобы увидеть, что возвращает register
    if (action.payload && action.payload.token) {
      console.log("action.payload", action.payload);
      dispatch(logInAfterRegistration(values));
    }
    setSubmitting(false);
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="inputWrapper">
          <Field name="username">
            {({ field }) => (
              <div className={`input__sign-up ${field.value ? "has-text" : ""}`}>
                <label
                  htmlFor="nameInput"
                  className={nameFocused ? "active" : ""}
                >
                  {t("modalSignUp.from.name")}
                </label>
                <input
                  {...field}
                  id="nameInput"
                  type="text"
                  name="username"
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                />
              </div>
            )}
          </Field>
          <ErrorMessage name="username" component="div" className="error" />
        </div>
        <div className="inputWrapper">
          <Field name="email">
            {({ field }) => (
              <div className={`input__sign-up ${field.value ? "has-text" : ""}`}>
                <label
                  className={emailFocused ? "active" : ""}
                  htmlFor="emailInput"
                >
                  {t("modalSignUp.from.email")}
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
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className="inputWrapper">
          <Field name="password">
            {({ field }) => (
              <div className={`input__sign-up ${field.value ? "has-text" : ""}`}>
                <label
                  className={passwordFocused ? "active" : ""}
                  htmlFor="passwordInput"
                >
                  {t("modalSignUp.from.password")}
                </label>
                <input
                  {...field}
                  id="passwordInput"
                  type="password"
                  name="password"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </div>
            )}
          </Field>
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <div className="inputWrapper">
          <Field name="confirmPassword">
            {({ field }) => (
              <div className={`input__sign-up ${field.value ? "has-text" : ""}`}>
                <label
                  className={confirmPasswordFocused ? "active" : ""}
                  htmlFor="confirmPasswordInput"
                >
                  {t("modalSignUp.from.confirmPassword")}
                </label>
                <input
                  {...field}
                  id="confirmPasswordInput"
                  type="password"
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                />
              </div>
            )}
          </Field>
          <ErrorMessage name="confirmPassword" component="div" className="error" />
        </div>
        <ModalBtn type="submit" ariaLabel='open register modal' additionalClass="modal__btn-reg">
          {t("btn.signUp")}
        </ModalBtn>
      </Form>
    </Formik>
  );
};

export default FormikRegistration;
