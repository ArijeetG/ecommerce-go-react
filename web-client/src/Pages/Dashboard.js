import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
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
        .then((res) => {
          setItems(res.data);
        })
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
      <Grid container>
        {items &&
          items.map((value, index) => {
            return <MediaCard item={value} />;
          })}
      </Grid>
    </>
  );
}

function MediaCard({ item }) {
  return (
    <Card
      sx={{
        m: "1.5rem",
      }}
    >
      <CardMedia
        sx={{ height: "20vh" }}
        image="https://images.unsplash.com/photo-1616400619175-5beda3a17896?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3348&q=80"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">Wishlist</Button>
      </CardActions>
    </Card>
  );
}
