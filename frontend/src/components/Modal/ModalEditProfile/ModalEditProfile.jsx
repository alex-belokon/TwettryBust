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
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/tokenSlice";
import { changeUserData } from "../../../api/profile";
import { useTranslation } from "react-i18next";
import LocationSelector from "./LocationSelector/LocationSelector";
import { useEffect } from "react";

export default function ModalEditProfile({
  closeModal,
  userData,
  setUserData,
}) {
  const [bannerUrl, setBannerUrl] = useState(userData.headerPhoto);
  const [screensaverUrl, setScreensaverUrl] = useState(userData.avatar);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  async function handleSubmit(values, { resetForm }) {
    console.log(values);
    const sendData = {
      ...userData,
      ...values,
      headerPhoto: bannerUrl,
      avatar: screensaverUrl,
      location: values.country + ', ' + values.region,
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

  const location = userData.location ? userData.location.split(',') : ['', ''];
  
  const initialValues = {
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    bio: userData.bio || "",
    country: location[0].trim() || '',
    region: location[1].trim() || '',
    website: userData.website || "",
    dateOfBirth: userData.dateOfBirth || "",
  };

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
            <h3 className="modalEditProfile__title">{t("profile.edit")}</h3>
            <button type="submit" className="modalEditProfile__btnSave">
              {t("btn.save")}
            </button>
          </div>

          <div className="modalEditProfile__body">
            <Banner bannerUrl={bannerUrl} setBannerUrl={setBannerUrl}></Banner>
            <Screensaver
              userScreensaver={screensaverUrl}
              userName={userData.firstName}
              setScreensaverUrl={setScreensaverUrl}
            ></Screensaver>

            {formFields.map((formField) => {
              if (formField.name === "location") {
                return <LocationSelector userData={userData} key={formField.name} initialValues={initialValues}></LocationSelector>
              }
              return (
                <ModalField
                  fieldData={formField}
                  key={formField.name}
                ></ModalField>
              );
            })}
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
