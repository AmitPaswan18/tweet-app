import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import bgimage from "../assets/bgimage.webp";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import AccountCircle from "@mui/icons-material/AccountCircle";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { signinsucces, signinFail } from "../../redux/Slices/authlogin";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../../utils/axiosInstance";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoginAuthenticated = useSelector(
    (state) => state.auth.isLoginAuthenticated
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    instance
      .post("/user/userLogin", {
        email: formData.username,
        password: formData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(signinsucces(response.data));
        } else {
          dispatch(signinFail(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isLoginAuthenticated) {
      navigate("/dashboard");
    }
  }, [isLoginAuthenticated, navigate]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[60%]  h-[100vh] hidden md:flex  ">
        <img src={bgimage} className="h-[100vh]" />
      </div>

      <div className="md:w-[40%] w-full h-[100vh] flex justify-center items-center bg-gradient-to-r from-[#D2CACF] to-slate-[#ECD7D5]">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              className="shadow-lg shadow-slate-700 w-full border-cyan-800 md:border border-0 p-3 bg-white rounded-lg md:h-[90%] h-full"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Typography
                sx={{
                  display: "flex",
                  fontFamily: "Poppins",
                  marginTop: "40px",
                  fontSize: "26px",
                  lineHeight: "1",
                }}
                component="h1"
                variant="h6">
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: "80%" }}>
                <div className="mt-2">
                  <FormControl
                    sx={{ width: "90%", marginTop: "20px" }}
                    variant="standard">
                    <Input
                      className="rounded-md h-8 w-full text-[#CBCBCB]  focus:outline-none "
                      name="username"
                      placeholder="Username"
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>

                <div className="mt-3">
                  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                    <InputLabel
                      className="text-[#CBCBCB]"
                      htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>

                <div className="text-sm">
                  <Link
                    sx={{ color: "gray" }}
                    underline="none"
                    className="flex focus:outline-none justify-end cursor-pointer">
                    {"Forgot Password?"}
                  </Link>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  className="bg-gradient-to-r from-fuchsia-500 to-cyan-500"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>

                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Poppins",
                    marginTop: "15px",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                  component="h6"
                  variant="h1">
                  Or Sign Up Using
                </Typography>

                <Grid container justifyContent="center" marginBottom="30px">
                  <Grid item>
                    <Link underline="none" href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
