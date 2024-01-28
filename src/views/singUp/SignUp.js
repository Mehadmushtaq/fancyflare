import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Grid, IconButton, InputAdornment, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRegisterFormSchema, useRegisterSubmit } from "../../hooks";
import { useFormik } from "formik";
import { isError, isErrorMessage } from "../../helpers";

export const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const signupFormSchema = useRegisterFormSchema();
  const { initialValues, onSubmit } = useRegisterSubmit();

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    isValid,
    isSubmitting,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema: signupFormSchema,
    onSubmit,
  });

  return (
    <Grid container maxWidth="xl" margin="auto">
      <Grid tem xs={12} sm={6} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            margin: { xs: "2rem", md: "3rem", lg: "5rem" },
          }}
        >
          <Typography component="h1" variant="h5">
            CREATE ACCOUNT
          </Typography>
          <Typography variant="body1">
            Provide your details to get started
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  helperText={isErrorMessage("firstName", errors)}
                  error={isError("firstName", errors, touched)}
                  {...getFieldProps("firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  helperText={isErrorMessage("LastName", errors)}
                  error={isError("LastName", errors, touched)}
                  {...getFieldProps("LastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  helperText={isErrorMessage("email", errors)}
                  error={isError("email", errors, touched)}
                  {...getFieldProps("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  helperText={isErrorMessage("password", errors)}
                  error={isError("password", errors, touched)}
                  {...getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "5rem" }}
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Returning customer? SIGN IN
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={false} sm={6} md={7} padding="0.5rem">
        <Box
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/10557901/pexels-photo-10557901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "auto",
            height: "100%",
            borderRadius: "0rem 0.5rem 0.5rem 0rem",
          }}
        />
      </Grid>
    </Grid>
  );
};
