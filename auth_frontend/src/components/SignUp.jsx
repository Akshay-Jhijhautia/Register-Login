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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [checkDuplicateEmail, setCheckDupllicateEmail] = useState(false);
  const [checkSignUpSuccess, setCheckSignUpSuccess] = useState(false);

  function formData(event) {
    event.preventDefault();

    apiClient
      .post("signup", {
        name: name,
        email: email,
        password: password,
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

  function handleName(event) {
    setNameError("");
    setName(event.target.value);
  }

  function handleEmail(event) {
    setEmailError("");
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPasswordError("");
    setPassword(event.target.value);
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
              value={name}
              onChange={handleName}
              onFocus={() => setNameError("Name is required")}
              label="name"
              variant="outlined"
              error={nameError ? true : false}
              helperText={nameError}
              type="text"
            />

            <TextField
              required
              value={email}
              onChange={handleEmail}
              onFocus={() => setEmailError("Email is required")}
              label="email@email.com"
              variant="outlined"
              error={emailError ? true : false}
              helperText={emailError}
              type="email"
            />
            <TextField
              required
              value={password}
              onChange={handlePassword}
              onFocus={() => setPasswordError("Password is required")}
              label="password123"
              variant="outlined"
              error={passwordError ? true : false}
              helperText={passwordError}
              type="password"
            />

            <Button
              disabled={nameError || emailError || passwordError ? true : false}
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
