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
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/userAuth.js';

export default function ModalEditProfile({ closeModal, userData, setUserData }) {
  const [bannerUrl, setBannerUrl] = useState(userData.banner);
  const [screensaverUrl, setScreensaverUrl] = useState(userData.userScreensaver);
  const dispatch = useDispatch();

  const apiUrl = "http://localhost:5173/";

  async function sendNewUserData(data) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`error status: ${response.status}`);
      }
  
      const responseData = await response.json();
      setUserData(responseData)
      // return responseData; 
    } catch (error) {
      console.error("fetch", error);
      throw error;
    }
  }

  async function handleSubmit(values, { resetForm }) {
    const sendData = {
      ...values,
      banner: bannerUrl,
      userScreensaver: screensaverUrl,
    };
    try {
      // await sendNewUserData(sendData);
      setUserData(sendData) // тимчасово відправка даних тут
      dispatch(updateUser(sendData));
      resetForm();
      closeModal();
      // console.log("sendData", sendData);
    } catch (error) {
      console.error("Error:", error);
    }    
  }

  return (
    <ModalWrapper closeModal={closeModal}>
      <Formik
        initialValues={userData}
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
              userName={userData.name}
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
