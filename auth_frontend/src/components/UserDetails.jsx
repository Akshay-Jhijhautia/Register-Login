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
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import apiClient from "../services/api-client";
import { userSchema } from "../Validations/validation";

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
  const [values, setValues] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
  });

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
      .patch(
        `update/${user.id}`,
        {
          name: values.name === "" ? undefined : values.name,
          gender: values.gender === "" ? undefined : values.gender,
          phoneNumber:
            values.phoneNumber === "" ? undefined : values.phoneNumber,
          address: values.address === "" ? undefined : values.address,
          city: values.city === "" ? undefined : values.city,
          pincode: values.pincode === "" ? undefined : values.pincode,
        },
        {
          headers: {
            "x-access-token": isAuthenticated,
          },
        }
      )
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

  async function handleNameChange(event) {
    setValues({
      ...values,
      name: event.target.value,
    });
    try {
      await userSchema.validateAt("name", { name: values.name });
      setErrors({ ...errors, name: "" });
    } catch (error) {
      setErrors({ ...errors, name: error.message });
    }
  }

  async function handleGenderChange(event) {
    setValues({
      ...values,
      gender: event.target.value,
    });
    try {
      await userSchema.validateAt("gender", { gender: values.gender });
      setErrors({ ...errors, gender: "" });
    } catch (error) {
      setErrors({ ...errors, gender: error.message });
    }
  }

  async function handlePhoneNumberChange(event) {
    setValues({
      ...values,
      phoneNumber: event.target.value,
    });
    try {
      await userSchema.validateAt("phoneNumber", {
        phoneNumber: values.phoneNumber,
      });
      setErrors({ ...errors, phoneNumber: "" });
    } catch (error) {
      setErrors({ ...errors, phoneNumber: error.message });
    }
  }

  async function handleAddressChange(event) {
    setValues({
      ...values,
      address: event.target.value,
    });
    try {
      await userSchema.validateAt("address", { address: values.address });
      setErrors({ ...errors, address: "" });
    } catch (error) {
      setErrors({ ...errors, address: error.message });
    }
  }

  async function handleCityChange(event) {
    setValues({
      ...values,
      city: event.target.value,
    });
    try {
      await userSchema.validateAt("city", { city: values.city });
      setErrors({ ...errors, city: "" });
    } catch (error) {
      setErrors({ ...errors, city: error.message });
    }
  }

  async function handlePinCodeChange(event) {
    setValues({
      ...values,
      pincode: event.target.value,
    });
    try {
      await userSchema.validateAt("pincode", { pincode: values.pincode });
      setErrors({ ...errors, pincode: "" });
    } catch (error) {
      setErrors({ ...errors, pincode: error.message });
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
                  <TableCell align="left">City</TableCell>
                  <TableCell align="left">Pincode</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* {Object.values(user).map((data))} */}
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.gender}</TableCell>
                  <TableCell align="left">{user.phoneNumber}</TableCell>
                  <TableCell align="left">{user.address}</TableCell>
                  <TableCell align="left">{user.city}</TableCell>
                  <TableCell align="left">{user.pincode}</TableCell>
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
              required
              value={values.name}
              onChange={handleNameChange}
              label="Name"
              variant="outlined"
              error={errors.name ? true : false}
              helperText={errors.name}
              type="text"
            />

            <TextField
              required
              value={values.gender}
              onChange={handleGenderChange}
              label="Gender"
              variant="outlined"
              error={errors.gender ? true : false}
              helperText={errors.gender}
              type="text"
            />
            <TextField
              required
              value={values.phoneNumber}
              onChange={handlePhoneNumberChange}
              label="Phone Number"
              variant="outlined"
              error={errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber}
              type="text"
            />
            <TextField
              required
              value={values.address}
              onChange={handleAddressChange}
              label="Address"
              variant="outlined"
              error={errors.address ? true : false}
              helperText={errors.address}
              type="text"
            />
            <TextField
              required
              value={values.city}
              onChange={handleCityChange}
              label="City"
              variant="outlined"
              error={errors.city ? true : false}
              helperText={errors.city}
              type="text"
            />
            <TextField
              required
              value={values.pincode}
              onChange={handlePinCodeChange}
              label="Pin Code"
              variant="outlined"
              error={errors.pincode ? true : false}
              helperText={errors.pincode}
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
