import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { validationSchema } from "./validation";
import { register } from "../../../../redux/slice";

import ModalBtn from "../../../Buttons/ModalBtn/ModalBtn";
import ModalAfterSigIn from "../ModalAfterSigIn";

const FormikRegistration = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const action = await dispatch(register(values));
      if (register.fulfilled.match(action)) {
        if (action.payload && action.payload.token) {
          handleModal();
        }
      } else if (register.rejected.match(action)) {
        const errorMessage = action.payload;
        if (errorMessage.includes("Email is already taken")) {
          setRegisterError({ email: "Email is already taken" });
        } else if (errorMessage.includes("Username is already taken")) {
          setRegisterError({ username: "Username is already taken" });
        } else {
          setRegisterError({ _error: "An unknown error occurred" });
        }
      }
      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
          {registerError && registerError._error && (
            <div className="error">{registerError._error}</div>
          )}
          <div className="inputWrapper">
            <Field name="username">
              {({ field }) => (
                <div
                  className={`input__sign-up ${field.value ? "has-text" : ""}`}
                >
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
                  {registerError && registerError.username && (
                    <div className="error">{registerError.username}</div>
                  )}
                </div>
              )}
            </Field>
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="inputWrapper">
            <Field name="email">
              {({ field }) => (
                <div
                  className={`input__sign-up ${field.value ? "has-text" : ""}`}
                >
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
                  {registerError && registerError.email && (
                    <div className="error">{registerError.email}</div>
                  )}
                </div>
              )}
            </Field>
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="inputWrapper">
            <Field name="password">
              {({ field }) => (
                <div
                  className={`input__sign-up ${field.value ? "has-text" : ""}`}
                >
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
                <div
                  className={`input__sign-up ${field.value ? "has-text" : ""}`}
                >
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
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>
          <ModalBtn
            type="submit"
            ariaLabel="open register modal"
            additionalClass="modal__btn-reg"
          >
            {t("btn.signUp")}
          </ModalBtn>
        </Form>
      </Formik>
      {isModalOpen && <ModalAfterSigIn closeModal={handleModal} />}
    </>
  );
};

export default FormikRegistration;
