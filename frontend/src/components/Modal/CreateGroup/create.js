export const formGroupFields = [
  {
    type: "text",
    name: "name",
    label: "Group name",
    maxLength: 30,
  },
  // {
  //   type: "text",
  //   name: "banner",
  //   label: "Banner",
  //   maxLength: 30,
  // },
  {
    as: "textarea",
    name: "description",
    label: "Description",
    maxLength: 250,
  },
  {
    as: "textarea",
    name: "about",
    label: "About",
    maxLength: 3000,
  },
];
