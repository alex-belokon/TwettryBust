import propType from 'prop-types'

import ModalWrapper from "../ModalElements/ModalWrapper";
import FormikLogIn from "./Formik/FormikLogIn";

export default function ModalLogIn({closeModal}) {
    
    return(
        <ModalWrapper 
        closeModal={closeModal} >
            <FormikLogIn/>
        </ModalWrapper>
    )
}

ModalLogIn.propTypes = {
    closeModal: propType.func
}