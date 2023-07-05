import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Invalid Pincode")
    .required("Pin Code is required"),
  phoneNumber: yup
    .string()
    .matches(/^[6-9][0-9]{9}$/, "Invalid Phone Number")
    .required("Phone Number"),
  gender: yup.string().required("Gender is Required"),
});
