import propType from 'prop-types'
import { useTranslation } from "react-i18next";

import ModalWrapper from "../ModalElements/ModalWrapper";
import FormikLogIn from "./Formik/FormikLogIn";

import './ModalLogIn.scss'

export default function ModalLogIn() {
    const { t } = useTranslation();
    
    return(
        <ModalWrapper 
        showCloseIcon 
        modalBodyCloseIconAuth
        modalBodyAuth
        modalBodyWrapperAuth
        goBackOnClose
         >
            <h2 className="modal__title">{t('modalLogIn.title')}</h2>
            <FormikLogIn/>
        </ModalWrapper>
    )
}

ModalLogIn.propTypes = {
    closeModal: propType.func
}