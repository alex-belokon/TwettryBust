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
// import { formGroupFields } from "./create";
// import ModalField from "../ModalElements/ModalField";

export default function CreateGroup({ closeModal, setGroup }) {
  const { t } = useTranslation();
  const [groupImages, setGroupImages] = useState("");
  const [groupsData, setGroupData] = useState(null);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  {
    groupImages && (
      <img className="postImg" src={groupImages} alt={`grouptImg`} />
    )
  }
   
      const fetchData = async (values) => {
        const create = {
          name: values.groupName,
          creatorId: currentUserId,
          about: values.about,
          description: values.description,
          banner: values.banner,
        };

        try {
          const data = await createGroups(create);
          return data;
          // setGroupData(data);
        } catch (error) {
          console.error("Error fetching groups:", error.message);
        }
      };
      
   async function handleSubmit(values, { resetForm }) {
      resetForm();
      closeModal();
     const createdGroup = await fetchData(values);
      setGroup(createdGroup);
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

            {/* {formGroupFields.map((formField) => (
              <ModalField
                fieldData={formField}
                key={formField.name}
              ></ModalField>
            ))} */}
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
              {t("btn.create")}
            </ModalBtn>
          </Form>
        </Formik>
      </div>
    </ModalWrapper>
  );
}
