import "./ForgotPassword.style.scss";
import ModalWrapper from "../components/Modal/ModalElements/ModalWrapper";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import ModalBtn from "../components/Buttons/ModalBtn/ModalBtn";
export default function ForgotPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    // try {
    //   const userChecking = {
    //     email: values.email || values.phone || values.name,
    //     enabled: true,
    //   };
    //   const response = await fetch("http://localhost:порт*/api/*", {
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
    //   resetForm();
    // } catch (error) {
    //   console.error("Помилка під час виконання запиту:", error.message);
    // }
  };

  return (
    <>
      <div className="reset__password">
        <h1>Forgot password</h1>
        <button onClick={openModal}>Забули пароль?</button>
        {isModalOpen && (
          <ModalWrapper closeModal={closeModal} isModalPost={true}>
            <div className="modal__text">
              <h1>Знайдіть свій профіль на TwettryBust</h1>
              <p>
                Введіть адресу електронної пошти,номер телефону чи ім'я
                користувача,пов'язаного з вашим профілем, щоб змінити пароль.
              </p>
            </div>
            <Formik
              initialValues={{
                email: "",
                phone: "",
                name: "",
              }}
              onSubmit={handleSubmit}
            >
              <Form className="form">
                <div className="form-group">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Електронна пошта,номер телефону чи ім'я користувача"
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
          </ModalWrapper>
        )}
      </div>
    </>
  );
}
