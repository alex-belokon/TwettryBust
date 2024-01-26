import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Невірний формат email"
    )
    .required("Введення email обов'язково!")
    .max(70, "Занадто довгий email"),
});
