import "./CreateGroup.style.scss";
import { Formik, Form } from "formik";
import ModalWrapper from "../ModalElements/ModalWrapper";
import { validationSchemaCreateGroup } from "./createGroup";
import ModalBtn from "../../Buttons/ModalBtn/ModalBtn";
import { useState } from "react";
import { createGroups } from "../../../api/groups";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formGroupFields } from "./create";
import ModalField from "../ModalElements/ModalField";
import Banner from "../ModalEditProfile/Banner";

export default function CreateGroup({ closeModal, setGroupData }) {
  const token = useSelector((state) => state.authUser.token);
  console.log(token);
  const { t } = useTranslation();
  const [groupImages, setGroupImages] = useState("");
  const currentUserId = useSelector((state) => state.authUser.user.id);

  {
    groupImages && (
      <img className="postImg" src={groupImages} alt={`grouptImg`} />
    );
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
      const data = await createGroups(create, token);
      setGroupData((prevProps) => [data, ...prevProps]);

      closeModal();
      resetForm();
      console.log("ТЕ ЩО ПРИХОДИТЬ З СЕРВЕРА", data);
    } catch (error) {
      console.error("Error fetching groups:", error.message);
    }
  };

  function handleSubmit(values, { resetForm }) {
    fetchData(values, resetForm);
  }

  const initialValues = {
    name: "",
    description: "",
    about: "",
  };
  return (
    <>
      <ModalWrapper closeModal={closeModal} showCloseIcon>
        <div className="modalPost__wrapper">
          <Banner
            bannerUrl={groupImages}
            setBannerUrl={setGroupImages}
          ></Banner>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchemaCreateGroup}
          >
            <Form>
              {formGroupFields.map((formField) => (
                <ModalField
                  fieldData={formField}
                  key={formField.name}
                ></ModalField>
              ))}

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
    </>
  );
}
