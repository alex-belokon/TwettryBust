import "./CreateGroup.style.scss";
import { Formik, Form, Field } from "formik";
import ModalWrapper from "../ModalElements/ModalWrapper";
import { validationSchemaCreateGroup } from "./createGroup";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useState } from "react";
import UploadWidget from "../../UploadWidget";
export default function CreateGroup({ closeModal }) {
    const [groupImages, setGroupImages] = useState("");
  { groupImages && (
      <img className="postImg" src={groupImages} alt={`grouptImg`} />
    )}
    
  async function handleSubmit(values, { resetForm }) {
    // try {
    //   //запит
      resetForm();
     closeModal();
    // } catch (error) {
    //   console.error("Error:", error);
    // }
      console.log(values);
  }
  const handleImageUpload = (imageUrl) => {
    setGroupImages(imageUrl);
  };
  
  

  const initialValues = {
    groupName: "",
    banner: "",
    description: "",
    about: "",
  };
  return (
    <ModalWrapper closeModal={closeModal} showCloseIcon>
      <div className="modalPost__wrapper">
        {groupImages && (
          <img className="postImg" src={groupImages} alt={`grouptImg`} />
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaCreateGroup}
        >
          <Form>
            <div name="banner">
              <UploadWidget imgUrl={handleImageUpload}>
                <MdOutlineAddAPhoto className="iconAddPost" />
              </UploadWidget>
            </div>
            <Field
              name="groupName"
              type="text"
              placeholder="Group name"
              className="modalPost__input"
            />
            <Field
              name="description"
              type="text"
              placeholder="Description"
              className="modalPost__input"
            />
            <ModalBtn
              type="submit"
              additionalClass="modalBtnUse"
              ariaLabel="submitForm"
            >
              Створити
            </ModalBtn>
          </Form>
        </Formik>
      </div>
    </ModalWrapper>
  );
}
