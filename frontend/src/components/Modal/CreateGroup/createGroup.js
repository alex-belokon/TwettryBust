import * as Yup from "yup";

const validationSchemaCreateGroup = Yup.object().shape({
  groupName: Yup.string().required("*Name can’t be blank"),
  banner: Yup.string(),
  description: Yup.string(),
});

export { validationSchemaCreateGroup };
