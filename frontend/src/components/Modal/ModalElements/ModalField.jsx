import { ErrorMessage, Field } from "formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./modalElements.style.scss";

export default function ModalField({ fieldData }) {
  const textareaStyle = fieldData?.as === "textarea" ? "textareaStyle" : "";
  const { t } = useTranslation();

  return (
    <div className="fieldWrapper">
      <Field
        type={fieldData?.type}
        as={fieldData?.as}
        className={`fieldStyle ${textareaStyle}`}
        name={fieldData.name}
        maxLength={fieldData?.maxLength}
        id = {fieldData.label}
        // required
      />
      <label className="label" htmlFor={fieldData.label}>{t(`${fieldData.label}`)}</label>
      <div className="errorMessage">
        <ErrorMessage name={fieldData.name} />
      </div>
    </div>
  );
}

ModalField.propTypes = {
  fieldData: PropTypes.object,
};
