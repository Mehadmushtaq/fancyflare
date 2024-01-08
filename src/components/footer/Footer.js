import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, Container, Button, TextField } from "@mui/material";
// import dummy_logo from "../../assets/images/cropped-logo-dummy.png";
import { colors, fontsWeight } from "../../utils";
import { CustomizedAccordions } from "../accordion/Accordion";

export default function Footer() {
  return (
    <Box sx={{ mt: "auto", borderTop: "1px solid lightgrey" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ m: "1rem 0" }}>
          <Grid item xs={12} sm={3}>
            <Box>
              {/* <img src={dummy_logo} width={100} height={100} /> */}
              <Typography variant="h6">FANCY FLARE</Typography>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: { xs: "none", sm: "inline" },
                "& .MuiTypography-root": { mb: "0.2rem" },
              }}
            >
              <Typography style={{ fontWeight: fontsWeight.fontBold }}>
                INFORMATION
              </Typography>
              <Typography>link 1</Typography>
              <Typography>link 2</Typography>
              <Typography>link 3</Typography>
              <Typography>link 4</Typography>
              <Typography>link 5</Typography>
            </Box>
            <Box>{/* <CustomizedAccordions /> */}</Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: { xs: "none", sm: "inline" },
                "& .MuiTypography-root": { mb: "0.2rem" },
              }}
            >
              <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
                CONTACT US
              </Typography>
              <Typography>address</Typography>
              <Typography>email</Typography>
              <Typography>contact number</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                "& .MuiTypography-root": { mb: "0.2rem" },
              }}
            >
              <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
                FOLLOW US
              </Typography>
              <Typography>facebook</Typography>
              <Typography>twitter</Typography>
              <Typography>instagram</Typography>
              {/* <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch" },
                  "& .MuiButtonBase-root": {
                    width: { xs: "28.5ch", sm: "15ch", md: "29ch" },
                    height: "3.5rem",
                    mt: { xs: "0.5rem", sm: "0", md: "0.5rem" },
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                />
                <Button variant="contained">Subscribe</Button>
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* COPYRIGHT SECTION */}
      <Box
        sx={{
          backgroundColor: colors.lightGray,
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {"© "}
          {new Date().getFullYear()}
          {" Fancy Flare. All Rights Reserved"}
        </Typography>
      </Box>
    </Box>
  );
}
