import propType from 'prop-types'
import ModalWrapper from "../ModalElements/ModalWrapper";
import FormikLogIn from "./Formik/FormikLogIn";

import './ModalLogIn.scss'

export default function ModalLogIn({closeModal, openModal}) {
    
    return(
        <ModalWrapper 
        modalBodyLogIn
        closeModal={closeModal} >
            <h2 className="modal__title">Login to TwettryBust</h2>
            <FormikLogIn
            closeModal={closeModal}
            openModal={openModal}/>
        </ModalWrapper>
    )
}

ModalLogIn.propTypes = {
    closeModal: propType.func
}