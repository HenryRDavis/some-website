import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Please provide a longer username"),
  email: yup
    .string()
    .email("Please use a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "password must be 6 characters or longer"),
});
