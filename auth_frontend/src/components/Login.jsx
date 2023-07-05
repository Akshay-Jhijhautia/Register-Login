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

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [networkError, setNetworkError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  function loginData(event) {
    event.preventDefault();
    apiClient
      .post("login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
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
          <form
            style={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
            onSubmit={loginData}
          >
            <TextField
              required
              inputRef={emailRef}
              label="Email"
              variant="outlined"
              type="email"
            />
            <TextField
              required
              inputRef={passwordRef}
              label="Password"
              variant="outlined"
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "30%" }}
              type="submit"
            >
              Login
              {loginSuccess && <Navigate to={"/users"}></Navigate>}
            </Button>

            <Link to={"/signup"}>
              <Typography>Account Does Not Exist? Sign Up</Typography>
            </Link>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
