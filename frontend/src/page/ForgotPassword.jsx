import "./ForgotPassword.style.scss";
import ModalWrapper from "../components/Modal/ModalElements/ModalWrapper";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ModalBtn from "../components/Buttons/ModalBtn/ModalBtn";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validation";
import { FcFeedback } from "react-icons/fc";
import { redirection } from "../utils/redirection";
export default function ForgotPassword() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    setShowSuccessMessage(true);
    // try {
    //   const userChecking = {
    //     email: values.email,
    //     enabled: true,
    //   };
    //   const response = await fetch("http://localhost:9000/api/*", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userChecking),
    //   });
    //   console.log(response);
    //   if (!response.ok) {
    //     const errorText = await response.text();
    //     throw new Error(
    //       `HTTP error! Status: ${response.status}, Message: ${errorText}`
    //     );
    //   }
    //   const responseData = await response.json();
    //   console.log("Відповідь від сервера:", responseData);
    resetForm();
    // } catch (error) {
    //   console.error("Помилка під час виконання запиту:", error.message);
    // }
  };
const redirection = () => {
  navigate("/login");
};
  return (
    <>
      <div className="reset__password">
        <ModalWrapper closeModal={redirection}>
          <div className="modal__text">
            <h1>Знайдіть свій профіль на TwettryBust</h1>

            <p>
              Введіть адресу електронної пошти,пов'язану з вашим профілем, щоб
              змінити пароль.
            </p>
          </div>
          {showSuccessMessage ? (
            <div className="success-message">
              <FcFeedback
                style={{ width: "45px", height: "45px", marginRight: "10px" }}
              />
              Ваш запит на зміну пароля був успішно відправлений!Перевірте пошту
              для подальшої процедури відновлення паролю.
              <ModalBtn
                additionalClass="backBtn"
                type="button"
                ariaLabel="submitForm"
                btnClick={backHome}
              >
                Повернутися на головну сторінку
              </ModalBtn>
            </div>
          ) : (
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Form className="form">
                <div className="form-group">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Електронна пошта"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <ModalBtn
                  type="submit"
                  additionalClass="modalBtnUse"
                  ariaLabel="submitForm"
                >
                  Далі
                </ModalBtn>
              </Form>
            </Formik>
          )}
        </ModalWrapper>
      </div>
    </>
  );
}
