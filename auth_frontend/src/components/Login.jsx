import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import apiClient from "../services/api-client";
import { loginSchema } from "../Validations/validation";

const Login = () => {
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
  const [emailError, setEmailError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  function loginData(event) {
    event.preventDefault();
    apiClient
      .post("login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setSuccess(true);
        setLoginSuccess(true);
        const token = res.data.data;
        Cookies.set("token", token, { expires: 1 });
      })
      .catch((err) => {
        if (
          (err.response &&
            err.response.data.error.explanation ==
              "No user found for the given email") ||
          (err.response &&
            err.response.data.error.explanation == "Password does not match")
        ) {
          setEmailError(true);
        } else {
          setNetworkError(true);
        }
      });
  }

  function successClose() {
    setSuccess(false);
  }

  function emailErrorClose() {
    setEmailError(false);
    setNetworkError(false);
  }

  async function handleEmailChange(event) {
    setValues({
      ...values,
      email: event.target.value,
    });
    try {
      await loginSchema.validateAt("email", { email: values.email });
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
      await loginSchema.validateAt("password", { password: values.password });
      setErrors({ ...errors, password: "" });
    } catch (error) {
      setErrors({ ...errors, password: error.message });
    }
  }

  return (
    <>
      <Snackbar open={success} autoHideDuration={6000} onClose={successClose}>
        <Alert
          elevation={6}
          onClose={successClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          CONGRATS : SUCCESSFULLY LOGGED IN
        </Alert>
      </Snackbar>
      <Snackbar
        open={emailError || networkError}
        autoHideDuration={6000}
        onClose={emailErrorClose}
      >
        <Alert
          elevation={6}
          onClose={emailErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {emailError
            ? "INVALID CREDENTIALS"
            : " NETWORK ERROR : COULD NOT CONNECT TO THE SERVER"}
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
            Please Enter Your Login Credentials
          </Typography>
          <Box
            component="form"
            style={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
          >
            <TextField
              required
              value={values.email}
              onChange={handleEmailChange}
              label="Email"
              variant="outlined"
              error={errors.email ? true : false}
              helperText={errors.email}
              type="email"
            />
            <TextField
              required
              value={values.password}
              onChange={handlePasswordChange}
              label="Password"
              variant="outlined"
              error={errors.password ? true : false}
              helperText={errors.password}
              type="password"
            />
            <Button
              disabled={
                values.email.length === 0 ||
                values.password.length === 0 ||
                errors.email ||
                errors.password
                  ? true
                  : false
              }
              variant="contained"
              color="primary"
              sx={{ width: "30%" }}
              onClick={loginData}
            >
              Login
              {loginSuccess && <Navigate to={"/users"}></Navigate>}
            </Button>

            <Link to={"/signup"}>
              <Typography>Account Does Not Exist? Sign Up</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
