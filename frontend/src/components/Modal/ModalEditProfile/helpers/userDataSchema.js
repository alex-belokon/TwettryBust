import * as Yup from "yup";

const SchemaUserData = Yup.object().shape({
  firstName: Yup.string()
    .required('*Name can’t be blank'),
  bio: Yup.string(),
  location: Yup.string(),
  website: Yup.string(),
  date: Yup.date(),
});


export { SchemaUserData };
