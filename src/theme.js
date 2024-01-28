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
  MuiInput: {
    styleOverrides: {
      root: {
        borderRadius: "0",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "none",
          boxShadow: "none",
          borderRadius: "0.2rem",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "1rem 0",
        },
      },
    },
  },
});
