import "./ForgotPassword.style.scss";
import ModalWrapper from "../components/Modal/ModalElements/ModalWrapper";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
export default function ForgotPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="reset__password">
        <h1>Forgot password</h1>
        {/* <ModalWrapper closeModal={closeModal} isModalPost={true}></ModalWrapper> */}
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
              initialValues={{ email: "" }}
              onSubmit={(handleSubmit) => {
                // Логіка відновлення паролю
              }}
            >
              <Form className="form">
                <div className="form-group">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Електронна пошта,номер телефону чи ім'я користувача"
                  />
                </div>
                <button type="submit">Далі</button>
              </Form>
            </Formik>
          </ModalWrapper>
        )}
      </div>
    </>
  );
}
