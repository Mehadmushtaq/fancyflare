import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, Container, Button, TextField } from "@mui/material";
import dummy_logo from "../../assets/images/cropped-logo-dummy.png";
import { colors, fontsWeight } from "../../utils";

const CopyRightStyle = {
  backgroundColor: colors.lightGray,
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
};

export function Footer() {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{ margin: "1rem 0", borderTop: "1px solid grey" }}
        >
          <Grid item xs={12} sm={4} md={3}>
            <Box>
              <img src={dummy_logo} width={200} height={200} />
              <Typography>Call Us: +92(21)-36-111-685(MTJ)</Typography>
              <Typography> Email:cs@mtjonline.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box
              sx={{ margin: "1rem", "& .MuiTypography-root": { mb: "1rem" } }}
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
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box
              sx={{ margin: "1rem", "& .MuiTypography-root": { mb: "1rem" } }}
            >
              <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
                CUSTOMER SUPPORT
              </Typography>
              <Typography>link 1</Typography>
              <Typography>link 2</Typography>
              <Typography>link 3</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Box
              sx={{
                margin: "1rem",
                "& .MuiTypography-root": { mb: "1rem" },
              }}
            >
              <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
                SUBSCRIBE TODAY!
              </Typography>
              <Typography>Receive our latest updates</Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { width: "25ch" },
                  "& .MuiButtonBase-root": {
                    width: { xs: "29ch", sm: "15ch", md: "29ch" },
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
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* COPYRIGHT SECTION */}
      <Box sx={CopyRightStyle}>
        <Typography variant="body2" color="text.secondary">
          {"© "}
          {new Date().getFullYear()}
          {" Fancy Flare. All Rights Reserved"}
        </Typography>
      </Box>
    </>
  );
}
