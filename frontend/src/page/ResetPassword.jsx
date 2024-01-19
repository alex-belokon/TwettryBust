import "./ResetPassword.style.scss";
import ModalWrapper from "../components/Modal/ModalElements/ModalWrapper";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

export default function ResetPassword() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* <div className="reset__password"> */}
      {isModalOpen && (
        <ModalWrapper closeModal={closeModal} isModalPost={true}>
          <div className="modal__text">
            <h1>Підтвердіть свою адресу електронної пошти</h1>
            <p>
              Підтвердіть свою особу, ввівши адресу електронної пошти, пов'язану
              з вашим профілем.
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
                  placeholder="Електронна пошта"
                />
              </div>
              <button type="submit">Далі</button>
            </Form>
          </Formik>
        </ModalWrapper>
      )}
      {/* </div> */}
    </>
  );
}
