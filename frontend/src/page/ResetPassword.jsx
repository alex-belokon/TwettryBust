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
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import logo from "../assets/logo.png";
export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.search.substring(7);
  const [showSuccessReset, setShowSuccessReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleResetPassword = async (values, { resetForm }) => {
    if (values.password === values.passwordConfirm) {
      try {
        await resetPassword(values.password, values.passwordConfirm, token);
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
    navigate("/authorization");
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <ModalWrapper closeModal={redirection}>
        <div className="reset__header">
          <img src={logo} alt="Logo" className="logo__reset" />
          <h1 className="title__reset">Відновлення паролю</h1>
        </div>
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
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Введіть новий пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
              <Field
                type={showPassword ? "text" : "password"}
                name="passwordConfirm"
                placeholder="Введіть ще раз новий пароль"
              />
              <ErrorMessage
                name="passwordConfirm"
                component="div"
                className="error-message"
              />

              <div className="toggle-icon" onClick={togglePassword}>
                {showPassword ? (
                  <FaRegEye className="eye" />
                ) : (
                  <FaRegEyeSlash className="eye" />
                )}
              </div>

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
