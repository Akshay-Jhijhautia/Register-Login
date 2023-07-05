import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name Should be Minimum 3 Characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password Should be Minimum 6 Characters")
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password Should be Minimum 6 Characters")
    .required("Password is required"),
});

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name Should be Minimum 3 Characters")
    .required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .matches(/^[0-9]{5}$/, "Invalid Pincode")
    .required("Pin Code is required"),
  phoneNumber: yup
    .string()
    .matches(/^[6-9][0-9]{8}$/, "Invalid Phone Number")
    .required("Phone Number"),
  gender: yup.string().required("Gender is Required"),
});
