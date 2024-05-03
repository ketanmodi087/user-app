import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
} from "@mui/material";
import { loginUserThunk } from "../../store/thunk/authThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch: any = useAppDispatch(); // Getting the dispatch function from Redux
  const navigate = useNavigate(); // Getting the navigation function from react-router-dom
  const [username, setUsername] = useState<string>(""); // State for username input
  const [password, setPassword] = useState<string>(""); // State for password input
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for form validation errors

  let userToken = useAppSelector((state) => state.authSlice.userData.token); // Getting user token from Redux store

  useEffect(() => {
    // Redirect to "/users" page if userToken exists
    if (userToken) {
      navigate("/users");
    }
  }, [userToken]);

  const validateForm = (): boolean => {
    // Function to validate the form inputs
    const errors: { [key: string]: string } = {};
    if (username.trim() === "") {
      errors.username = "Username is required";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    // Function to handle form submission (login)
    e.preventDefault();
    if (validateForm()) {
      // If form is valid, dispatch login action
      dispatch(
        loginUserThunk({
          payload: {
            email: username,
            password: password,
          },
        })
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: "100px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          {/* Form fields for username and password */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          {/* Login button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
