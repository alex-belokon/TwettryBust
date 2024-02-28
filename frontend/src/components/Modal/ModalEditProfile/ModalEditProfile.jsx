import ModalWrapper from "../ModalElements/ModalWrapper";
import PropTypes from "prop-types";
import "./modalEditProfile.style.scss";
import { useState } from "react";
import Banner from "./Banner";
import Screensaver from "./Screensaver";
import { Form, Formik } from "formik";
import ModalField from "../ModalElements/ModalField";
import formFields from "./helpers/FormFieldsArr";
import { RxCross2 } from "react-icons/rx";
import { SchemaUserData } from "./helpers/userDataSchema";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/userSlice';
import { changeUserData } from "../../../api/profile";

export default function ModalEditProfile({ closeModal, userData, setUserData }) {
  const [bannerUrl, setBannerUrl] = useState(userData.headerPhoto);
  const [screensaverUrl, setScreensaverUrl] = useState(userData.avatar);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const dispatch = useDispatch();

  async function handleSubmit(values, { resetForm }) {
    const sendData = {
      ...userData,
      ...values,
      headerPhoto: bannerUrl,
      avatar: screensaverUrl,
      id: currentUserId,
    };
     
    try {
      await changeUserData(currentUserId, sendData);
      setUserData(sendData);
      dispatch(updateUser(sendData));
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }    
  }

  const initialValues = {
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    bio: userData.bio || '',
    location: userData.location || '',
    website: userData.website || '',
    birthDate: userData.dateOfBirth || '',
  }

  return (
    <ModalWrapper closeModal={closeModal}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SchemaUserData}
      >
        <Form autoComplete="on">
          <div className="modalEditProfile__header">
            <RxCross2 className="modal__crossBtn" onClick={closeModal} />
            <h3 className="modalEditProfile__title">Edit profile</h3>
            <button type="submit" className="modalEditProfile__btnSave">
              Save
            </button>
          </div>

          <div className="modalEditProfile__body">
            <Banner
              bannerUrl={bannerUrl}
              setBannerUrl={setBannerUrl}
            ></Banner>
            <Screensaver
              userScreensaver={screensaverUrl}
              userName={userData.firstName}
              setScreensaverUrl={setScreensaverUrl}
            ></Screensaver>
            {formFields.map((formField) => (
              <ModalField
                fieldData={formField}
                key={formField.name}
              ></ModalField>
            ))}
          </div>
        </Form>
      </Formik>
    </ModalWrapper>
  );
}

ModalEditProfile.propTypes = {
  closeModal: PropTypes.func,
  userData: PropTypes.object,
  setUserData: PropTypes.func,
};
