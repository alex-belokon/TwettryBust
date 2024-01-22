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

export default function ModalEditProfile({ closeModal, userData, setUserData }) {
  const [bannerUrl, setBannerUrl] = useState(userData.banner);
  const [screensaverUrl, setScreensaverUrl] = useState(userData.userScreensaver);

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData; 
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  }

  function handleSubmit(values, { resetForm }) {
    console.log(screensaverUrl);
    const sendData = {
      ...values,
      banner: bannerUrl,
      userScreensaver: screensaverUrl,
    };
    if(sendNewUserData(values)){
      resetForm();
      closeModal();
      setUserData(sendData);
      console.log("sendData", sendData);
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
