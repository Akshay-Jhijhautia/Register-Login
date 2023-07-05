import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
