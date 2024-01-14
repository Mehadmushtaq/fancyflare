import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["Cinzel", "Raleway", "Open sans", "Montserrat"].join(","),
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});
