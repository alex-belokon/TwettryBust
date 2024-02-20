import propType from 'prop-types'
import { useTranslation } from "react-i18next";
import { useState } from "react";

import ModalWrapper from "../ModalElements/ModalWrapper";
import FormikLogIn from "./Formik/FormikLogIn";

import './ModalLogIn.scss'

export default function ModalLogIn() {
    const { t } = useTranslation();
    const [loginError, setLoginError] = useState(null);
    
    return(
        <ModalWrapper 
        showCloseIcon 
        modalBodyCloseIconAuth
        modalBodyAuth
        modalBodyWrapperAuth
        goBackOnClose
         >
            <h2 className="modal__title">{t('modalLogIn.title')}</h2>
            {loginError && <div className="login__error">{loginError}</div>}
            <FormikLogIn setLoginError={setLoginError}/>
        </ModalWrapper>
    )
}

ModalLogIn.propTypes = {
    closeModal: propType.func
}