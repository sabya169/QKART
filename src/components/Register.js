import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
// import { Link } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [regFormData, setRegFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [value, setValue] = useState(true);
  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const handleChange = (e) => {
    // console.log(e.target.value)
    setRegFormData({
      ...regFormData,
      [e.target.name]: e.target.value,
    });
  };

  const url = config.endpoint + "/auth/register";

  const register = async (formData) => {
    
    formData.preventDefault();
    console.log(regFormData);
    console.log(url);

    const result = validateInput(regFormData);
    

    if (result === true) {
      setValue(false);

      try {
        const response = await axios.post(url, {
          username: regFormData.username,
          password: regFormData.password,
        });
        console.log("response", response);

        if (response.status === 201) {
          enqueueSnackbar("Registered successfully", { variant: "success" });
          setValue(true);
          history.push("/login")

        }
      } catch (error) {
        // else{
        //   enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.")
        // }
        console.log(error.response);

        if (error.response.status === 400) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
          setValue(true);
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON."
          );
        }
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    console.log("validate", data);

    if (data.username === "" || data.username.length < 6) {
      enqueueSnackbar("Username is required amd must not be less than 6", {
        variant: "warning",
      });
      return false;
    }

    if (data.password === "" || data.password.length < 6) {
      enqueueSnackbar("password is required amd must not be less than 6", {
        variant: "warning",
      });
      return false;
    }

    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }

    return true;
  };

  // let button = (
  //   <Button className="button" variant="contained" onClick={register}>
  //           Register Now
  //         </Button>
  // )

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form" onChange={handleChange}>
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />

          {value && (
            <Button className="button" variant="contained" onClick={register}>
              Register Now
            </Button>
          )}
          <div className="circularProgress">
          {!value && <CircularProgress color="success" />}
          </div>

          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
