import "./CreateGroup.style.scss";
import { Formik, Form, Field } from "formik";
import ModalWrapper from "../ModalElements/ModalWrapper";
import { validationSchemaCreateGroup } from "./createGroup";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useState } from "react";
import UploadWidget from "../../UploadWidget";
import { createGroups } from "../../../api/groups";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formGroupFields } from "./create";
import ModalField from "../ModalElements/ModalField";
import Banner from "../ModalEditProfile/Banner";

export default function CreateGroup({ closeModal, setGroupData }) {
  const { t } = useTranslation();
  const [groupImages, setGroupImages] = useState("");
  // const [groupsData, setGroupData] = useState(null);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  {
    groupImages && (
      <img className="postImg" src={groupImages} alt={`grouptImg`} />
    )
  }
   
      const fetchData = async (values, resetForm) => {
        const create = {
          name: values.name,
          creatorId: currentUserId,
          about: values.about,
          description: values.description,
          banner: groupImages,
        };

        try {
          const data = await createGroups(create);
          setGroupData(prevProps => [data, ...prevProps])
          closeModal();
          resetForm();
        } catch (error) {
          console.error("Error fetching groups:", error.message);
        }
      };
      
   function handleSubmit(values, { resetForm }) {
      fetchData(values, resetForm);
    }

  // const handleImageUpload = (imageUrl) => {
  //   setGroupImages(imageUrl);
  // };

  const initialValues = {
    name: "",
    // banner: "",
    description: "",
    about: "",
  };
  return (
    <ModalWrapper closeModal={closeModal} showCloseIcon>
      <div className="modalPost__wrapper">
        {/* {groupImages && (
          <img className="postImg" src={groupImages} alt={`grouptImg`} />
        )} */}
        <Banner bannerUrl={groupImages} setBannerUrl={setGroupImages}></Banner>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaCreateGroup}
        >
          <Form>
            {/* <div name="banner">
              <UploadWidget imgUrl={handleImageUpload}>
                <MdOutlineAddAPhoto className="iconAddPost" />
              </UploadWidget>
            </div> */}
            {/* <Field
              name="groupName"
              type="text"
              placeholder="Group name"
              className="modalPost__input"
            /> */}

            {formGroupFields.map((formField) => (
              <ModalField
                fieldData={formField}
                key={formField.name}
              ></ModalField>
            ))}
            {/* <Field
              name="description"
              type="text"
              placeholder="Description"
              className="modalPost__input"
            /> */}
     
            <ModalBtn
              type="submit"
              additionalClass="modalBtnUse"
              ariaLabel="submitForm"
            >
              {t("btn.create")}
            </ModalBtn>
          </Form>
        </Formik>
      </div>
    </ModalWrapper>
  );
}
