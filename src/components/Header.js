import { TryRounded } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  // const [val, setVal] = useState(localStorage.getItem("username"));

  //------------------------------------------------------------------------------
  const history = useHistory();
  let val = localStorage.getItem("username");

  //-----------------------------------------------------------------------------
  const handleClick1 = () => {
    history.push("/");
  };

  const handleClick3 = () => {
    history.push("/login");
  };

  const handleClick4 = () => {
    history.push("/register");
  };

  const handleClick2 = () => {
    localStorage.clear();
    window.location.reload();
    history.push("/");
  };

  //--------------------------------------------------------------------------
  let button;
  if (hasHiddenAuthButtons) {
    button = (
      <Button
        className="explore-button"
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick={handleClick1}
      >
        Back to explore
      </Button>
    );
  } else {
    if (!val) {
      button = (
        <Stack direction="row" spacing={2}>
          <Button onClick={handleClick3} variant="outlined">
            Login
          </Button>
          <Button onClick={handleClick4} variant="contained">
            Register
          </Button>
        </Stack>
      );
    } else {
      button = (
        <Stack direction="row" spacing={2}>
          <Avatar alt={val} src="avatar.png" />
          <h4 className="avatar_name">{val}</h4>
          <Button onClick={handleClick2} variant="outlined">
            LOGOUT
          </Button>
        </Stack>
      );
    }
  }
  //----------------------------------------------------------------
  // let child;
  // if (children) {
  //   child = (

  //     <input
  //     type="text"
  //     placeholder="Search for items/categories"
  //     />

  //   );
  // }

  //---------------------------------------------------

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      {button}
    </Box>
  );
};

export default Header;
