import * as Yup from "yup";
import i18n from "i18next";

export const validationSchema = () =>Yup.object().shape({
  username: Yup.string()
    .min(3, i18n.t('modalSignUp.errorMessage.userNameLength'))
    .required(i18n.t('modalSignUp.errorMessage.userNameRequired')),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      i18n.t('modalSignUp.errorMessage.emailInvalidEmail')
    )
    .email(i18n.t('modalSignUp.errorMessage.emailNotValid'))
    .required(i18n.t('modalSignUp.errorMessage.emailRequired')),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).*$/,
      i18n.t('modalSignUp.errorMessage.passwordValid')
    )
    .min(8, i18n.t('modalSignUp.errorMessage.passwordLength'))
    .required(i18n.t('modalSignUp.errorMessage.passwordRequired')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], i18n.t('modalSignUp.errorMessage.confirmPasswordNotMatch'))
    .required(i18n.t('modalSignUp.errorMessage.confirmPasswordRequired')),
});
