import propType from 'prop-types'
import { useTranslation } from "react-i18next";

import ModalWrapper from "../ModalElements/ModalWrapper";
import FormikLogIn from "./Formik/FormikLogIn";

import './ModalLogIn.scss'

export default function ModalLogIn({closeModal, openModal}) {
    const { t } = useTranslation();
    
    return(
        <ModalWrapper 
        showCloseIcon={true} 
        modalBodyLogIn
        closeModal={closeModal} >
            <h2 className="modal__title">{t('modalLogIn.title')}</h2>
            <FormikLogIn
            closeModal={closeModal}
            openModal={openModal}/>
        </ModalWrapper>
    )
}

ModalLogIn.propTypes = {
    closeModal: propType.func
}