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
import { formGroupFields } from "./create";
import ModalField from "../ModalElements/ModalField";

export default function CreateGroup({ closeModal }) {
  const [groupImages, setGroupImages] = useState("");
  const [groupsData, setGroupData] = useState(null);
   const currentUserId = useSelector((state) => state.user.user.id);
  {
    groupImages && (
      <img className="postImg" src={groupImages} alt={`grouptImg`} />
    )
  }
   
      const fetchData = async () => {
        const create = {
          name: "string",
          banner: "string",
          description: "string",
          about: "",
          id: currentUserId,
        };
        
        try {
          const data = await createGroups(create);
          setGroupData(data);
         
        } catch (error) {
          console.error("Error fetching groups:", error.message);
        }
      };
      
   async function handleSubmit(values, { resetForm }) {
      resetForm();
      closeModal();
      await fetchData();
      console.log(values);
    }
  const handleImageUpload = (imageUrl) => {
    setGroupImages(imageUrl);
  };

  const initialValues = {
    name: "",
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
              Створити
            </ModalBtn>
          </Form>
        </Formik>
      </div>
    </ModalWrapper>
  );
}
