import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import apiClient from "../services/api-client";

const Details = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");

  const isAuthenticated = Cookies.get("token");

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    apiClient
      .get("users")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  }, []);

  function deleteUser(id) {
    apiClient
      .delete(`delete?id=${id}`)
      .catch((err) => console.log(err.message));

    setUser(user.filter((data) => data.id !== id));
  }

  if (error) return <h1>{error}</h1>;

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.no</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Delete User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                user.map((data, index) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>

                    <TableCell align="left" sx={{ cursor: "pointer" }}>
                      {" "}
                      <Link
                        to={`/user/${data.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {data.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteUser(data.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Details;
