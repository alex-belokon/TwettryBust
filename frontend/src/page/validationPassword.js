import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    //   .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z]).*$/,
    //   "Password must start with a capital letter and contain at least one lowercase letter"
    // )
    .min(8, "Пароль повинен містити не менше 8 символів")
    .required("Пароль обов'язково!"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролі повинні співпадати")
    .required("Підтвердження паролю обов'язково!"),
});
