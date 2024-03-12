import { ErrorMessage, Field, useField } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./modalElements.style.scss";

export default function ModalField({ fieldData }) {
  const [field, meta] = useField(fieldData.name);
  const [styleLabelFocus, setStyleLabelFocus] = useState(firstClass());
  const textareaStyle = fieldData?.as === "textarea" ? "textareaStyle" : "";
  const { t } = useTranslation();

  function firstClass () {
    if (fieldData.type === 'date' || (field.value && field.value.trim() !== '')) {
      return 'label__blurText';
    }
    return '';
  }

  function blurField() {
    if (fieldData.type === 'date') {
      setStyleLabelFocus('label__blurText')
    } else if(field.value.trim() !== '') {
      setStyleLabelFocus('label__blurText');
    } else {
      setStyleLabelFocus('');
    }
  }

  function focusField() {
    if(field.value.trim() !== '' || fieldData.type === 'date') {
      setStyleLabelFocus('label__blurText');
    } else {
      setStyleLabelFocus('label__focus');
    }
  }

  return (
    <div className="fieldWrapper">
      <Field
        {...field}
        {...fieldData}
        className={`fieldStyle ${textareaStyle}`}
        id = {fieldData.label}
        onFocus = {focusField}
        onBlur = {blurField}
      />
      <label className={`label ${styleLabelFocus}`} htmlFor={fieldData.label}>{t(`${fieldData.label}`)}</label>
      <div className="errorMessage">
        <ErrorMessage name={fieldData.name} />
      </div>
    </div>
  );
}

ModalField.propTypes = {
  fieldData: PropTypes.object,
};
