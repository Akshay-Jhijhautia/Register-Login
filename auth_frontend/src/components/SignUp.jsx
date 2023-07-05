import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import apiClient from "../services/api-client";
import { signUpSchema } from "../Validations/validation";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [networkError, setNetworkError] = useState(false);
  const [checkDuplicateEmail, setCheckDupllicateEmail] = useState(false);
  const [checkSignUpSuccess, setCheckSignUpSuccess] = useState(false);

  function formData(event) {
    event.preventDefault();

    apiClient
      .post("signup", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setCheckSignUpSuccess(true);
        console.log(res.data);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.error.explanation == "Cannot create a User"
        ) {
          setCheckDupllicateEmail(true);
        } else {
          setNetworkError(true);
        }
      });
  }

  function emailErrorClose() {
    setCheckDupllicateEmail(false);
    setNetworkError(false);
  }

  async function handleNameChange(event) {
    setValues({
      ...values,
      name: event.target.value,
    });
    try {
      await signUpSchema.validateAt("name", { name: values.name });
      setErrors({ ...errors, name: "" });
    } catch (error) {
      setErrors({ ...errors, name: error.message });
    }
  }

  async function handleEmailChange(event) {
    setValues({
      ...values,
      email: event.target.value,
    });
    try {
      await signUpSchema.validateAt("email", { email: values.email });
      setErrors({ ...errors, email: "" });
    } catch (error) {
      setErrors({ ...errors, email: error.message });
    }
  }

  async function handlePasswordChange(event) {
    setValues({
      ...values,
      password: event.target.value,
    });
    try {
      await signUpSchema.validateAt("password", { password: values.password });
      setErrors({ ...errors, password: "" });
    } catch (error) {
      setErrors({ ...errors, password: error.message });
    }
  }

  async function handleNameError() {
    try {
      await signUpSchema.validateAt("name", {
        name: values.name,
      });
      setErrors({ ...errors, name: "" });
    } catch (error) {
      setErrors({ ...errors, name: error.message });
    }
  }

  async function handleEmailError() {
    try {
      await signUpSchema.validateAt("email", {
        email: values.email,
      });
      setErrors({ ...errors, email: "" });
    } catch (error) {
      setErrors({ ...errors, email: error.message });
    }
  }

  async function handlePasswordError() {
    try {
      await signUpSchema.validateAt("password", {
        password: values.password,
      });
      setErrors({ ...errors, password: "" });
    } catch (error) {
      setErrors({ ...errors, password: error.message });
    }
  }

  return (
    <>
      <Snackbar
        open={checkDuplicateEmail || networkError}
        autoHideDuration={6000}
        onClose={emailErrorClose}
      >
        <Alert
          elevation={6}
          onClose={emailErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {checkDuplicateEmail
            ? "EMAIL ALREADY EXISTS"
            : "NETWORK ERROR : COULD NOT CONNECT TO THE SERVER"}
        </Alert>
      </Snackbar>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            width: "40%",
            height: "80%",
          }}
        >
          <Typography variant="h6" align="left" gutterBottom>
            Create Account
          </Typography>
          <Box
            component="form"
            style={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <TextField
              value={values.name}
              onChange={handleNameChange}
              onFocus={handleNameError}
              label="name"
              variant="outlined"
              error={errors.name ? true : false}
              helperText={errors.name}
              type="text"
            />

            <TextField
              required
              value={values.email}
              onChange={handleEmailChange}
              onFocus={handleEmailError}
              label="email@email.com"
              variant="outlined"
              error={errors.email ? true : false}
              helperText={errors.email}
              type="email"
            />
            <TextField
              required
              value={values.password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordError}
              label="password123"
              variant="outlined"
              error={errors.password ? true : false}
              helperText={errors.password}
              type="password"
            />

            <Button
              disabled={
                errors.name || errors.email || errors.password ? true : false
              }
              variant="contained"
              color="primary"
              sx={{ width: "30%" }}
              onClick={formData}
            >
              SignUp
              {checkSignUpSuccess && <Navigate to={"/login"}></Navigate>}
            </Button>

            <Link to={"/login"}>
              <Typography>Account Exists? Login</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
