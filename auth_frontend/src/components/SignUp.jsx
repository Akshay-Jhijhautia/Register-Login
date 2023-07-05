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

import apiClient from "../services/api-client";

const SignUp = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [networkError, setNetworkError] = useState(false);
  const [checkDuplicateEmail, setCheckDupllicateEmail] = useState(false);
  const [checkSignUpSuccess, setCheckSignUpSuccess] = useState(false);

  function formData(event) {
    event.preventDefault();

    apiClient
      .post("signup", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
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
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  function emailErrorClose() {
    setCheckDupllicateEmail(false);
    setNetworkError(false);
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
          <form
            style={{ display: "flex", flexDirection: "column", rowGap: "25px" }}
            onSubmit={formData}
          >
            <TextField
              required
              inputRef={nameRef}
              label="Name"
              variant="outlined"
              type="text"
            />

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
              SignUp
              {checkSignUpSuccess && <Navigate to={"/login"}></Navigate>}
            </Button>

            <Link to={"/login"}>
              <Typography>Account Exists? Login</Typography>
            </Link>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
