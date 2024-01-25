import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveUserData } from "../../../../redux/slice"; // Путь до вашего userSlice
import { useTranslation } from "react-i18next";
import { validationSchema } from "./validation";

import ModalBtn from "../../../Buttons/ModalBtn/ModalBtn";

const FormikRegistration = () => {
  const { t } = useTranslation();

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const onSubmit = async (values, { setSubmitting, resetForm }) => {
  //   console.log(values);
  //   dispatch(saveUserData(values));
  //   setSubmitting(false);
  //   resetForm();
  //   navigate("/"); // Перенаправление на главную страницу
  // };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      // onSubmit={onSubmit}
    >
      <Form>
        <div className="inputWrapper">
          <Field name="name">
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
                  name="name"
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                />
              </div>
            )}
          </Field>
          <ErrorMessage name="name" component="div" className="error" />
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
        <ModalBtn type="submit" additionalClass="modal__btn-reg">
          {t("btn.signUp")}
        </ModalBtn>
      </Form>
    </Formik>
  );
};

export default FormikRegistration;
