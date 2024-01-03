import { ThemeProvider, createTheme } from "@mui/material";
import { Home, Header } from "./views";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#212121",
    // },
    // secondary: {
    //   main: "#fafafa",
    // },
  },

  typography: {
    fontFamily: [
      "OSWALD",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
