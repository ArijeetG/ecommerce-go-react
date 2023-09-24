import { Grid, TextField } from "@mui/material";
import React from "react";
import loginBg from "../assets/login-bg.jpeg";
export default function Login() {
  return (
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
          backdropFilter: blur(),
        }}
      >
        <TextField
          variant="filled"
          label="Email"
          sx={{
            backgroundColor: "#787672",
            borderRadius: "10px",
            color: "white",
          }}
        />
        <TextField
          variant="filled"
          label="Password"
          sx={{
            backgroundColor: "#787672",
            mt: "0.5rem",
            borderRadius: "10px",
          }}
        />
      </Grid>
    </Grid>
  );
}
