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

  async function handleChange(field, value) {
    setValues({
      ...values,
      [field]: value,
    });
    try {
      await signUpSchema.validateAt(field, { [field]: values[field] });
      setErrors({ ...errors, [field]: "" });
    } catch (error) {
      setErrors({ ...errors, [field]: error.message });
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
              required
              value={values.name}
              onChange={(event) => handleChange("name", event.target.value)}
              label="Name"
              variant="outlined"
              error={errors.name ? true : false}
              helperText={errors.name}
              type="text"
            />

            <TextField
              required
              value={values.email}
              onChange={(event) => handleChange("email", event.target.value)}
              label="Email"
              variant="outlined"
              error={errors.email ? true : false}
              helperText={errors.email}
              type="email"
            />
            <TextField
              required
              value={values.password}
              onChange={(event) => handleChange("password", event.target.value)}
              label="Password"
              variant="outlined"
              error={errors.password ? true : false}
              helperText={errors.password}
              type="password"
            />

            <Button
              disabled={
                values.name.length === 0 ||
                values.email.length === 0 ||
                values.password.length === 0 ||
                errors.name ||
                errors.email ||
                errors.password
                  ? true
                  : false
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
