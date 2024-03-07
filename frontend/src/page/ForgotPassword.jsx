import "./ForgotPassword.style.scss";
import ModalWrapper from "../components/Modal/ModalElements/ModalWrapper";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ModalBtn from "../components/Buttons/ModalBtn/ModalBtn";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "./validation";
import { FcFeedback } from "react-icons/fc";
import { redirection } from "../utils/redirection";
import { forgotPassword } from "../api/forgotPassword";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
export default function ForgotPassword() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const backHome = () => {
    navigate("/authorization");
  };

  const handleSubmit = async (values, { resetForm }) => {
    setShowSuccessMessage(true);

    try {
      await forgotPassword(values.email);
      resetForm();
    } catch (error) {
      console.error("Помилка під час виконання запиту:", error.message);
    }
  };
  const redirection = () => {
    navigate("/authorization");
  };
  return (
    <>
      <div className="reset__password">
        <ModalWrapper closeModal={redirection}>
          <div className="modal__text">
            <h1>{t("forgotPassword.title")}</h1>
            <p>{t("forgotPassword.explanation")}</p>
          </div>
          {showSuccessMessage ? (
            <div className="success-message">
              <FcFeedback
                style={{ width: "45px", height: "45px", marginRight: "10px" }}
              />
              {t("forgotPassword.success")}
              <ModalBtn
                additionalClass="backBtn"
                type="button"
                ariaLabel="submitForm"
                btnClick={backHome}
              >
                {t("btn.page")}
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
                    placeholder={t("placeholder.email")}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>

                <img src={logo} alt="Logo" className="forgot_logo" />

                <ModalBtn
                  type="submit"
                  additionalClass="modalBtnUse"
                  ariaLabel="submitForm"
                >
                  {t("btn.next")}
                </ModalBtn>
              </Form>
            </Formik>
          )}
        </ModalWrapper>
      </div>
    </>
  );
}
