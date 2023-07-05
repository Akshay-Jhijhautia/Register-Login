import {
  Paper,
  Box,
  Button,
  Modal,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import apiClient from "../services/api-client";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  rowGap: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UserDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const numberRef = useRef(null);
  const addressRef = useRef(null);

  const isAuthenticated = Cookies.get("token");

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    apiClient
      .get(`data/${id}`)
      .then((res) => {
        setUser(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  function updateUserData() {
    apiClient
      .patch(`update/${user.id}`, {
        name: nameRef.current.value,
        gender: genderRef.current.value,
        phoneNumber: numberRef.current.value,
        address: addressRef.current.value,
      })
      .then((res) => {
        setSuccess(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function successClose() {
    setSuccess(false);
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
          CONGRATS : SUCCESSFULLY UPDATED THE DATA
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "50px",
          "& > :not(style)": {
            m: 1,
            width: 800,
            height: 200,
          },
        }}
      >
        <Paper elevation={3}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.gender}</TableCell>
                  <TableCell align="left">{user.phoneNumber}</TableCell>
                  <TableCell align="left">{user.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            sx={{ marginLeft: "20px", marginTop: "30px" }}
            onClick={handleOpen}
          >
            Update Details
          </Button>
        </Paper>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style} noValidate autoComplete="off">
            <TextField
              inputRef={nameRef}
              label="Name"
              variant="outlined"
              type="text"
            />

            <TextField
              inputRef={genderRef}
              label="Gender"
              variant="outlined"
              type="text"
            />
            <TextField
              inputRef={numberRef}
              label="Phone Number"
              variant="outlined"
              type="text"
            />
            <TextField
              inputRef={addressRef}
              label="Address"
              variant="outlined"
              type="text"
            />

            <Button
              variant="contained"
              color="primary"
              sx={{ width: "30%" }}
              onClick={updateUserData}
            >
              UPDATE
              {success && <Navigate to={"/"}></Navigate>}
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default UserDetails;
