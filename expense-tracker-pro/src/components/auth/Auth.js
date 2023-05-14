import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authenticateUser, { passwordReset } from "../store/auth-thunks";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Biswa Ranjan Barik
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Auth() {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [isSignup, setIsSignUp] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const dispatch = useDispatch();

  let text = isSignup ? "Sign Up" : "Sign In";
  if (isPasswordReset) {
    text = "Reset Password";
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.email && formData.password) {
      dispatch(authenticateUser(formData));
    } else {
      dispatch(passwordReset(formData.email));
    }
    setFormData(initialData);
  };

  const authHandler = () => {
    setIsSignUp(!isSignup);
    setIsPasswordReset(false);
  };

  const resetPasswordHandler = () => {
    setIsPasswordReset(!isPasswordReset);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {text}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {!isPasswordReset && isSignup && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={handleChange}
                      value={formData.firstName}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={handleChange}
                      value={formData.lastName}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={formData.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              {!isPasswordReset && (
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    value={formData.password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {text}
            </Button>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button onClick={authHandler}>{isSignup ? "Sign In" : "Sign Up"}</Button>
                <Button onClick={resetPasswordHandler}>Forgot Password</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
