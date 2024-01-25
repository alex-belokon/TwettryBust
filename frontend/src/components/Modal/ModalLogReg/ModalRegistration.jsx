import propType from "prop-types";
import { useTranslation } from "react-i18next";

import ModalWrapper from "../ModalElements/ModalWrapper";
import FormikRegistration from "./Formik/FormikRegistration";

import "./ModalRegistration.scss";

export default function ModalRegistration({ closeModal }) {
  const { t } = useTranslation();
  return (
    <ModalWrapper 
    modalBodySignUp
    showCloseIcon={true} 
    closeModal={closeModal}>
         <h2 className="modal__title">{t("modalSignUp.title")}</h2>
      <FormikRegistration />
    </ModalWrapper>
  );
}

ModalRegistration.propTypes = {
  closeModal: propType.func,
};
