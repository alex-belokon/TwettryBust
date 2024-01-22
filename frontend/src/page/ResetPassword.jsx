import "./ResetPassword.style.scss";
import ModalWrapper from "../components/Modal/ModalElements/ModalWrapper";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

export default function ResetPassword() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmitEmail = async (values, { resetForm }) => {
    console.log(values.email);
    //   try {
    //     const emailChecking = {
    //       email: values.email,
    //       enabled: true,
    //     };
    //     const response = await fetch("http://localhost:порт*/api/*", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(emailChecking),
    //     });
    //     console.log(response);
    //     if (!response.ok) {
    //       const errorText = await response.text();
    //       throw new Error(
    //         `HTTP error! Status: ${response.status}, Message: ${errorText}`
    //       );
    //     }
    //     const responseData = await response.json();
    //     console.log("Відповідь від сервера:", responseData);
    //     resetForm();
    //   } catch (error) {
    //     console.error("Помилка під час виконання запиту:", error.message);
    //   }
  };

  return (
    <>
      {isModalOpen && (
        <ModalWrapper closeModal={closeModal}>
          <div className="reset__text">
            <h1>Підтвердіть свою адресу електронної пошти</h1>
            <p>
              Підтвердіть свою особу, ввівши адресу електронної пошти, пов'язану
              з вашим профілем.
            </p>
          </div>
          <Formik initialValues={{ email: "" }} onSubmit={handleSubmitEmail}>
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
    </>
  );
}
