import {
  Alert,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import loginBg from "../assets/login-bg.jpeg";
import { loginSubmit, signupSubmit } from "./network";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const onSubmit = () => {
    loginSubmit(email, password)
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("accessToken", data.token);
        setUser(true);
      })
      .catch((err) => console.log("Login failed"));
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          flexGrow: 1,
          marginTop: "1px",
          marginLeft: "1px",
        }}
      >
        {error && (
          <Stack>
            <Alert
              severity="error"
              elevation={6}
              onClose={() => {
                setError(null);
              }}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              {error.message}
            </Alert>
          </Stack>
        )}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {login ? (
            <>
              <Typography variant="h2" gutterBottom color="white">
                Login
              </Typography>
              <TextField
                variant="filled"
                label="Email"
                sx={{
                  backgroundColor: "#787672",
                  borderRadius: "10px",
                  color: "white",
                  width: "20vw",
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Password"
                sx={{
                  backgroundColor: "#787672",
                  mt: "0.5rem",
                  borderRadius: "10px",
                  width: "20vw",
                }}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Grid
                container
                width="20vw"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: "0.5rem",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button variant="contained" onClick={onSubmit}>
                    Submit
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom color="white">
                    Forgot password?
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="gray"
                  sx={{
                    mt: "1.5rem",
                  }}
                >
                  Don't have an account?{" "}
                  <a
                    href="#"
                    style={{ color: "inherit" }}
                    onClick={() => {
                      setLogin(false);
                    }}
                  >
                    Sign up
                  </a>{" "}
                  with us.
                </Typography>
              </Grid>
            </>
          ) : (
            <Signup setLogin={setLogin} setError={setError} />
          )}
        </Grid>
      </Grid>
      {user && <Navigate to="/" />}
    </>
  );
}

function Signup({ setLogin, setError }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [confirmPassword, setConfirmPasssword] = React.useState();

  const onSubmit = () => {
    if (confirmPassword !== password) {
      setError({
        message: "Confirm password mismatch!!",
      });
    } else {
      signupSubmit(name, email, password)
        .then((res) => setLogin(true))
        .catch((err) =>
          setError({
            message: err.message,
          })
        );
    }
  };

  return (
    <>
      <Typography variant="h2" gutterBottom color="white">
        Signup
      </Typography>
      <TextField
        variant="filled"
        label="Email"
        sx={{
          backgroundColor: "#787672",
          borderRadius: "10px",
          color: "white",
          width: "20vw",
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="filled"
        label="Username"
        sx={{
          backgroundColor: "#787672",
          mt: "0.5rem",
          borderRadius: "10px",
          width: "20vw",
        }}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        variant="filled"
        label="Password"
        sx={{
          backgroundColor: "#787672",
          mt: "0.5rem",
          borderRadius: "10px",
          width: "20vw",
        }}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="filled"
        label="Confirm Password"
        sx={{
          backgroundColor: "#787672",
          mt: "0.5rem",
          borderRadius: "10px",
          width: "20vw",
        }}
        type="password"
        onChange={(e) => setConfirmPasssword(e.target.value)}
      />
      <Grid
        container
        width="20vw"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "0.5rem",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="subtitle2" gutterBottom color="white">
            Forgot password?
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="subtitle2"
          gutterBottom
          color="gray"
          sx={{
            mt: "1.5rem",
          }}
        >
          Already have an account?{" "}
          <a
            href="#"
            style={{ color: "inherit" }}
            onClick={() => setLogin(true)}
          >
            Login
          </a>{" "}
          with us.
        </Typography>
      </Grid>
    </>
  );
}
