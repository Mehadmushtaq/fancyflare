import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"© "}
      {new Date().getFullYear()}
      {" Fancy Flare."}
      {" All Rights Reserved"}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh",
      }}
    >
      <Container component="main" sx={{ mb: 0 }} maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Pin a footer to the bottom of the viewport."}
          {"The footer will move as the main element of the page grows."}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Copyright />
          </Box>
        </Box>{" "}
      </Container>
    </Box>
  );
}
