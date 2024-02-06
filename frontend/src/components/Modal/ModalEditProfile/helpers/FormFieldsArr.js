
  const formFields = [
    {
      type: "text",
      name: "name",
      label: "userProfile.form.name",
      maxLength: 30,
    },
    {
      type: "text",
      name: "lastName",
      label: "userProfile.form.lastName",
      maxLength: 30,
    },
    {
      as: "textarea",
      name: "bio",
      label: "userProfile.form.bio",
      maxLength: 160,
    },
    {
      type: "text",
      name: "location",
      label: "userProfile.form.location",
      maxLength: 30,
    },
    {
      type: "text",
      name: "website",
      label: "userProfile.form.website",
      maxLength: 100,
    },
    {
      type: "date",
      name: "birthDate",
      label: "userProfile.form.birthDate",
    },
  ];


  export default formFields;