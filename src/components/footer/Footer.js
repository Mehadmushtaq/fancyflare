import * as React from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Grid,
  Container,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dummy_logo from "../../assets/images/cropped-logo-dummy.png";
import { colors, fontsWeight } from "../../utils";

function StyledDetails({ label, title }) {
  return (
    <Typography>
      <span style={{ fontWeight: fontsWeight.fontBold }}>{label}</span>
      {title}
    </Typography>
  );
}

const CopyRightStyle = {
  backgroundColor: colors.lightGray,
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
};

export default function Footer() {
  return (
    <>
      <Box sx={{ mt: "auto", borderTop: "1px solid lightgrey" }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            sx={{
              margin: "1rem 0",
              " & .MuiPaper-root": {
                boxShadow: 0,
              },
              "& .MuiButtonBase-root.MuiAccordionSummary-root": {
                padding: 0,
                marginRight: "1rem",
              },
              "& .MuiAccordionSummary-content": {
                fontWeight: fontsWeight.fontBold,
              },
            }}
          >
            <Grid item xs={12} sm={4} md={3}>
              <Box>
                <img src={dummy_logo} width={100} height={100} />
                <StyledDetails label="Call Us: " title="000000000000" />
                <StyledDetails label="Email: " title="000000000000" />
                <StyledDetails
                  label="Address: "
                  title="Sargodha Road, Muslim Town, Faisalabad, Faisalabad 38000"
                />
              </Box>
            </Grid>
            <Grid
              item
              sm={4}
              md={3}
              sx={{
                display: { xs: "none", sm: "inline" },
                "& .MuiTypography-root": { mb: "0.5rem" },
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
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "inline", sm: "none" },
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  INFORMATION
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>link 1</Typography>
                  <Typography>link 2</Typography>
                  <Typography>link 3</Typography>
                  <Typography>link 4</Typography>
                  <Typography>link 5</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid
              item
              sm={4}
              md={3}
              sx={{
                display: { xs: "none", sm: "inline" },
                "& .MuiTypography-root": { mb: "0.5rem" },
              }}
            >
              <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
                CUSTOMER SUPPORT
              </Typography>
              <Typography>link 1</Typography>
              <Typography>link 2</Typography>
              <Typography>link 3</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "inline", sm: "none" },
              }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  CUSTOMER SUPPORT
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>link 1</Typography>
                  <Typography>link 2</Typography>
                  <Typography>link 3</Typography>
                  <Typography>link 4</Typography>
                  <Typography>link 5</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              sx={{
                "& .MuiTypography-root": { mb: "0.2rem" },
              }}
            >
              <Typography sx={{ fontWeight: fontsWeight.fontBold }}>
                SUBSCRIBE TODAY!
              </Typography>
              <Typography>Receive our latest updates</Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    width: {
                      xs: "20ch",
                      sm: "25ch",
                    },
                  },
                  "& .MuiButtonBase-root": {
                    width: { xs: "15ch", md: "29ch" },
                    height: "3.5rem",
                    mt: { xs: "0rem", md: "0.5rem" },
                    ml: { xs: "0.2rem", md: "0" },
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
      </Box>
    </>
  );
}
