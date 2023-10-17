import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import { fetchItems } from "./network";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      console.log("not logged in");
    } else {
      fetchItems(token)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Dropship
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
