import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function removeToken() {
  Cookies.remove("token");
}

const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link to={"/"} style={{ color: "white" }}>
                <HomeIcon />
              </Link>
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              Varthana
            </Typography>

            <Link to={"/login"} style={{ color: "white" }}>
              <Button color="inherit" onClick={removeToken}>
                LOGOUT
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
