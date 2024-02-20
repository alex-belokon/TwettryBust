import propType from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import ModalWrapper from "../ModalElements/ModalWrapper";
import FormikRegistration from "./Formik/FormikRegistration";

import "./ModalRegistration.scss";

export default function ModalRegistration() {

  const { t } = useTranslation();

  const [registerError, setRegisterError] = useState(null);
  
  return (
    <ModalWrapper
      modalBodyCloseIconAuth
      modalBodyAuth
      showCloseIcon
      modalBodyWrapperAuth
      goBackOnClose
    >
      <h2 className="modal__title">{t("modalSignUp.title")}</h2>
      {registerError && <div className="">{registerError}</div>}
      <FormikRegistration setRegisterError={setRegisterError} />
    </ModalWrapper>
  );
}

ModalRegistration.propTypes = {
  closeModal: propType.func,
};
