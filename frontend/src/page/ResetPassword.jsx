import "./ResetPassword.style.scss";
import ModalWrapper from "../components/Modal/ModalElements/ModalWrapper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ModalBtn from "../components/Buttons/ModalBtn/ModalBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { validationSchema } from "./validationPassword";
import { useState } from "react";
import { resetPassword } from "../api/forgotPassword";
import { FcOk } from "react-icons/fc";
import { redirection } from "../utils/redirection";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const [showSuccessReset, setShowSuccessReset] = useState(false);

  const handleResetPassword = async (values, { resetForm }) => {
    // console.log("values", values);
    // console.log(values.password);
    // console.log(values.passwordConfirm);

    if (values.password === values.passwordConfirm) {
      try {
        await resetPassword(values.password);
        setShowSuccessReset(true);
        resetForm();
      } catch (error) {
        console.error("Помилка під час виконання POST-запиту:", error);
        alert("Сталася помилка під час зміни пароля");
      }
    } else {
      alert("Паролі не співпадають");
    }
  };
  const redirection = () => {
    navigate("/login");
  };

  return (
    <div>
      <ModalWrapper closeModal={redirection}>
        <h1 className="title__reset">Відновлення паролю</h1>
        {showSuccessReset ? (
          <div className="success-message">
            <FcOk />
            Пароль успішно змінений
          </div>
        ) : (
          <Formik
            initialValues={{
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={handleResetPassword}
            validationSchema={validationSchema}
          >
            <Form className="form-reset">
              <Field
                type="password"
                name="password"
                placeholder="Введіть новий пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
              <Field
                type="password"
                name="passwordConfirm"
                placeholder="Введіть ще раз новий пароль"
              />
              <ErrorMessage
                name="passwordConfirm"
                component="div"
                className="error-message"
              />
              <ModalBtn
                type="submit"
                additionalClass="modalBtnUse"
                ariaLabel="submitForm"
              >
                Відновити
              </ModalBtn>
            </Form>
          </Formik>
        )}
      </ModalWrapper>
    </div>
  );
}
