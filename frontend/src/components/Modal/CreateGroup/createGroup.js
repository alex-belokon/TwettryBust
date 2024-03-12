import * as Yup from "yup";

const validationSchemaCreateGroup = Yup.object().shape({
  name: Yup.string().required("*Name can’t be blank"),
  about: Yup.string(),
  description: Yup.string(),
});

export { validationSchemaCreateGroup };
