import propType from 'prop-types'

import ModalWrapper from "../ModalElements/ModalWrapper"
import FormikRegistration from "./Formik/FormikRegistration"


export default function ModalRegistration({closeModal}) {

    return (
        <ModalWrapper
            closeModal={closeModal}
        >
            <FormikRegistration />
        </ModalWrapper>
    )
}

ModalRegistration.propTypes = {
    closeModal: propType.func
}